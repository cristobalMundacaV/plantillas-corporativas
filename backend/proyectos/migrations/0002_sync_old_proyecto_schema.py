from django.db import migrations


def sync_old_proyecto_schema(apps, schema_editor):
    if schema_editor.connection.vendor != 'postgresql':
        return

    schema_editor.execute("""
        DO $$
        BEGIN
            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'nombre_cliente'
            ) THEN
                ALTER TABLE proyectos_proyecto RENAME COLUMN nombre_cliente TO titulo;
            END IF;

            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'contenido'
            ) THEN
                ALTER TABLE proyectos_proyecto RENAME COLUMN contenido TO descripcion_larga;
            END IF;

            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'foto'
            ) THEN
                ALTER TABLE proyectos_proyecto RENAME COLUMN foto TO imagen;
            END IF;

            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'activo'
            ) THEN
                ALTER TABLE proyectos_proyecto RENAME COLUMN activo TO visible;
            END IF;

            IF NOT EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'descripcion_corta'
            ) THEN
                ALTER TABLE proyectos_proyecto
                ADD COLUMN descripcion_corta varchar(280) NOT NULL DEFAULT '';
            END IF;

            IF NOT EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'tecnologias'
            ) THEN
                ALTER TABLE proyectos_proyecto
                ADD COLUMN tecnologias varchar(200);
            END IF;

            IF NOT EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'url_proyecto'
            ) THEN
                ALTER TABLE proyectos_proyecto
                ADD COLUMN url_proyecto varchar(200);
            END IF;

            IF NOT EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'tipo_proyecto'
            ) THEN
                ALTER TABLE proyectos_proyecto
                ADD COLUMN tipo_proyecto varchar(100) NOT NULL DEFAULT 'Web Corporativa';
            END IF;

            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'descripcion_larga'
            ) THEN
                UPDATE proyectos_proyecto
                SET descripcion_corta = LEFT(descripcion_larga, 280)
                WHERE COALESCE(descripcion_corta, '') = '';
            END IF;

            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'cargo'
            ) THEN
                ALTER TABLE proyectos_proyecto DROP COLUMN cargo;
            END IF;

            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'empresa'
            ) THEN
                ALTER TABLE proyectos_proyecto DROP COLUMN empresa;
            END IF;

            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'proyectos_proyecto'
                  AND column_name = 'puntuacion'
            ) THEN
                ALTER TABLE proyectos_proyecto DROP COLUMN puntuacion;
            END IF;
        END
        $$;
    """)


def noop_reverse(apps, schema_editor):
    return


class Migration(migrations.Migration):

    dependencies = [
        ('proyectos', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(sync_old_proyecto_schema, noop_reverse),
    ]
