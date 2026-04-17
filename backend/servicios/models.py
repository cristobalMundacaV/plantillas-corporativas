from django.db import models

class Servicio(models.Model):
    titulo = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    descripcion_corta = models.CharField(max_length=255)
    descripcion_completa = models.TextField(blank=True,null=True)

    icono = models.CharField(max_length=100,blank=True,null=True,help_text='Nombre del icono libreria frontend')
    imagen = models.ImageField(upload_to='servicios/',blank=True,null=True)

    destacado = models.BooleanField(default=False)
    activo = models.BooleanField(default=True)
    orden = models.PositiveIntegerField(default=0)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Servicio'
        verbose_name_plural = 'Servicios'
        ordering = ['orden','titulo']
    
    def __str__(self):
        return self.titulo
    
class ImagenServicio(models.Model):
    servicio = models.ForeignKey(
        Servicio,
        on_delete=models.CASCADE,
        related_name='imagenes'
    )
    titulo = models.CharField(max_length=150, blank=True, null=True)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    imagen = models.ImageField(upload_to='servicios/galeria/')
    orden = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Imagen de servicio'
        verbose_name_plural = 'Imágenes de servicio'
        ordering = ['orden', 'id']

    def __str__(self):
        return f'{self.servicio.titulo} - Imagen {self.id}'