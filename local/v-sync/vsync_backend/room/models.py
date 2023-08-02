from django.db import models
from accounts.models import User


class Room(models.Model):
    room_id = models.CharField(max_length=8)
    host = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='room2_host')
    join = models.ForeignKey(User, on_delete=models.SET_NULL,
                             null=True, blank=True, related_name='room2_join')
    host_image_status = models.BooleanField(default=False)
    join_image_status = models.BooleanField(default=False)
    host_duration = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)
    join_duration = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)
    host_proximity = models.IntegerField(null=True, blank=True)
    join_proximity = models.IntegerField(null=True, blank=True)
    host_audio_status = models.BooleanField(null=True, blank=True)
    join_audio_status = models.BooleanField(null=True, blank=True)
    payment_status = models.CharField(max_length=100, null=True, blank=True)
    is_payment_done = models.BooleanField(default=False)
    correlation = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.room_id


# Room id* is of 8 characters [model] and is unique [views]
# duration can be xxx.xx (in years)
