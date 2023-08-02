export default function recordAudio(desiredSampleRate, desiredNumChannels, desiredChunkSize) {
    return new Promise(function (resolve, reject) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            var constraints = { audio: true };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    var source = audioContext.createMediaStreamSource(stream);

                    // Check if the AudioContext sample rate needs to be adjusted
                    if (audioContext.sampleRate !== desiredSampleRate) {
                        var audioSource = audioContext.createBufferSource();
                        audioSource.buffer = audioContext.createBuffer(1, 1, desiredSampleRate);
                        audioSource.connect(audioContext.destination);
                        audioSource.start(0);
                        audioSource.stop(0);
                        audioContext.close();
                        audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        source = audioContext.createMediaStreamSource(stream);
                    }

                    // Create a ScriptProcessorNode with desired configuration
                    var scriptProcessor = audioContext.AudioWorkletNode(desiredChunkSize, desiredNumChannels, desiredNumChannels);
                    var recordedData = [];

                    // Connect audio nodes
                    source.connect(scriptProcessor);
                    scriptProcessor.connect(audioContext.destination);

                    // Event handler for audio processing
                    scriptProcessor.onaudioprocess = function (event) {
                        // Process the audio data here
                        var audioData = event.inputBuffer.getChannelData(0); // Get the audio data for the first channel
                        // Perform desired operations on the audio data

                        // Example: Store the audio data in an array
                        recordedData.push(new Float32Array(audioData));
                    };

                    // Start recording by activating the script processor
                    scriptProcessor.on && scriptProcessor.on();

                    // Stop recording after a certain duration (in milliseconds)
                    var recordingDuration = 6000; // 6 seconds
                    setTimeout(function () {
                        // Stop the script processor and disconnect audio nodes
                        scriptProcessor.on && scriptProcessor.on();
                        source.disconnect();
                        scriptProcessor.disconnect();

                        // Convert the recorded audio data into a Blob
                        var audioBlob = exportWav(recordedData, desiredNumChannels, audioContext.sampleRate);
                        resolve(audioBlob);
                    }, recordingDuration);
                })
                .catch(function (err) {
                    reject('Error accessing microphone: ' + err);
                });
        } else {
            reject('Web Audio API is not supported in this browser.');
        }
    });
}

// Helper function to export the recorded audio data as a WAV file
// Helper function to export the recorded audio data as a WAV file
function exportWav(recordedData, numChannels, sampleRate) {
    var bufferLength = recordedData.length * recordedData[0].length;
    var buffer = new ArrayBuffer(44 + bufferLength);
    var view = new DataView(buffer);

    function writeString(view, offset, string) {
        for (var i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    function floatTo16BitPCM(output, offset, input) {
        for (var i = 0; i < input.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    }

    // WAV file header
    writeString(view, 0, 'RIFF'); // RIFF identifier
    view.setUint32(4, 36 + bufferLength, true); // RIFF chunk length
    writeString(view, 8, 'WAVE'); // RIFF type
    writeString(view, 12, 'fmt '); // Format chunk identifier
    view.setUint32(16, 16, true); // Format chunk length
    view.setUint16(20, 1, true); // Audio format (1 for PCM)
    view.setUint16(22, numChannels, true); // Number of channels
    view.setUint32(24, sampleRate, true); // Sample rate
    view.setUint32(28, sampleRate * numChannels * 2, true); // Byte rate (sample rate * block align)
    view.setUint16(32, numChannels * 2, true); // Block align (channels * bytes per sample)
    view.setUint16(34, 16, true); // Bits per sample
    writeString(view, 36, 'data'); // Data chunk identifier
    view.setUint32(40, bufferLength, true); // Data chunk length

    var offset = 44;
    for (var i = 0; i < recordedData.length; i++) {
        floatTo16BitPCM(view, offset, recordedData[i]);
        offset += recordedData[i].length * 2;
    }

    return new Blob([view], { type: 'audio/wav' });
}

