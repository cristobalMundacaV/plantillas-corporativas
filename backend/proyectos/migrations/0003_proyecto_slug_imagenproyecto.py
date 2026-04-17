from django.db import migrations, models
from django.utils.text import slugify


def poblar_slugs_proyectos(apps, schema_editor):
    Proyecto = apps.get_model('proyectos', 'Proyecto')
    usados = set()

    for proyecto in Proyecto.objects.all().order_by('id'):
        base_slug = slugify(proyecto.titulo)[:45] or f'proyecto-{proyecto.id}'
        slug = base_slug
        contador = 2
        while slug in usados or Proyecto.objects.exclude(pk=proyecto.pk).filter(slug=slug).exists():
            sufijo = f'-{contador}'
            slug = f'{base_slug[:max(1, 45 - len(sufijo))]}{sufijo}'
            contador += 1
        proyecto.slug = slug
        proyecto.save(update_fields=['slug'])
        usados.add(slug)


class Migration(migrations.Migration):

    dependencies = [
        ('proyectos', '0002_sync_old_proyecto_schema'),
    ]

    operations = [
        migrations.AddField(
            model_name='proyecto',
            name='slug',
            field=models.SlugField(blank=True, null=True),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='ImagenProyecto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(blank=True, max_length=150, null=True)),
                ('descripcion', models.CharField(blank=True, max_length=255, null=True)),
                ('imagen', models.ImageField(upload_to='proyectos/galeria/')),
                ('orden', models.PositiveIntegerField(default=0)),
                ('activo', models.BooleanField(default=True)),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('proyecto', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='imagenes', to='proyectos.proyecto')),
            ],
            options={
                'verbose_name': 'Imagen de proyecto',
                'verbose_name_plural': 'Imagenes de proyecto',
                'ordering': ['orden', 'id'],
            },
        ),
        migrations.RunPython(poblar_slugs_proyectos, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='proyecto',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
    ]
