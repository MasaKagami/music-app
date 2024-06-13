# store URLs local to the app

from django.urls import path
# from .views import main #the function 'main' in the views file
from .views import RoomView

# urlpatterns = [
#     # path('home', main), #returns the main function (returns "Hello, World") @ /home
#     # path('', main), # can have multiple endpoints go to the same place
# ]

urlpatterns = [
    path('room', RoomView.as_view()),
]

# when we make change to database we run: python .\manage.py makemigrations