from rest_framework import serializers
from .models import MensajeContacto

class MensajeContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeContacto
        fields = '__all__'
        read_only_fields = ('leido','respondido','creado','modificado')