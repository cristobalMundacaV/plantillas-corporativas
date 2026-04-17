from django.contrib import admin
from .models import MensajeContacto

@admin.register(MensajeContacto)
class MensajeContactoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'correo', 'telefono', 'leido', 'respondido', 'creado')
    list_filter = ('leido', 'respondido', 'creado')
    search_fields = ('nombre', 'correo', 'telefono', 'asunto', 'mensaje')
    ordering = ('-creado',)