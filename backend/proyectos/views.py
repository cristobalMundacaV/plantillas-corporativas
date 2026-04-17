from rest_framework.generics import ListAPIView
from .models import Proyecto
from .serializers import ProyectoSerializer


class ListaProyectosView(ListAPIView):
    serializer_class = ProyectoSerializer

    def get_queryset(self):
        return Proyecto.objects.filter(activo=True).order_by('orden', '-creado')


class ListaProyectosDestacadosView(ListAPIView):
    serializer_class = ProyectoSerializer

    def get_queryset(self):
        return Proyecto.objects.filter(
            activo=True,
            destacado=True
        ).order_by('orden', '-creado')

