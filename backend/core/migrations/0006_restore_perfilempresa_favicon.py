from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_perfilempresa_favicon'),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[
                migrations.RunSQL(
                    sql="""
                        ALTER TABLE core_perfilempresa
                        ADD COLUMN IF NOT EXISTS favicon varchar(100);
                    """,
                    reverse_sql=migrations.RunSQL.noop,
                ),
            ],
            state_operations=[
                migrations.AddField(
                    model_name='perfilempresa',
                    name='favicon',
                    field=models.ImageField(blank=True, null=True, upload_to='empresa/'),
                ),
            ],
        ),
    ]
