from pathlib import Path
import os

from django.conf import settings
from django.core.management import call_command


def bootstrap_sqlite_database():
    database = settings.DATABASES['default']
    if database['ENGINE'] != 'django.db.backends.sqlite3':
        return

    database_name = database['NAME']
    if database_name == ':memory:':
        return

    database_path = Path(database_name)
    database_path.parent.mkdir(parents=True, exist_ok=True)

    if os.environ.get('SQLITE_BOOTSTRAPPED') == database_name:
        return

    call_command('migrate', interactive=False, verbosity=0)

    from core.models import PerfilEmpresa

    if not PerfilEmpresa.objects.exists():
        fixture_path = settings.BASE_DIR / 'data_dump.json'
        if fixture_path.exists():
            call_command(
                'loaddata',
                str(fixture_path),
                ignorenonexistent=True,
                verbosity=0,
            )

    os.environ['SQLITE_BOOTSTRAPPED'] = database_name
