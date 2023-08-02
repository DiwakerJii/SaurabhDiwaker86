from .serializers import RoomSerializer
from .models import Room
from instant.models import InstantRoom
from rest_framework.views import APIView
from rest_framework.response import Response
from .help import *
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.utils import timezone



# create unique room id and initiate the instance.
class CreateRoom(APIView):
    # user should be authenticated i.e. logged in to create the room
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            # takes logged in user as host for the instance
            host = {'host': request.user.id}
            # generate 8 charaters numeric string
            room_id = generate_random_room_id(8)
            # check if room_id already exists either in room or int instant, if yes then generate another one
            while InstantRoom.objects.filter(room_id=room_id) or Room.objects.filter(room_id=room_id):
                print('another')
                room_id = generate_random_room_id(8)

            room_id = {'room_id': room_id}
            created_at = timezone.now()
            created_at = {'created_at':created_at}
            data = {**room_id, **host, **created_at}
            room_serializer = RoomSerializer(data=data)

            if room_serializer.is_valid():
                room_serializer.save()
                return Response({
                    'status': 200,
                    'message': 'Room has been created successfully!',
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
                'data': {'Error': str(e)},
            })


# join the room with unique room_id
class JoinRoom(APIView):
    # user should be authenticated i.e. logged in to join the room
    permission_classes = (IsAuthenticated,)

    # logged in user will be set as joinee for the provied room_id instance
    def post(self, request):
        try:
            user = request.user
            # takes logged in user as joinee for the instance
            join = {'join': user.id}
            room_id = request.data.get('room_id')
            # get the room with specific room_id, raise error if does not exists
            room = Room.objects.get(room_id=room_id)
            # join the user to the instance only if its value is null,
            if not room.join or room.join == user:
                room_serializer = RoomSerializer(room, data=join, partial=True)

                if room_serializer.is_valid():
                    room_serializer.save()
                    return Response({
                        'status': 200,
                        'message': 'Joinee has been joined the room successfully!',
                        'data': room_serializer.data,
                    })
                return Response({
                    'status': '400',
                    'message': 'Something went wrong',
                    'data': room_serializer.errors
                })
            return Response({
                'status': '400',
                'message': 'Someone has already joined the room!',
                'data': {'Error': 'Sorry! someone has already joined the room.'}
            })
        except Exception as e:
            print(e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error': str(e)},
            })


# Image of the user
class Image(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            user = request.user
            data = request.data
            room_id = data.get('room_id')
            image_string = data.get('user_image_string')
            if image_string == None:
                return Response({
                    'status': 400,
                    'message': 'No image:(',
                    'data': {'Image': None},
                }) 
            room = Room.objects.get(room_id=room_id)
            if user == room.host:
                name = room_id+'_host_image'
                room.host_image_status = True    
                # convert string to image and save
                string_to_image(name,image_string)
                room.save()  
                return Response({
                    'status': 200,
                    'message': 'Host Image saved successfully!',
                    'data': {'Image': name},
                }) 
            if user == room.join:
                name = room_id+'_join_image'
                room.join_image_status = True
                # convert string to image and save
                string_to_image(name,image_string)
                room.save()  
                return Response({
                    'status': 200,
                    'message': 'Join Image saved successfully!',
                    'data': {'Image': name},
                }) 
        except Exception as e:
            print(e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error': str(e)},
            })


