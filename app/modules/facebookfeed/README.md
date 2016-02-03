# **(How to) Configurar el módulo Facebook**

Una de las partes más importantes de una App es, sin lugar a duda, su contenido. Hay que meterle cosas que interesen al usuario, de lo contrario nunca la va a encontrar útil para sus propósitos y eso significa la muerte de una App. Incluir un acceso a las rede sociales es un buen punto de partida para que las visitas a una App sean algo recurrente. Por ello, hoy vamos a explicar cómo configurar uno de los módulos más recurrentes en King of App: el de Facebook.

Para todos es sabido que las redes sociales son elemento clave para fidelizar, por ello en nuestro market de módulos ponemos a vuestra disposición todo tipo de accesos a las principales con lo que sólo hay que elegir la o las que más os convengan. En el caso de hoy, elegiremos el módulo de Facebook. Con él los usuarios de la App tendrán acceso al feed de noticias de la página que elijas.

Con el módulo cargado en nuestro escritorio de trabajo, llega el momento de configurarlo. Para ello tendrás que clicar en el icono "Editar", lógico ¿no?. Ante ti se abrirá una pestaña donde deberás añadir una serie de datos. El primero de ellos es darle nombre al módulo. Es decir, debes decidir cómo quieres que los usuarios vean este módulo. Si no tocas nada se verá como un genérico "Facebook feed". Edítalo como te sientas más cómodo, bautízalo.

Una vez elegido el nombre del módulo llega el momento de entrar los datos reales de configuración. Por un lado va a ser necesario que entres el id de la página. Eso significa copiar la url de destino de la página. Normalmente todas siguen el siguiente esquema:

http://www.facebook.com/pages/Nombre_de_la_Página. Con ello, nosotros podremos ubicarla y saber donde debemos ir a buscar la información.

El otro dato ya es algo más complicado pues requiere un paso previo; se trata del acces token. Este código es necesario para que podamos acceder a los datos del feed de la página. Es, para que nos entendamos fácilmente, una llave de acceso. ¿De donde se saca? Muy sencillo, hay que seguir los pasos que desde Facebook se nos indican en su página para desarrolladores: https://developers.facebook.com/docs/facebook-login/access-tokens En este enlace vas a encontrar toda la información necesaria para conseguir este dato.

Sin embaro, como seguro que no tienes ni tiempo ni paciencia, desarrolladores como Cesar Mancilla en su blog (http://cesarmansilla.com/blog) nos lo explican paso a paso:

_Paso 1: “**Obtener un User access token**”_

1.  _Ir al Graph API Explorer: [https://developers.facebook.com/tools/explorer/](https://developers.facebook.com/tools/explorer/ "Graph API Explorer")_
2.  _Seleccionar la aplicación con la que trabajaremos del menú desplegable_
3.  _Hacer click en el botón “**Get Access Token**“_
4.  _Se abrirá una ventana, vamos a la solapa de “**Extended Permissions**” y debemos tildar el permiso “**manage_pages**” y opcionalmente todos aquellos que creamos necesarios para nuestro programa_
5.  _Click en “**Get Access Token**“. Obtendremos el string con el token en el campo de texto._

_Paso 2: “**Consultar los pages access token de las fanpages que administramos**”_

1.  _En el campo para ejecutar llamadas a la API de Facebook esxribiremos: “**me/accounts**“_
2.  _Click en “**Submit**“_
3.  _Obtendremos un listado de fanpages que administramos, deberemos buscar aquella con la que vayamos a trabajar y copiar el valor de “**access_token**“_

_Este **Page access token** expira luego de 1 hora, por lo que ahora pasaremos al método para obtener uno que no expire nunca:_

1.  _Necesitamos un **User access token**, lo podremos obtener con el paso 1 visto anteriormente._
2.  _Necesitamos el “**App Secret**“. Entramos al dashboard de nuestra aplicación, hacemos click en el botón “Show” al lado del campo “App Secret”. Nos pedirá nuestra contraseña para mostrar el campo._
    *   _Aquí también tendremos nuestro “**App ID**“_
3.  _Estos 3 datos deberán ser reemplazados en la siguiente URL según corresponda: https://graph.facebook.com/v2.0/oauth/access_token?grant_type=fb_exchange_token&client_id=**[APP-ID]**&client_secret=**[APP-SECRET]**&fb_exchange_token=**[USER-ACCESS-TOKEN]**_
4.  _Una vez reemplazados los datos, los pegamos en un navegador y tocamos enter, allí veremos un string conocido como “**Long lived User Access Token**” que expira en 2 meses._
5.  _Copiamos este token, lo pegamos en el campo “**Access Token**” en el [Graph API Explorer](https://developers.facebook.com/tools/explorer/ "Graph API Explorer") y hacemos lo explicado en el paso 2 para obtener un **Page Access Token** que nunca expira._

Con los tres campos debidamente cumplimentados, ya tenemos el módulo de facebook completamente configurado y listo para ser utilizado en la App.

¿Fácil, verdad?
