from django.contrib import admin
from .models import Proyecto


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('nombre_cliente', 'empresa', 'puntuacion', 'destacado', 'activo')
    list_filter = ('activo', 'destacado', 'puntuacion')
    search_fields = ('nombre_cliente', 'empresa', 'contenido', 'cargo')
    ordering = ('orden', '-creado')

