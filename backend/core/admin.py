from django.contrib import admin
from .models import PerfilEmpresa

@admin.register(PerfilEmpresa)
class PerfilEmpresaAdmin(admin.ModelAdmin):
    list_display = ('nombre_empresa','telefono','correo','modificado','rubro','direccion')
    search_fields = ('nombre_empresa','correo','telefono')

