from django.contrib import admin
from .models import Proyecto


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo_proyecto', 'destacado', 'visible', 'orden')
    list_filter = ('visible', 'destacado', 'tipo_proyecto')
    search_fields = ('titulo', 'descripcion_corta', 'descripcion_larga', 'tecnologias')
    ordering = ('orden', '-creado')
