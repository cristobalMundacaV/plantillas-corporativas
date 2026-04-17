from django.db import models


class Proyecto(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion_corta = models.CharField(max_length=280)
    descripcion_larga = models.TextField()

    imagen = models.ImageField(upload_to='proyectos/', blank=True, null=True)

    tecnologias = models.CharField(max_length=200, blank=True, null=True)
    url_proyecto = models.URLField(blank=True, null=True)
    tipo_proyecto = models.CharField(max_length=100)

    destacado = models.BooleanField(default=False)
    visible = models.BooleanField(default=True)
    orden = models.PositiveIntegerField(default=0)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['orden', '-creado']

    def __str__(self):
        return self.titulo
