from rest_framework import serializers
from .models import PerfilEmpresa

class PerfilEmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilEmpresa
        fields = '__all__'