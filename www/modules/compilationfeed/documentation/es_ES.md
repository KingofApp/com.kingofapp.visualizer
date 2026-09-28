# Estado de compilación

Módulo para mostrar el estado y los últimos hitos de una compilación de King of App sin exponer datos personales. La interfaz solo presenta el nombre de la app, la plataforma, estados traducidos y errores clasificados; no muestra mensajes sin filtrar de Slack, identificadores internos, correos, teléfonos, teléfonos de verificación, logs privados ni enlaces de descarga.

## Configuración

Un propietario o administrador de la app genera el token de seguimiento en King of App. Pégalo en el campo **Token de seguimiento** y trátalo como un enlace privado revocable. El campo **Base API de estados** solo indica dónde obtener el JSON; no aloja el JavaScript del widget.

El widget web se sirve desde un CDN estático independiente. La URL de API se usa exclusivamente para consultar el estado depurado. Se actualiza automáticamente cada 10 segundos.

Para revocar el enlace, usa la opción de revocación autenticada del API. Al crear otro token, el anterior deja de funcionar.
