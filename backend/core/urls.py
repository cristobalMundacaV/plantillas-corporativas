from django.urls import path
from .views import PerfilEmpresaView

urlpatterns=[
    path('empresa/', PerfilEmpresaView.as_view(),name='perfil_empresa')
]