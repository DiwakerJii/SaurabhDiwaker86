from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from datetime import date
import string


class UserSerializer(serializers.ModelSerializer):
    # username validations
    def validate_username(self,value):
        match=string.ascii_letters + string.digits + '_' + '.'
        if not all([x in match for x in value]):
            raise serializers.ValidationError("Usernames can only include letters, numbers, underscores and full stops.")
        if not (len(value) >=4 and len(value) <=25):
            raise serializers.ValidationError("Usernames should contain minimum 4 characters and maximum 25 characters.")
        if value[0] == '.' or value[-1:] == '.':
            raise serializers.ValidationError("You can't start or end your username with a full stop.")
        if value.isdigit():
            raise serializers.ValidationError("Your username cannot contain only numbers.")
        return value

    # password can only be written and cant be read
    password = serializers.CharField(write_only=True)
    
    # validating password
    def validate_password(self, value):
        validate_password(value)
        return value
    
    # date_of_birth can not be a future date
    def validate_date_of_birth(self, value):
        if value > date.today():
            raise serializers.ValidationError("Date of birth cannot be a future date.")
        return value
    
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'full_name', 'gender', 'date_of_birth', 'covid19',
                  'smoking', 'heart_related_disease', 'diabetes', 'hypertension']
        

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()