from django.contrib import admin
from .models import Proyecto, ImagenProyecto


class ImagenProyectoInline(admin.TabularInline):
    model = ImagenProyecto
    extra = 1
    fields = ('titulo', 'descripcion', 'imagen', 'orden', 'activo')


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'slug', 'tipo_proyecto', 'destacado', 'visible', 'orden')
    list_filter = ('visible', 'destacado', 'tipo_proyecto')
    search_fields = ('titulo', 'slug', 'descripcion_corta', 'descripcion_larga', 'tecnologias')
    ordering = ('orden', '-creado')
    inlines = [ImagenProyectoInline]
