import os
import random
import string
import numpy as np
import base64
import soundfile as sf
import subprocess
import matplotlib.pyplot as plt
from scipy.signal import stft
from scipy.signal import correlate2d
from scipy.spatial.distance import euclidean
from io import BytesIO
from PIL import Image
from django.conf import settings

# function to generate random room_id
def generate_random_room_id(length):
    characters = string.digits
    return ''.join(random.choice(characters) for _ in range(length))


# function to record and return audio array
# def record_audio(name):

#     FORMAT = pyaudio.paInt16
#     CHANNELS = 1
#     RATE = 44100
#     CHUNK = 1024
#     RECORD_SECONDS = 7

#     audio = pyaudio.PyAudio()
#     stream = audio.open(format=FORMAT, channels=CHANNELS,
#                         rate=RATE, input=True,
#                         frames_per_buffer=CHUNK)

#     frames = []
#     for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
#         data = stream.read(CHUNK)
#         frames.append(data)
#     stream.stop_stream()
#     stream.close()
#     audio.terminate()

#     # save audio as .wav file
#     aud_name = 'audio/'+name
#     path = os.path.join(settings.MEDIA_ROOT, f'{aud_name}.wav')
#     # WAVE_OUTPUT_FILENAME =   (f'D:\programming\VSYNC_INTERN\\vsync\VSYNC_FINAL\\v-sync\\audio\{name}.wav')
#     wavefile = wave.open(path, 'wb')
#     wavefile.setnchannels(CHANNELS)
#     wavefile.setsampwidth(audio.get_sample_size(FORMAT))
#     wavefile.setframerate(RATE)
#     wavefile.writeframes(b''.join(frames))
#     wavefile.close()
#     wavefile = wave.open(path, 'r')

#     return audio_to_spectrogram(name)


