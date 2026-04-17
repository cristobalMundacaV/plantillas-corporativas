from rest_framework import serializers
from .models import Proyecto, ImagenProyecto


class ImagenProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenProyecto
        fields = '__all__'


class ProyectoSerializer(serializers.ModelSerializer):
    imagenes = serializers.SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = '__all__'

    def get_imagenes(self, obj):
        imagenes_activas = obj.imagenes.filter(activo=True).order_by('orden', 'id')
        return ImagenProyectoSerializer(imagenes_activas, many=True).data
