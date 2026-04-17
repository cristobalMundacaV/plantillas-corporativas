from django.db import models

class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=150)
    correo = models.EmailField()
    telefono = models.CharField(max_length=30, blank=True, null=True)
    asunto = models.CharField(max_length=200, blank=True, null=True)
    mensaje = models.TextField()

    leido = models.BooleanField(default=False)
    respondido = models.BooleanField(default=False)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Mensaje de Contacto'
        verbose_name_plural = 'Mensajes de Contacto'
        ordering = ['-creado']

        def __str__(self):
            return f'{self.nombre} - {self.correo}'

