from django.urls import path
from .views import ListaProyectosView, ListaProyectosDestacadosView, DetalleProyectoView

urlpatterns = [
    path('', ListaProyectosView.as_view(), name='lista_proyectos'),
    path('destacados/', ListaProyectosDestacadosView.as_view(), name='lista_proyectos_destacados'),
    path('<slug:slug>/', DetalleProyectoView.as_view(), name='detalle_proyecto'),
]
