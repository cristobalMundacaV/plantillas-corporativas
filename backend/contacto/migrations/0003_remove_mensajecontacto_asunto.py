from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacto', '0002_alter_mensajecontacto_modificado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mensajecontacto',
            name='asunto',
        ),
    ]
