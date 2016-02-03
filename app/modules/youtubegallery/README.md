# **(How to) Configurar el módulo Youtube**

¡**Youtubers** del mundo, uníos en una App! El poder del vídeo también ha llegado a **King of App** y por ello hemos desarrollado dos módulos ligados a la principal red social del **broadcasting**. Con uno podrás mostrar todos **los vídeos de un canal**; con el otro, solo estará disponible para los usuarios de la aplicación un único vídeo.

El módulo más sencillo es el módulo "_Youtube Video_". Con él cargarás los vídeos de uno en uno. Para configurarlo sólo te pedimos el **ID del vídeo** que quieras cargar. Para localizarlo sólo tienes que fijarte en la url y copiar el código que sale al final de la misma. Por ejemplo, si tomamos uno de nuestros vídeos colgados en **Youtube**, la url es esta:

www.youtube.com/watch?v=**7P2oPc9lck4**

Todas siguen un mismo patrón, así que basta con fijarse en la zona destacada para localizar el ID a introducir en la configuración del módulo.

![Página principal - Ki_ - https___console.developers.google.com_home_dashboard](http://kingofapp.es/wp-content/uploads/2015/12/Página-principal-Ki_-https___console.developers.google.com_home_dashboard-300x157.png)

Si por el contrario lo que quieres es meter toda una galería de vídeos, el módulo "_Youtube Gallery_" es el más adecuado. Aquí el proceso de configuración ya es algo mayor; aunque no complejo, ni mucho menos.

Para configurar este módulo pedimos **dos credenciales** distintas. Por un lado el identificador del canal. Este se encuentra en la propia url de Youtube. En nuestro caso, la url del canal es así:

https://www.youtube.com/channel/**UCeIt2DJO8UdtUTmJzTfSXiQ**

Lo único que deberíamos entrar en el campo "_ChannelID_" es la parte destacada.

![Biblioteca de APIs - Ki_ - https___console.developers.google.com_apis_library](http://kingofapp.es/wp-content/uploads/2015/12/Biblioteca-de-APIs-Ki_-https___console.developers.google.com_apis_library-300x157.png)

Para conseguir el Access Token, deberemos ir a la [consola de desarrolladores de Google](https://console.developers.google.com/). En su página principal podremos ver la opción de "_Habilitar y administrar APIS_". Ahí es donde deberás ir. Una vez en la página correspondiente verás como a la derecha de la pantalla aparecen las opciones específicas para Youtube. Selecciona "_Youtube Data API_" y crea el "_Access Token_" en el apartado "credenciales" que aparece en el menú de la izquierda de la página.

Unos sencillos pasos para **volcar en tu App todos los vídeos del canal de Youtube** que quieras. Recuerda que este módulo y su configuración sólo funciona para los canales y no para los usuarios. Distinguirás ![Credenciales---King_---https___console.developers.google.com_apis_credentials](http://kingofapp.es/wp-content/uploads/2015/12/Credenciales-King_-https___console.developers.google.com_apis_credentials-300x157.png)entre unos y otros en la url por el distintivo "_channel_" o "_user_".

Dos módulos, diferentes pero complementarios que van a dotar tu App de un **contenido único y original** así que apresúrate a probar todo cuanto Youtube puede darte a tu aplicación.
