from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Servicio
from .serializers import ServicioSerializer

class ListaServiciosView(ListAPIView):
    serializer_class = ServicioSerializer

    def get_queryset(self):
        return Servicio.objects.filter(activo=True).order_by('orden','titulo')
    
class DetalleServicioView(RetrieveAPIView):
    serializer_class = ServicioSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        return Servicio.objects.filter(activo=True)