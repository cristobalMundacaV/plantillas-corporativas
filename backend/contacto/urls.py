from django.urls import path
from .views import CrearMensajeContactoView, ListaMensajesContactoView

urlpatterns=[
    path('',CrearMensajeContactoView.as_view(), name='crear_mensaje_contacto'),
    path('mensajes/', ListaMensajesContactoView.as_view(), name='lista_mensajes_contacto'),
]