# save question responses of host and join
class Questions(APIView):
    # user should be authenticated i.e. logged in to join the room
    permission_classes = (IsAuthenticated,)

    def patch(self, request):
        try:
            user = request.user
            data = request.data
            duration = data.get('duration')
            proximity = data.get('proximity')
            room_id = data.get('room_id')
            room = Room.objects.get(room_id=room_id)   # get the room with specific room_id, raise error if does not exists
            host = room.host
            join = room.join
            if user == host:
                data = {'host_duration':duration, 'host_proximity':proximity}
            if user == join:
                data = {'join_duration':duration, 'join_proximity':proximity}
            room_serializer = RoomSerializer(room, data=data, partial=True)
            if room_serializer.is_valid():
                room_serializer.save()
                return Response({
                    'status': 200,
                    'message': 'Qusetions saved successfully!',
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
            # get name and dob of the user to save audio as
            user = request.user
            room_id = request.data.get('room_id')
            room = Room.objects.get(room_id=room_id)
            print('room_id')
            host = room.host
            join = room.join
            username = user.username
            name = room_id+'_'+username
            print('N', name)
            # function to record audio and save it as .wav file and return spectrogram string  
            audio_blob = request.FILES['audio_blob']
            print(1)
            aud_name = 'audio/'+name
            path = os.path.join(settings.MEDIA_ROOT, f'{aud_name}.wav') 
            with open(path,'wb') as wav_file:
                wav_file.write(audio_blob.read())
                wav_file.close()
            spectrogram_str = audio_to_spectrogram(name)
            # spectrogram_str = record_audio(name)
            audio_status = 1
            # save audio status in database
            if user == host:
                room.host_audio_status = audio_status
            if user == join:
                room.join_audio_status = audio_status

            print('audio recorded successfully!')
            room.save()
            return Response({
                'status': '200',
                'message': 'Audio recorded successfully',
                'data': {'audio_status': audio_status, 'spectrogram_str':spectrogram_str}
            })
        except Exception as e:
            print('errrororrrr', e)
            return Response({
                'status': '400',
                'message': 'Something went wrong',
                'data': {'error': str(e)}
            })


# check whether all data is enterd by host and join or not
class CheckPoint(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            user = request.user
            # print(11111111111111111111111111111111111111111111111111)
            # print("hii there", user)
            room_id = request.data.get('room_id')
            user_type, check, status = checkAllDataRoom(room_id,user)

            return Response({
                'status': '200',
                'user': user_type,
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
            room = Room.objects.get(room_id=room_id)

            host_full_name = room.host.full_name
            username = room.host.username
            host_name = room_id+'_'+username

            join_full_name = None
            join_name = ' '
            if room.join != None:
                join_full_name = room.join.full_name
                username = room.join.username
                join_name = room_id+'_'+username

            host_image_string = image_to_string('image',room_id+'_host_image')
            join_image_string = image_to_string('image',room_id+'_join_image')
            host_spectrogram_string = image_to_string('graph',host_name)
            join_spectrogram_string = image_to_string('graph',join_name)
                
            data = {'host_name':host_full_name,
                    'join_name':join_full_name,
                    'host_image_string':host_image_string,
                    'join_image_string':join_image_string,
                    'host_spectrogram_string':host_spectrogram_string,
                    'join_spectrogram_string':join_spectrogram_string, }
            
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

        
# calculate coorelation
class VsyncCorrelation(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            data = request.data
            room_id = data.get('room_id')
            room = Room.objects.get(room_id=room_id)
            if room.is_payment_done == True:
                if room.correlation:
                    return Response({
                    'status': '200',
                    'message': 'VSYNC successfull',
                    'data': {'correlation': room.correlation}
                })
                username = room.host.username
                host_name = room_id+'_'+username

                username = room.join.username
                join_name = room_id+'_'+username
                
                correlation = audio_to_correlation(host_name, join_name)
                if correlation != None:
                    room.correlation = correlation
                    room.save()
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


# delete unrequired data
class Restart(APIView):
    # user should be authenticated i.e. logged in to record the audio
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            data = request.data
            room_id = data.get('room_id')
            clear_data(room_id)
            return Response({
                'status': '200',
                'message': 'Data deleted succesfully',
                'data': {}
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
        rooms = Room.objects.filter(created_at__lt=past_time)
        count=0 
        roomids = []
        for i in rooms:
            room_id = i.room_id
            roomids.append(room_id)
            clear_data(room_id)
            count += 1
        print(count)
        return Response({
            'status':200,
            'data':'done'
        })


# function to clear data of specific room_id
def clear_data(room_id):
    room = Room.objects.get(room_id=room_id)

    room.correlation = None
    room.host_duration = None
    room.host_proximity = None
    room.join_duration = None
    room.join_proximity = None
    room.save()
    username = room.host.username
    host_name = room_id+'_'+username
    join_name = 'nil'
    if room.join != None:
        username = room.join.username
        join_name = room_id+'_'+username
    
    host_image = delete_image_file('image',room_id+'_host_image')
    join_image = delete_image_file('image',room_id+'_join_image')
    host_spectrogram = delete_image_file('graph',host_name)
    join_spectrogram = delete_image_file('graph',join_name)


# function for checkpoint
def checkAllDataRoom(room_id,user):
    room = Room.objects.get(room_id=room_id)
    user_type = 'host'
    if user == room.host:
        user_type = 'host'
    if user == room.join:
        user_type = 'joinee'
    join = room.join
    host_image = room.host_image_status
    join_image = room.join_image_status 
    host_questions = room.host_duration
    join_questions = room.join_duration
    host_audio = room.host_audio_status
    join_audio = room.join_audio_status
    data = {}
    status = []
    check = True

    if join == None:
        message = 'Joinee not joined yet'
        data['join'] = 0
        status.append(message)
        check = False
    else:
        data['join'] = 1

    if host_image == False:
        message = 'Host has not clicked image'
        data['host_image'] = 0
        status.append(message)
        check = False
    else:
        data['host_image'] = 1

    if join_image == False:
        message = 'Joinee has not clicked image'
        data['join_image'] = 0
        status.append(message)
        check = False
    else:
        data['join_image'] = 1

    if host_questions == None:
        message = 'Host has not responded to the questions'
        data['host_questions'] = 0
        status.append(message)
        check = False
    else:
        data['host_questions'] = 1

    if join_questions == None:
        message = 'Joinee has not responded to the questions'
        data['join_questions'] = 0
        status.append(message)
        check = False
    else:
        data['join_questions'] = 1

    if host_audio == None:
        message = 'Host has not recorded audio'
        data['host_audio'] = 0
        status.append(message)
        check = False
    elif host_audio == 0:
        message = 'Host has distorsion in recorded audio'
        data['host_audio'] = 10
        status.append(message)
        check = False
    else:
        data['host_audio'] = 11

    if join_audio == None:
        message = 'Joinee has not recorded audio'
        data['join_audio'] = 0
        status.append(message)
        check = False
    elif join_audio == 0:
        message = 'Joinee has distorsion in recorded audio'
        data['join_audio'] = 10
        status.append(message)
        check = False
    else:
        data['join_audio'] = 11

    return user_type, check, status


# dummy data for creating room instance
# {
#   ntg
# }

# dummy data for joining room instance
# {
#   "room_id" : "UBWbUxQ2"
# }

# dummy data for user image
# {
#   "room_id" : "UBWbUxQ2",
#   "user_image_string" : "base64 string"
# }

# dummy data for user question answers
# {
#   "room_id" : "UBWbUxQ2",
#   "duration" : "xxx.xx",
#   "proximity" : 12
# }

# dummy data for recording audio
# {
#   "room_id" : "UBWbUxQ2",
#   "audio_blob" : "blob"
# }

# dummy data for dashboard
# {
#   "room_id" : "UBWbUxQ2",
# }

# dummy data for checkpoint
# {
#   get method
# }

# dummy data for correlation
# {
#   "room_id" : "UBWbUxQ2",
# }

# dummy data for restart
# {
#   "room_id" : "UBWbUxQ2"
# }

# dummy data for delete all data for room
# {
#     ntg
# }
