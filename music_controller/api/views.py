from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
# code to render view
# write api end-point
    #/hello would be an end-point


# A read-only endpoint
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all() # queryset attribute tells the view which records to include in the list. 'Room.objects.all()' <-- retrieves all objwcts from the 'Room' model
    serializer_class = RoomSerializer  # specifies which serializer to use in converting the queryset results to JSON.

# APIView overrides default methods. We can define a GET, POST, PUT method.
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    # handles POST requests to create a new room
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key): # Checks if the current session exists; if not, it creates a new session.
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data) # takes all of our data, serialize it and give a python representitve of it. checks if the data sent is valid or not
        
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host) # looks to see if any of the room in the db that has the same host as the one trying to create a room rn

            if queryset.exists(): # updates an existing room
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

            else: # creating a new room
                room = Room(host=host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)