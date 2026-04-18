from django import forms
from .models import MensajeContacto


class MensajeContactoForm(forms.ModelForm):
    class Meta:
        model = MensajeContacto
        fields = ['nombre', 'correo', 'mensaje']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'placeholder': 'Tu nombre',
            }),
            'correo': forms.EmailInput(attrs={
                'placeholder': 'tu@email.com',
            }),
            'mensaje': forms.Textarea(attrs={
                'placeholder': 'Cuentanos tu idea, negocio o lo que necesitas desarrollar...',
                'rows': 6,
            }),
        }
