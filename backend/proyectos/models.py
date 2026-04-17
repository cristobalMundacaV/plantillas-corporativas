from django.db import models
from django.utils.text import slugify


class Proyecto(models.Model):
    titulo = models.CharField(max_length=200)
    slug = models.SlugField(blank=True, null=True, db_index=True)
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

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.titulo)[:45] or 'proyecto'
            slug = base_slug
            contador = 2
            while Proyecto.objects.exclude(pk=self.pk).filter(slug=slug).exists():
                sufijo = f'-{contador}'
                slug = f'{base_slug[:max(1, 45 - len(sufijo))]}{sufijo}'
                contador += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.titulo


class ImagenProyecto(models.Model):
    proyecto = models.ForeignKey(
        Proyecto,
        on_delete=models.CASCADE,
        related_name='imagenes'
    )
    titulo = models.CharField(max_length=150, blank=True, null=True)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    imagen = models.ImageField(upload_to='proyectos/galeria/')
    orden = models.PositiveIntegerField(default=0)
    activo = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Imagen de proyecto'
        verbose_name_plural = 'Imagenes de proyecto'
        ordering = ['orden', 'id']

    def __str__(self):
        return f'{self.proyecto.titulo} - Imagen {self.id}'
