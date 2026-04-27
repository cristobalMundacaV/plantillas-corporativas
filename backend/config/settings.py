from pathlib import Path
import os
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'dev-insegura-cambiar-en-produccion')

DEBUG = os.getenv('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')
if '.vercel.app' not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append('.vercel.app')

vercel_url = os.getenv('VERCEL_URL')
if vercel_url and vercel_url not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(vercel_url)

CSRF_TRUSTED_ORIGINS = os.getenv(
    'CSRF_TRUSTED_ORIGINS',
    'http://127.0.0.1,http://localhost'
).split(',')

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'anymail',
    'contacto',
    'core',
    'testimonios',
    'proyectos',
    'servicios',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # debe ir arriba de CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

def get_database_config():
    database_url = (
        os.getenv('DATABASE_URL')
        or os.getenv('POSTGRES_URL')
        or os.getenv('POSTGRES_URL_NON_POOLING')
    )

    if database_url:
        parsed = urlparse(database_url)
        return {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': parsed.path.lstrip('/'),
            'USER': parsed.username or '',
            'PASSWORD': parsed.password or '',
            'HOST': parsed.hostname or '',
            'PORT': parsed.port or '',
            'OPTIONS': {'sslmode': 'require'},
        }

    db_engine = os.getenv('DB_ENGINE', 'django.db.backends.sqlite3')
    db_host = os.getenv('DB_HOST', '')

    if os.getenv('VERCEL') and db_host == 'db':
        db_engine = 'django.db.backends.sqlite3'
        db_host = ''

    sqlite_name = os.getenv(
        'DB_NAME',
        '/tmp/db.sqlite3' if os.getenv('VERCEL') else str(BASE_DIR / 'db.sqlite3')
    )

    return {
        'ENGINE': db_engine,
        'NAME': sqlite_name,
        'USER': os.getenv('DB_USER', ''),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': db_host,
        'PORT': os.getenv('DB_PORT', ''),
    }


DATABASES = {
    'default': get_database_config()
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'es-cl'
TIME_ZONE = 'America/Santiago'

USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = os.getenv(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:5173,http://127.0.0.1:5173'
).split(',')

EMAIL_BACKEND = "anymail.backends.resend.EmailBackend"
ANYMAIL = {
    "RESEND_API_KEY": os.getenv("RESEND_API_KEY"),
}
DEFAULT_FROM_EMAIL = os.getenv(
    "DEFAULT_FROM_EMAIL",
    "Mundaca Solutions <noreply@send.mundacasolutions.com>"
)
CONTACT_EMAIL = os.getenv('CONTACT_EMAIL', 'contacto@mundacasolutions.com')
SERVER_EMAIL = DEFAULT_FROM_EMAIL
SITE_URL = os.getenv('SITE_URL', '')
