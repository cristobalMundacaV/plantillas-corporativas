from django.db import models

class PerfilEmpresa(models.Model):
    nombre_empresa = models.CharField(max_length=150)
    slogan = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.TextField(blank=True,null=True)
    rubro = models.CharField(max_length=120,blank=True,null=True,help_text='Rubro de la empresa')

    telefono = models.CharField(max_length=30,blank=True,null=True)
    correo=models.EmailField(blank=True,null=True)
    direccion=models.CharField(max_length=255,blank=True,null=True)
    whatsapp = models.CharField(max_length=20,blank=True,null=True)

    logo = models.ImageField(upload_to='empresa/',blank=True,null=True)
    favicon = models.ImageField(upload_to='empresa/',blank=True,null=True)

    color_primario = models.CharField(max_length=20,default='#0f172a')
    color_secundario = models.CharField(max_length=20,default='#2563eb')
    
    instagram = models.URLField(blank=True,null=True)
    facebook = models.URLField(blank=True,null=True)
    linkedin = models.URLField(blank=True,null=True)
    
    titulo_hero = models.CharField(max_length=255,blank=True,null=True)
    subtitulo_hero = models.CharField(max_length=255,blank=True,null=True)
    imagen_hero = models.ImageField(upload_to='hero/',blank=True,null=True)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Perfil de empresa'
        verbose_name_plural = 'Perfil de empresa'

    def __str__(self):
        return self.nombre_empresa






