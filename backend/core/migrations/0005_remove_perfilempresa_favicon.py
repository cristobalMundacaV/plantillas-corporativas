from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_perfilempresa_ubicacion'),
    ]

    operations = [
        migrations.RunSQL(
            sql="""
                ALTER TABLE core_perfilempresa
                DROP COLUMN IF EXISTS favicon CASCADE;
            """,
            reverse_sql=migrations.RunSQL.noop,
        ),
    ]
