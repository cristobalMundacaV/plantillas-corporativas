from django.contrib import admin
from .models import Servicio, ImagenServicio


class ImagenServicioInline(admin.TabularInline):
    model = ImagenServicio
    extra = 1
    fields = ('imagen', 'titulo', 'descripcion', 'orden', 'activo')


@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'destacado', 'activo', 'orden', 'modificado')
    list_filter = ('destacado', 'activo')
    search_fields = ('titulo', 'descripcion_corta', 'descripcion_completa')
    prepopulated_fields = {'slug': ('titulo',)}
    ordering = ('orden', 'titulo')
    inlines = [ImagenServicioInline]


@admin.register(ImagenServicio)
class ImagenServicioAdmin(admin.ModelAdmin):
    list_display = ('servicio', 'titulo', 'orden', 'activo')
    list_filter = ('activo', 'servicio')
    search_fields = ('titulo', 'descripcion', 'servicio__titulo')
    ordering = ('servicio', 'orden')