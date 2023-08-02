from django.shortcuts import render
from .serializers import InstantRoomSerializer
from .models import InstantRoom
from room.models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from room.help import *
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.utils import timezone


# create unique room id and initiate the instance.
class CreateInstantRoom(APIView):
    # user should be authenticated i.e. logged in to create the room
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            host = {'host': request.user.id}    # takes logged in user as host for the instance
            room_id = generate_random_room_id(8) # generate 8 charaters alphanumeric string
            # check if room_id already exists, if yes then generate another one 
            while InstantRoom.objects.filter(room_id=room_id) or Room.objects.filter(room_id=room_id):
                room_id = generate_random_room_id(8)

            room_id = {'room_id' : room_id}
            created_at = timezone.now()
            created_at = {'created_at':created_at}
            data = {**room_id, **host, **created_at}
            room_serializer = InstantRoomSerializer(data=data)

            if room_serializer.is_valid():
                room_serializer.save()
                return Response({
                    'status': 200,
                    'message': 'Instant Room has been created successfully!',
                    'data': room_serializer.data,
                })
            return Response({
                'status': '400',
                'message': 'Something went wrong',
                'data': room_serializer.errors
            })
        except Exception as e:
            print(e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error':str(e)},
            })


# Image of the user
class Image(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            data = request.data
            room_id = data.get('room_id')
            image_string = data.get('user_image_string')
            
            if image_string == None:
                return Response({
                    'status': 400,
                    'message': 'No image:(',
                    'data': {'Image': None},
                })
            room = InstantRoom.objects.get(room_id=room_id) 
            name = room_id+'_user_image'    
            # convert string to image and save
            string_to_image(name,image_string) 
            room.user_image_status = True
            room.save() 
            return Response({
                'status': 200,
                'message': 'User Image saved successfully!',
                'data': {'Image': name},
            }) 
        except Exception as e:
            print(e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error': str(e)},
            })


# join the room with unique room_id
class RoomDetails(APIView):
    # user should be authenticated i.e. logged in to join the room
    permission_classes = (IsAuthenticated,)

    def patch(self, request):
        try:
            data = request.data
            room_id = request.data.get('room_id')
            room = InstantRoom.objects.get(room_id=room_id)   # get the room with specific room_id, raise error if does not exists
            room_serializer = InstantRoomSerializer(room, data=data, partial=True)

            if room_serializer.is_valid():
                room_serializer.save()
                return Response({
                    'status': 200,
                    'message': 'Instant Room details upadated successfully!',
                    'data': room_serializer.data,
                })
            return Response({
                'status': '400',
                'message': 'Something went wrong',
                'data': room_serializer.errors
            })
        except Exception as e:
            print(e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error':str(e)},
            })


