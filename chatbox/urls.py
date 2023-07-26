from django.urls import path

from . import views

urlpatterns = [
    path('/chat', views.getChatBox.as_view()),
]
