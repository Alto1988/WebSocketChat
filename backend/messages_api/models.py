from django.db import models
from api.models import ChatRoom
# Create your models here.


class Messages(models.Model):
    chat = models.ForeignKey(ChatRoom,
                             on_delete=models.CASCADE,
                             related_name='messages')
    user_name = models.CharField(max_length=120)
    text = models.TextField()

    def __str__(self):
        return f"{self.chat.room_name}-{self.user_name}"
