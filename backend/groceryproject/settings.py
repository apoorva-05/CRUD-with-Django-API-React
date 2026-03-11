# groceryproject/settings.py
from pathlib import Path
import os
import dj_database_url

# --------------------------
# BASE DIRECTORY
# --------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# --------------------------
# SECURITY
# --------------------------
# Use environment variables for production
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', '}Gdz2zG[dU^!^8??')
DEBUG ='True'
ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    "crud-drf.up.railway.app",
]

# --------------------------
# APPLICATIONS
# --------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',
    'grocery',
]

# --------------------------
# MIDDLEWARE
# --------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',

    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# --------------------------
# URLS
# --------------------------
ROOT_URLCONF = 'groceryproject.urls'

# --------------------------
# TEMPLATES
# --------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

# --------------------------
# WSGI
# --------------------------
WSGI_APPLICATION = 'groceryproject.wsgi.application'

# --------------------------
# DATABASE
# --------------------------
# Uses DATABASE_URL from Railway if available, otherwise SQLite for dev
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}"
    )
}

# --------------------------
# PASSWORD VALIDATION
# --------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# --------------------------
# INTERNATIONALIZATION
# --------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --------------------------
# STATIC FILES
# --------------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# --------------------------
# CORS (React frontend)
# --------------------------
# CORS
CORS_ALLOW_ALL_ORIGINS = True

# --------------------------
# DEFAULT PRIMARY KEY
# --------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'