# record audio for the specified logged in user 
class RecordAudio(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    # record the audio
    def post(self, request):
        try:
            data = request.data
            room_id = data.get('room_id')
            # get name and dob of the user to save audio as
            user = data.get('user')
            room = InstantRoom.objects.get(room_id=room_id)
            if user == 'user1':
                username = room.host.username
                name = room_id+'_'+username+'_user1'
            else:
                username = room.host.username
                name = room_id+'_'+username+'_user2'
            # function to record audio and save it as .wav file and return audio_status as distortion or not
            audio_blob = request.FILES['audio_blob']
            print(1)
            aud_name = 'audio/'+name
            path = os.path.join(settings.MEDIA_ROOT, f'{aud_name}.wav') 
            print(2)
            with open(path,'wb') as wav_file:
                wav_file.write(audio_blob.read())
                wav_file.close()
            print(3)
            spectrogram_str = audio_to_spectrogram(name) 
            # spectrogram_str = record_audio(name)
            audio_status = 1
            if user == 'user1':
                room.user1_audio_status = audio_status
            else:
                room.user2_audio_status = audio_status
            room.save()
            return Response({
                'status': '200',
                'message': 'Audio recorded successfully',
                'data': {'audio_status': audio_status, 'spectrogram_str':spectrogram_str}
            })
            
        except Exception as e:
            print(e)
            return Response({
                'status': '400',
                'message': 'Something went wrong',
                'data': {'error' : str(e)}
            }) 
        

# check whether all data is enterd by host and join or not
class CheckPoint(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            room_id = request.data.get('room_id')
            check, status = checkAllDataInstant(room_id)

            return Response({
                'status': '200',
                'message': check,
                'data': status
            })
        except Exception as e:
            print(e)
            return Response({
                'status': '400',
                'message': 'Something went wrong',
                'data': {'error' : str(e)}
            }) 


# dashboard
class Dashboard(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            data = request.data
            room_id = data.get('room_id')
            room = InstantRoom.objects.get(room_id=room_id)
            # name of both users
            full_name1 = room.user1_full_name
            full_name2 = room.user2_full_name
            username = room.host.username
            name1 = room_id+'_'+username+'_user1'
            name2 = room_id+'_'+username+'_user2'
            # user image & spectrogram strings of both users
            user_image = image_to_string('image',room_id+'_user_image')
            user1_spectrogram_string = image_to_string('graph',name1)
            user2_spectrogram_string = image_to_string('graph',name2)
                
            data = {'user1_name':full_name1,
                    'user2_name':full_name2,
                    'user_image':user_image,
                    'user1_spectrogram_string':user1_spectrogram_string,
                    'user2_spectrogram_string':user2_spectrogram_string, }
            
            return Response({
                'status': '200',
                'message': 'Dashboard:)',
                'data': data
            })
        except Exception as e:
            print(e)
            return Response({
                'status': '400',
                'message': 'Something went wrong',
                'data': {'error' : str(e)}
            })

# calculate correlation
class VsyncCorrelation(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            data = request.data
            room_id = data.get('room_id')
            room = InstantRoom.objects.get(room_id=room_id)
            if room.is_payment_done == True:
                username = room.host.username
                name1 = room_id+'_'+username+'_user1'
                name2 = room_id+'_'+username+'_user2'
                correlation = audio_to_correlation(name1,name2)
                if correlation!=None:
                    return Response({
                        'status': '200',
                        'message': 'VSYNC successfull!!',
                        'data': {'correlation': correlation}
                    })
                return Response({
                        'status': '400',
                        'message': 'Something went wrong',
                        'data': {'correlation': 'audio not found'}
                })
            return Response({
                'status': '400',
                'message': 'Payment not done yet:(',
                'data': {'Payment Status': 'False'}
            })
        except Exception as e:
            print(e)
            return Response({
                'status': '400',
                'message': 'Something went wrong',
                'data': {'error' : str(e)}
            }) 
     

# clear all data of room_ids created more that 20 mins ago
class ClearAll(APIView):
    def post(self,request):
        current_time = datetime.now()
        current_time = datetime.fromisoformat(str(current_time))
        past_time = datetime.fromisoformat(str(current_time - timedelta(minutes=20)))
        print('current time',current_time)
        print('past time',past_time)
        rooms = InstantRoom.objects.filter(created_at__lt=past_time)
        count=0 
        for i in rooms:
            room_id = i.room_id
            clear_data(room_id)
            count += 1
        print(count)
        return Response({
            'status':200,
            'data':'done'
        })


# function to clear data of specific room_id
def clear_data(room_id):
    room = InstantRoom.objects.get(room_id=room_id)
    room.duration = None
    room.proximity = None
    room.save()
    if room.user1_full_name and room.user2_full_name:
        username = room.host.username
        name1 = room_id+'_'+username+'_user1'
        name2 = room_id+'_'+username+'_user2'
    else:
        name1 = 'nil'
        name2 = 'nil'
    
    host_spectrogram = delete_image_file('graph',name1)
    join_spectrogram = delete_image_file('graph',name2)


# function to check if all data is entered
def checkAllDataInstant(room_id):
    room = InstantRoom.objects.get(room_id=room_id)
    user_image = room.user_image_status
    questions = room.duration
    user1_audio = room.user1_audio_status
    user2_audio = room.user2_audio_status
    data = {}
    status = []
    check = True

    if user_image == False:
        message = 'User has not clicked image'
        data['user_image'] = 0
        status.append(message)
        check = False
    else:
        data['user_image'] = 1

    if questions == None:
        message = 'Not responded to the questions'
        data['questions'] = 0
        status.append(message)
        check = False
    else:
        data['questions'] = 1

    if user1_audio == None:
        message = 'User1 has not recorded audio'
        data['user1_audio'] = 0
        status.append(message)
        check = False
    elif user1_audio == 0:
        message = 'User1 has distorsion in recorded audio'
        data['user1_audio'] = 10
        status.append(message)
        check = False
    else:
        data['user1_audio'] = 11

    if user2_audio == None:
        message = 'User2 has not recorded audio'
        data['user2_audio'] = 0
        status.append(message)
        check = False
    elif user2_audio == 0:
        message = 'User2 has distorsion in recorded audio'
        data['user2_audio'] = 10
        status.append(message)
        check = False
    else:
        data['user2_audio'] = 11

    return check, status


# dummy data for creating Instant room instance
# {
#     ntg
# }

# dummy data for image
# {
#     "room_id" : "UBWbUxQ2",
# } 

# dummy data for room details
# {
#     "room_id" : "Byu4i45t",
#     "user1_full_name" : "kite",
#     "user1_gender" : "1",
#     "user1_date_of_birth" : "2022-03-19",
#     "user2_full_name" : "kite",
#     "user2_gender" : "1",
#     "user2_date_of_birth" : "2022-03-19"
# } 

# dummy data for room details
# {
    # "room_id" : "Byu4i45t",
    # "duration" : "12.7",
    # "proximity" : "1"
# } 

# dummy data to record audio
# {
#     "room_id" : "UBWbUxQ2",
#     "user" : "user1/user2",
# } 

# dummy data to  check if all data is entered 
# {
#     get method
# } 

# dummy data for dashboard
# {
#     "room_id" : "UBWbUxQ2",
# } 

# dummy data for correlation
# {
#     "room_id" : "UBWbUxQ2"
# } 
