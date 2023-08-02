from rest_framework import serializers
from .models import InstantRoom
from datetime import date


class InstantRoomSerializer(serializers.ModelSerializer):
    
    # date_of_birth can not be a future date
    def validate_user1_date_of_birth(self, value):
        if value > date.today():
            raise serializers.ValidationError("Date of birth cannot be a future date.")
        return value  
    def validate_user2_date_of_birth(self, value):
        if value > date.today():
            raise serializers.ValidationError("Date of birth cannot be a future date.")
        return value  
    
    class Meta:
        model = InstantRoom
        fields = ['room_id', 'host', 'user1_full_name', 'user1_gender', 'user1_date_of_birth',  'user2_full_name',
                  'user2_gender', 'user2_date_of_birth',  'user_image_status', 'duration', 'proximity', 'user1_audio_status', 'user2_audio_status', 'is_payment_done']
