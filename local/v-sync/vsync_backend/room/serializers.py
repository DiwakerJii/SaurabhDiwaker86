from rest_framework import serializers
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ['room_id', 'host', 'join', 'host_image_status', 'join_image_status', 'host_duration', 'join_duration', 'host_proximity', 'join_proximity',
                  'host_audio_status', 'join_audio_status', 'is_payment_done', 'correlation']