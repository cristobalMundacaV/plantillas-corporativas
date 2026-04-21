import logging

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.mail import EmailMultiAlternatives
from django.core.validators import validate_email
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)


def _obtener_logo_url(perfil_empresa, base_url=None):
    logo = getattr(perfil_empresa, 'logo', None)
    if not logo:
        return None

    try:
        logo_url = logo.url
    except Exception:
        return None

    if logo_url.startswith('http://') or logo_url.startswith('https://'):
        return logo_url

    if base_url:
        return f"{base_url.rstrip('/')}{logo_url}"

    site_url = getattr(settings, 'SITE_URL', '')
    if site_url:
        return f"{site_url.rstrip('/')}{logo_url}"

    return logo_url


def enviar_correo_html(
    asunto: str,
    destinatarios: list[str],
    template_txt: str,
    template_html: str,
    contexto: dict,
    reply_to: list[str] | None = None,
):
    cuerpo_txt = render_to_string(template_txt, contexto)
    cuerpo_html = render_to_string(template_html, contexto)

    logger.info(
        'Enviando correo "%s" a %s desde %s',
        asunto,
        destinatarios,
        settings.DEFAULT_FROM_EMAIL,
    )

    email = EmailMultiAlternatives(
        subject=asunto,
        body=cuerpo_txt,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=destinatarios,
        reply_to=reply_to,
    )
    email.attach_alternative(cuerpo_html, 'text/html')
    email.send(fail_silently=False)
    logger.info('Correo "%s" enviado correctamente a %s', asunto, destinatarios)


def _validar_correo_obligatorio(correo: str, campo: str):
    correo_limpio = (correo or '').strip()
    if not correo_limpio:
        raise ValueError(f'{campo} no esta configurado.')

    try:
        validate_email(correo_limpio)
    except ValidationError as exc:
        raise ValueError(f'{campo} no es un correo valido.') from exc

    return correo_limpio


def enviar_correos_contacto(mensaje_contacto, perfil_empresa, base_url=None):
    if not perfil_empresa:
        raise ValueError('PerfilEmpresa no esta configurado para enviar correos.')

    correo_empresa = _validar_correo_obligatorio(
        getattr(perfil_empresa, 'correo', ''),
        'El correo de PerfilEmpresa',
    )
    correo_cliente = _validar_correo_obligatorio(
        getattr(mensaje_contacto, 'correo', ''),
        'El correo del cliente',
    )

    nombre_empresa = (
        getattr(perfil_empresa, 'nombre_empresa', '') or 'Nuestra empresa'
    )

    contexto = {
        'mensaje': mensaje_contacto,
        'perfil': perfil_empresa,
        'nombre_empresa': nombre_empresa,
        'logo_url': _obtener_logo_url(perfil_empresa, base_url=base_url),
        'color_primario': getattr(perfil_empresa, 'color_primario', '') or '#0f172a',
        'color_secundario': getattr(perfil_empresa, 'color_secundario', '') or '#2563eb',
    }

    enviar_correo_html(
        asunto=f'Nuevo contacto desde la web - {nombre_empresa}',
        destinatarios=[correo_empresa],
        template_txt='emails/contacto_interno.txt',
        template_html='emails/contacto_interno.html',
        contexto=contexto,
        reply_to=[correo_cliente],
    )

    enviar_correo_html(
        asunto=f'Recibimos tu solicitud - {nombre_empresa}',
        destinatarios=[correo_cliente],
        template_txt='emails/contacto_cliente.txt',
        template_html='emails/contacto_cliente.html',
        contexto=contexto,
    )
