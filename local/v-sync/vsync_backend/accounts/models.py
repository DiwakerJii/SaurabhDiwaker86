from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date
from .managers import UserManager

# choices for gender field of User model
GENDER_CHOICES = [
        ("1", "male"),
        ("2", "female"),
        ("3", "others"),
    ]

# Customising AbstractUser
class User(AbstractUser):

    username = models.CharField(unique=True,max_length=25)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    # health related fields
    covid19 = models.BooleanField(null=True, blank=True)
    smoking = models.BooleanField(null=True, blank=True)
    heart_related_disease = models.BooleanField(null=True, blank=True)
    diabetes = models.BooleanField(null=True, blank=True)
    hypertension = models.BooleanField(null=True, blank=True)
    

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
    



    # VALIDATIONS:

    # username* should be unique and can be of max length 25 [models]
    # username can only include letters, numbers, underscores and full stops [serializer]
    # username should contain minimum 4 characters and maximum 25 characters [serializer]
    # username can't start or end with a full stop [serializer]
    # username cannot contain only numbers [serializer]
    # password* validated according to inbuilt validation [serializer]
    # full_name can have maximum length of 100 [models]
    # gender can be string 1,2 or 3 (1=male, 2=female, 3=others) [models]
    # date_of_birth has format "YYYY-MM-DD" It checks if the provided date is a valid date according to the Gregorian calendar. This includes checking for leap years, valid month values (1 to 12), and valid day values based on the month and year.[models]
    # date_of_birth can not be a future date [serializer]
    # covid19, smoking, heart_related_disease, diabates, hypertension can have either True or False [models]
    # *required [usermanager]
