from rest_framework.response import Response
from rest_framework.views import APIView
from .models import PerfilEmpresa
from .serializers import PerfilEmpresaSerializer

class PerfilEmpresaView(APIView):
    def get(self,request):
        perfil = PerfilEmpresa.objects.first()

        if not perfil:
            return Response(
                {'detalle': 'No existe un perfil de empresa registrado.'},
                status=404
            )
        serializer = PerfilEmpresaSerializer(perfil)
        return Response(serializer.data)