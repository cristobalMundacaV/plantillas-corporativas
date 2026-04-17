from django.db import models


class Proyecto(models.Model):
    nombre_cliente = models.CharField(max_length=150)
    cargo = models.CharField(max_length=150, blank=True, null=True)
    empresa = models.CharField(max_length=150, blank=True, null=True)

    contenido = models.TextField()

    foto = models.ImageField(upload_to='proyectos/', blank=True, null=True)

    puntuacion = models.PositiveSmallIntegerField(default=5)
    destacado = models.BooleanField(default=False)
    activo = models.BooleanField(default=True)
    orden = models.PositiveIntegerField(default=0)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Proyecto'
        verbose_name_plural = 'Proyectos'
        ordering = ['orden', '-creado']

    def __str__(self):
        return f'{self.nombre_cliente} - {self.empresa or "Cliente"}'

