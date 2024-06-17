from rest_framework import serializers
from .models import Room
# Serializers handle converting compelmx data types (like queryset and model instances) to native Python datatypes that can be rendered into JSON, XML.
# takes the model and translate the room to a JSON response.


class RoomSerializer(serializers.ModelSerializer): # 'ModelSerializer' that automatically determines a set of fields based on the Room model.
    class Meta: # specifies the 'Room' model and the fields to be included in the serialization
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at') # each model has a P.K.


# A 'ModelSerializer' focused on handling the creation of rooms
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta: # specifies the same room model but only includes fields necessary for creating a room.
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip') # fields we want to be sent as part of the post request
    