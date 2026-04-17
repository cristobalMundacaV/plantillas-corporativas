from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Proyecto
from .serializers import ProyectoSerializer


class ListaProyectosView(ListAPIView):
    serializer_class = ProyectoSerializer

    def get_queryset(self):
        return Proyecto.objects.filter(visible=True).order_by('orden', '-creado')


class ListaProyectosDestacadosView(ListAPIView):
    serializer_class = ProyectoSerializer

    def get_queryset(self):
        return Proyecto.objects.filter(
            visible=True,
            destacado=True
        ).order_by('orden', '-creado')


class DetalleProyectoView(RetrieveAPIView):
    serializer_class = ProyectoSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Proyecto.objects.filter(visible=True)
