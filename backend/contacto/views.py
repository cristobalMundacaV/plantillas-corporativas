from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response

from .models import MensajeContacto
from .serializers import MensajeContactoSerializer

class CrearMensajeContactoView(CreateAPIView):
    queryset = MensajeContacto.objects.all()
    serializer_class = MensajeContactoSerializer

    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            {
                'mensaje': 'Tu mensaje fue enviado correctamente.',
                'datos': serializer.data
            },
            status=status.HTTP_201_CREATED
        )

class ListaMensajesContactoView(ListAPIView):
    queryset = MensajeContacto.objects.all().order_by('-creado')
    serializer_class = MensajeContactoSerializer