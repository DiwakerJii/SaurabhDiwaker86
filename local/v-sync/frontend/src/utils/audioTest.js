let recorder;
const bufferSize = 1024; // Chunk size in samples
const sampleRate = 44100; // Sample rate in Hz
const recordingDuration = 7000; // Recording duration in milliseconds

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, sampleRate: sampleRate }, video: false })
        .then(function (stream) {
            const audioContext = new AudioContext();
            const input = audioContext.createMediaStreamSource(stream);
            const scriptProcessorNode = audioContext.createScriptProcessor(bufferSize, 1, 1);

            const frames = [];

            scriptProcessorNode.onaudioprocess = function (e) {
                const inputData = e.inputBuffer.getChannelData(0);
                const intData = new Int16Array(bufferSize);

                // Convert floating-point audio data to signed 16-bit integers
                for (let i = 0; i < bufferSize; i++) {
                    intData[i] = inputData[i] * 32767; // Scale the value to fit within the range of signed 16-bit integers
                }

                frames.push(intData);
            };

            input.connect(scriptProcessorNode);
            scriptProcessorNode.connect(audioContext.destination);

            setTimeout(function () {
                stopRecording();
            }, recordingDuration);

            recorder = {
                audioContext: audioContext,
                stream: stream,
                scriptProcessorNode: scriptProcessorNode,
                frames: frames
            };

            console.log('Recording started');
        })
        .catch(function (err) {
            console.log('Error accessing microphone: ', err);
        });
}

function stopRecording() {
    recorder.scriptProcessorNode.disconnect();
    recorder.stream.getTracks().forEach(function (track) {
        track.stop();
    });

    const audioContext = recorder.audioContext;
    const frames = recorder.frames;
    const audioBuffer = audioContext.createBuffer(1, frames.length * bufferSize, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < frames.length; i++) {
        const intData = frames[i];

        // Convert signed 16-bit integers back to floating-point audio data
        for (let j = 0; j < bufferSize; j++) {
            channelData[i * bufferSize + j] = intData[j] / 32767; // Scale the value back to the range of floating-point audio data
        }
    }

    audioContext.close();

    const audioBlob = audioBufferToBlob(audioBuffer);
    saveRecording(audioBlob);

    console.log('Recording stopped');
}

// Rest of the code remains the same...


function audioBufferToBlob(audioBuffer) {
    const channelData = audioBuffer.getChannelData(0);
    const bufferLength = channelData.length;
    const view = new DataView(new ArrayBuffer(bufferLength * 2));

    for (let i = 0; i < bufferLength; i++) {
        const s = Math.max(-1, Math.min(1, channelData[i]));
        view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    const audioBlob = new Blob([view], { type: 'audio/wav' });
    return audioBlob;
}

function saveRecording(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recorded_audio.wav';
    link.innerHTML = 'Download Recorded Audio';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
}