# function that takes name as input, save spectrogram as .jpg file and return spectrogram in binary string
def audio_to_spectrogram(name):

    # Load the audio file
    aud_name = 'audio/'+name
    path = os.path.join(settings.MEDIA_ROOT, f'{aud_name}.wav')

    opath = os.path.join(settings.MEDIA_ROOT, f'{aud_name}1.wav') 
    command = ['ffmpeg','-y', '-i', path, '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '1', opath]
    subprocess.run(command)


    audio_file1, fs1 = sf.read(opath)

    # Segment parameters
    t_start = 1
    t_end = 7
    n_start = round(t_start * fs1)
    n_end = round(t_end * fs1)

    # Get audio file segments
    audio_file_segment1 = audio_file1[n_start:n_end]

    # Define window length and overlap
    win_length = 2048  # Window length in samples
    overlap_length = 1800  # Overlap length in samples
    hop_length = win_length - overlap_length  # Hop length in samples

    # Compute STFT using Hamming window with padding and Nyquist frequency bin
    f1, t1, stft1 = stft(audio_file_segment1, fs=fs1, window='hamming', nperseg=win_length,
                        noverlap=overlap_length, nfft=2*win_length, boundary='zeros', padded=True)

    # ******************Code for plotting parameters in spectrogram***************************************
    # Limit frequency range to 1500-4000 Hz
    pfreq_indices1 = np.where((f1 >= 0) & (f1 <= 5000))[0]

    # Code for plotting spectrogram rows and columns
    pstft1 = stft1[pfreq_indices1, :]

    # ***************************************************************************************************
    # Magnitude range for analysis
    stft_mag_range1 = 20 * np.log10(np.abs(pstft1))

    # Plot spectrograms side by side
    fig, ax = plt.subplots(1, 1)
    p = ax.pcolormesh(t1, f1[pfreq_indices1], stft_mag_range1, shading='auto')
    ax.set_xlabel('Time (s)')
    ax.set_ylabel('Frequency (Hz)')
    ax.set_title('Spectrogram for Audio 1')
    # Add horizontal lines
    yticks = f1[pfreq_indices1]
    xticks = np.arange(0, t1[-1], 0.2)
    for xtick in xticks:
        ax.plot([xtick, xtick], [yticks[0], yticks[-1]], 'purple', linewidth=1)
    # save file
    print('great')
        # save file
    spectrogram_name = 'spectrogram/'+name
    path = os.path.join(settings.MEDIA_ROOT, f'{spectrogram_name}.jpg')
    plt.savefig(path)

    # convert image to binary string using base64
    with open(path, 'rb') as image_file:
        image_data = image_file.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
    spectrogram_str = encoded_image

    return spectrogram_str



# convert image to string
def image_to_string(type, name):
    if type == 'graph':
        img_name = 'spectrogram/'+name
        path = os.path.join(settings.MEDIA_ROOT, f'{img_name}.jpg')
    if type == 'image':
        img_name = 'selfie/'+name
        path = os.path.join(settings.MEDIA_ROOT, f'{img_name}.jpg')

    # checks whether file exists or not 
    if os.path.exists(path):
        with open(path, 'rb') as image_file:
            image_data = image_file.read()
            encoded_image = base64.b64encode(image_data).decode('utf-8')
            image_str = encoded_image
            return image_str
    else:
        return None


# convert string to image
def string_to_image(name, image_string):

    base64_string = image_string
    image = base64_to_image(base64_string)

    # Save the image to a .jpg file
    img_name = 'selfie/'+name
    image.save(os.path.join(settings.MEDIA_ROOT, f'{img_name}.jpg'))


def base64_to_image(base64_string):
    # Remove the header from the base64 string if it's present
    if base64_string.startswith('data:image'):
        base64_string = base64_string.split(',')[-1]

    # Decode the base64 string
    image_data = base64.b64decode(base64_string)

    # Create a BytesIO object to wrap the image data
    image_buffer = BytesIO(image_data)

    # Open the image using PIL
    image = Image.open(image_buffer)

    return image


# function to calculate correaltion
def audio_to_correlation(name1, name2):
    aud_name1 = 'audio/'+name1
    aud_name2 = 'audio/'+name2
    path1 = os.path.join(settings.MEDIA_ROOT, f'{aud_name1}1.wav')
    path2 = os.path.join(settings.MEDIA_ROOT, f'{aud_name2}1.wav')

    # checks whether both audio files exists or not
    if os.path.exists(path1) and os.path.exists(path2):
        # Load audio files
        audio_file1, fs1 = sf.read(path1)
        audio_file2, fs2 = sf.read(path2)

        # Segment parameters
        t_start = 0
        t_end = 6
        n_start = round(t_start * fs1)
        n_end = round(t_end * fs1)

        # Get audio file segments
        audio_file_segment1 = audio_file1[n_start:n_end]

        n_start = round(t_start * fs2)
        n_end = round(t_end * fs2)
        # Get audio file segments
        audio_file_segment2 = audio_file2[n_start:n_end]

        # Define window length and overlap
        win_length = 2048 # Window length in samples
        overlap_length = 1800 # Overlap length in samples
        hop_length = win_length - overlap_length # Hop length in samples

        # Compute STFT using Hamming window with padding and Nyquist frequency bin
        f1, t1, stft1 = stft(audio_file_segment1, fs=fs1, window='hamming', nperseg=win_length, noverlap=overlap_length, nfft=2*win_length, boundary='zeros', padded=True)
        f2, t2, stft2 = stft(audio_file_segment2, fs=fs2, window='hamming', nperseg=win_length, noverlap=overlap_length, nfft=2*win_length, boundary='zeros', padded=True)

        # Limit frequency range to 1500-4000 Hz
        freq_indices1 = np.where((f1 >= 1500) & (f1 <= 4000))[0]
        freq_indices2 = np.where((f2 >= 1500) & (f2 <= 4000))[0]

        stft1 = stft1[freq_indices1, :]
        stft2 = stft2[freq_indices2, :]

        # Absouluting the STFT matrices
        abs_stft1 = np.abs(stft1)
        abs_stft2 = np.abs(stft2)

        correlation = correlate2d(abs_stft1, abs_stft2, mode='valid')

        # Calculate maximum correlation
        max_corr = np.max(np.abs(correlation))
        max_index = np.argmax(np.abs(correlation))
        max_row, max_col = np.unravel_index(max_index, correlation.shape)
        percent_corr = max_corr / (np.linalg.norm(abs_stft1, 'fro') * np.linalg.norm(abs_stft2, 'fro')) * 100

        # Phase synchronization
        phase_diff = np.angle(stft1) - np.angle(stft2)
        phase_diff = np.mod(phase_diff + np.pi, 2 * np.pi) - np.pi
        mean_angle = np.exp(1j * np.mean(phase_diff, axis=0))
        percent_sync = np.abs(np.mean(mean_angle)) * 100

        weight_cross_correlation = 0.5
        weight_psync = 0.5

        # Calculate the weighted average or final similarity
        weighted_avg = (percent_corr * weight_cross_correlation) + (percent_sync * weight_psync)

        # Vsync similarity
        V_sync = weighted_avg
        return V_sync
    else:
        return None

# function to delete image from storage
def delete_image_file(type, name):
    if type == 'graph':
        img_name = 'spectrogram/'+name
        path = os.path.join(settings.MEDIA_ROOT, f'{img_name}.jpg')
    if type == 'image':
        img_name = 'selfie/'+name
        path = os.path.join(settings.MEDIA_ROOT, f'{img_name}.jpg')

    # Check if the file exists
    if os.path.exists(path):
        # Delete the file
        os.remove(path)
        return True
    else:
        return False



