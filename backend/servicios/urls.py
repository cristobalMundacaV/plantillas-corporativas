from django.urls import path
from .views import ListaServiciosView,DetalleServicioView

urlpatterns = [
    path('',ListaServiciosView.as_view(), name='lista_servicios'),
    path('<slug:slug>/', DetalleServicioView.as_view(), name='detalle_servicio')
]