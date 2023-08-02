from .serializers import UserSerializer, LoginSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


# Register user 
# username and password are compulsory
# username is coming as "email" from frontend
class UserRegister(APIView):  
    def post(self, request):
        try:
            data = request.data

            # to convert email into username
            username = {'username':data.get('email')}
            data.pop('email')
            data = {**username, **data}
            
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                user = User.objects.create_user(username=serializer.data['username'], password=serializer.validated_data['password'],
                                                      full_name=serializer.data['full_name'], gender=serializer.data['gender'],
                                                      date_of_birth=serializer.data['date_of_birth'],)
                username = {'user' : user.username}
                return Response({
                    'status': 200,
                    'message': 'Registration successfull!!',
                    'data' : username
                })
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': serializer.errors,
            })
        except Exception as e:
            print('Error raised...', e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error':str(e)},
            })


        
# Login user, using username and password
# simple jwt is used for login, access_token is valid for 20 days i.e. user has to login again after 20 days
class UserLogin(APIView):
    # username and password required 
    def post(self, request):
        try:
            data = request.data

            # to convert email into username
            username = data.get('email')
            password = data.get('password')
            data = {'username':username, 'password':password}

            user_serializer = LoginSerializer(data=data)
            if user_serializer.is_valid():
                username = user_serializer.data['username']
                password = user_serializer.data['password']
                user = authenticate(username=username, password=password)

                # checks if user exists, else throws Error
                if user:
                    # generating refresh token on successfull login
                    user = User.objects.get(username=username)
                    refresh_token = RefreshToken.for_user(user)

                    # check whether health related infomation are filled or not
                    is_filled = user.covid19
                    if is_filled == None: 
                        filled = 'No'
                    else:
                        filled = 'Yes'

                    return Response({
                        'status': 200,
                        'message': 'Login Successfull',
                        'data': user_serializer.data.get('username'),
                        'health_related_info' : filled,
                        'refresh_token': str(refresh_token),
                        'access_token': str(refresh_token.access_token),
                    })
                return Response({
                    'status': 400,
                    'message': 'Invalid username or password',
                    'data': user_serializer.errors,
                })
                
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': user_serializer.errors,
            })
        except Exception as e:
            print('Error raised...', e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error':str(e)},
            })



# update user instance to add health related information
class HealthRelatedInfo(APIView):
    # user should be authenticated i.e. logged in to fill health related info
    permission_classes = (IsAuthenticated,)

    def patch(self, request):
        try:
            data = request.data
            user_id = request.user.id    # get the user_id of the logged in user
            user = User.objects.get(id=user_id) # get the user, if user does not exists Error is raised
            user_serializer = UserSerializer(user, data=data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response({
                    'status': 200,
                    'message': 'User data updated successfully',
                    'data': user_serializer.data,
                })
            return Response({
                'status': 400,
                'message': 'Validation error',
                'data': user_serializer.errors,
            })   
        except Exception as e:
            print('Error raised...', e)
            return Response({
                'status': 400,
                'message': 'Something went wrong',
                'data': {'Error':str(e)},
            })







#  dummy data for user registration
# {
#     "email" : "demo",
#     "password":"1234Demo",
#     "full_name":"myself you",
#     "gender":"1",
#     "date_of_birth":"2002-01-23"
# }

# dummy data for user login
# {
#     "email" : "demo",
#     "password" : "1234"
# } 

# dummy data for patch method
# {
#     "covid19" : "True",
#     "smoking" : "False",
#     "heart_related_disease" : "True",
#     "diabetes" : "False",
#     "hypertension" : "True"
# }
