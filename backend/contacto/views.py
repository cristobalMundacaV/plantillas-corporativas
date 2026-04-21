import logging

from django.contrib import messages
from django.shortcuts import redirect, render
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response

from core.models import PerfilEmpresa
from .forms import MensajeContactoForm
from .models import MensajeContacto
from .serializers import MensajeContactoSerializer
from .services.emails import enviar_correos_contacto

logger = logging.getLogger(__name__)


def contacto_view(request):
    perfil = PerfilEmpresa.objects.first()

    if request.method == 'POST':
        form = MensajeContactoForm(request.POST)
        if form.is_valid():
            mensaje_contacto = form.save()

            try:
                enviar_correos_contacto(
                    mensaje_contacto,
                    perfil,
                    base_url=request.build_absolute_uri('/'),
                )
                messages.success(
                    request,
                    'Tu mensaje fue enviado correctamente. Te responderemos pronto.'
                )
            except Exception as exc:
                messages.warning(
                    request,
                    'Tu mensaje se guardo, pero ocurrio un problema al enviar los correos.'
                )
                logger.exception('Error enviando correos desde contacto_view: %s', exc)

            return redirect('contacto')
    else:
        form = MensajeContactoForm()

    return render(request, 'contacto/contacto.html', {
        'form': form,
        'perfil': perfil,
    })


class CrearMensajeContactoView(CreateAPIView):
    queryset = MensajeContacto.objects.all()
    serializer_class = MensajeContactoSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        mensaje = serializer.save()
        correo_enviado = True
        mensaje_respuesta = 'Tu mensaje fue enviado correctamente.'

        try:
            perfil_empresa = PerfilEmpresa.objects.first()
            enviar_correos_contacto(
                mensaje,
                perfil_empresa,
                base_url=request.build_absolute_uri('/'),
            )
        except ValueError as exc:
            correo_enviado = False
            mensaje_respuesta = f'Tu mensaje se guardo, pero no se enviaron los correos: {exc}'
            logger.warning('Validacion de correos en formulario de contacto: %s', exc)
        except Exception as exc:
            correo_enviado = False
            detalle_error = str(exc).strip() or exc.__class__.__name__
            mensaje_respuesta = (
                'Tu mensaje se guardo, pero no se pudieron enviar los correos: '
                f'{detalle_error}'
            )
            logger.exception(
                'No se pudieron enviar los correos del formulario de contacto: %s',
                detalle_error,
            )

        return Response(
            {
                'mensaje': mensaje_respuesta,
                'correo_enviado': correo_enviado,
                'datos': MensajeContactoSerializer(mensaje).data,
            },
            status=status.HTTP_201_CREATED
        )


class ListaMensajesContactoView(ListAPIView):
    queryset = MensajeContacto.objects.all().order_by('-creado')
    serializer_class = MensajeContactoSerializer
