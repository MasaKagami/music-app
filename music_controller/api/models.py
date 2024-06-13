from django.db import models
import string
import random

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=8, unique=True)
    guest_can_pause = models.BooleanField(null=False, default= False) #permission (can guest pause or play music [null=False, means we have to pass a value])
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    # we want fat models and thin views.
            # meaning put most of your logic in your models.