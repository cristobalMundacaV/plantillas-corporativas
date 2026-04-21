from django.core import mail
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from core.models import PerfilEmpresa


@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
class ContactoCorreoTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/contacto/'

    def test_envia_correos_con_perfil_empresa_valido(self):
        PerfilEmpresa.objects.create(
            nombre_empresa='Mundaca Solutions',
            correo='contacto@mundacasolutions.com',
        )

        response = self.client.post(
            self.url,
            {
                'nombre': 'Cliente Demo',
                'correo': 'cliente@example.com',
                'mensaje': 'Necesito una cotizacion.',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.data['correo_enviado'])
        self.assertEqual(len(mail.outbox), 2)

    def test_no_envia_correos_si_el_correo_de_perfil_empresa_es_invalido(self):
        PerfilEmpresa.objects.create(
            nombre_empresa='Mundaca Solutions',
            correo='correo-invalido',
        )

        response = self.client.post(
            self.url,
            {
                'nombre': 'Cliente Demo',
                'correo': 'cliente@example.com',
                'mensaje': 'Necesito una cotizacion.',
            },
            format='json',
        )

        self.assertEqual(response.status_code, 201)
        self.assertFalse(response.data['correo_enviado'])
        self.assertIn('PerfilEmpresa', response.data['mensaje'])
        self.assertEqual(len(mail.outbox), 0)
