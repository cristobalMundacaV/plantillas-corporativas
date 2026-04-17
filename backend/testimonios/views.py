from rest_framework.generics import ListAPIView
from .models import Testimonio
from .serializers import TestimonioSerializer

class ListaTestimoniosView(ListAPIView):
    serializer_class = TestimonioSerializer
    def get_queryset(self):
        return Testimonio.objects.filter(activo=True).order_by('orden','-creado')

class ListaTestimoniosDestacadosView(ListAPIView):
    serializer_class = TestimonioSerializer

    def get_queryset(self):
        return Testimonio.objects.filter(
            activo=True,
            destacado=True
        ).order_by('orden','-creado')