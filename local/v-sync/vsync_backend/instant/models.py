from django.db import models
from accounts.models import User
from datetime import date

# choices for gender field of User model
GENDER_CHOICES = [
        ("1", "male"),
        ("2", "female"),
        ("3", "others"),
    ]

class InstantRoom(models.Model):
    room_id = models.CharField(max_length=8)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='local_host')
    user1_full_name = models.CharField(max_length=100, null=True, blank=True)
    user1_gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    user1_date_of_birth = models.DateField(null=True, blank=True)
    user2_full_name = models.CharField(max_length=100, null=True, blank=True)
    user2_gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    user2_date_of_birth = models.DateField(null=True, blank=True)
    duration = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    user_image_status = models.BooleanField(default=False)
    proximity = models.IntegerField(null=True, blank=True)
    user1_audio_status = models.BooleanField(null=True, blank=True)
    user2_audio_status = models.BooleanField(null=True, blank=True)
    is_payment_done = models.BooleanField(default=False)
    payment_status = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.room_id
    

# Room id* is of 8 characters [model] and is unique [views]
# duration can be xxx.xx (in years) 
