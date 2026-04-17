from django.urls import path
from .views import ListaTestimoniosView,ListaTestimoniosDestacadosView

urlpatterns = [
    path('',ListaTestimoniosView.as_view(),name='lista_testimonios'),
    path('destacados/', ListaTestimoniosDestacadosView.as_view(), name='lista_testimonios_destacados'),
]