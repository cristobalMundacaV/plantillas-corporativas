#!/bin/sh

set -e

if [ -n "$VERCEL" ] && [ "$DB_HOST" = "db" ]; then
  echo "DB_HOST=db es solo para Docker Compose; en Vercel se usara SQLite."
  export DB_ENGINE=django.db.backends.sqlite3
  export DB_NAME=/tmp/db.sqlite3
  unset DB_HOST
  unset DB_PORT
fi

if [ "$DB_ENGINE" != "django.db.backends.sqlite3" ] && [ -n "$DB_HOST" ]; then
  echo "Esperando a PostgreSQL..."
  while ! nc -z "$DB_HOST" "$DB_PORT"; do
    sleep 1
  done

  echo "PostgreSQL listo."
else
  echo "Usando SQLite o base de datos sin host TCP; se omite espera de PostgreSQL."
fi

python manage.py migrate --noinput
python manage.py collectstatic --noinput

python manage.py shell -c "from core.models import PerfilEmpresa; raise SystemExit(0 if PerfilEmpresa.objects.exists() else 1)" || {
  if [ -f data_dump.json ]; then
    echo "Cargando datos iniciales desde data_dump.json..."
    python manage.py loaddata data_dump.json --ignorenonexistent
  fi
}

exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
