from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


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

    email = EmailMultiAlternatives(
        subject=asunto,
        body=cuerpo_txt,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=destinatarios,
        reply_to=reply_to,
    )
    email.attach_alternative(cuerpo_html, 'text/html')
    email.send(fail_silently=False)


def enviar_correos_contacto(mensaje_contacto, perfil_empresa, base_url=None):
    if not perfil_empresa or not perfil_empresa.correo:
        raise ValueError('PerfilEmpresa no tiene correo configurado.')

    correo_cliente = (getattr(mensaje_contacto, 'correo', '') or '').strip()
    correo_empresa = (perfil_empresa.correo or '').strip()

    if not correo_cliente:
        raise ValueError('El mensaje de contacto no tiene correo del cliente.')

    nombre_empresa = perfil_empresa.nombre_empresa or 'Nuestra empresa'

    contexto = {
        'mensaje': mensaje_contacto,
        'perfil': perfil_empresa,
        'nombre_empresa': nombre_empresa,
        'logo_url': _obtener_logo_url(perfil_empresa, base_url=base_url),
        'color_primario': perfil_empresa.color_primario or '#0f172a',
        'color_secundario': perfil_empresa.color_secundario or '#2563eb',
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
