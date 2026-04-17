from rest_framework import serializers
from .models import Servicio, ImagenServicio


class ImagenServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenServicio
        fields = '__all__'


class ServicioSerializer(serializers.ModelSerializer):
    imagenes = serializers.SerializerMethodField()

    class Meta:
        model = Servicio
        fields = '__all__'

    def get_imagenes(self, obj):
        imagenes_activas = obj.imagenes.filter(activo=True).order_by('orden', 'id')
        return ImagenServicioSerializer(imagenes_activas, many=True).data