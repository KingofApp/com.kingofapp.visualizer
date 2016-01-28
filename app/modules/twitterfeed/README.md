# **(How to) Configurar el módulo Twitter**

Los contenidos de una App son la referencia para conseguir un buen número de descargas. Acceder a los perfiles sociales es, sin duda, uno de los elementos que todo usuario quiere tener a mano. Por ello hemos desarrollado el módulo de Twitter; para que todas las publicaciones de esta red de microblogging estén al alcance de cualquiera. Hoy, te vamos a enseñar cómo se configura esta funcionalidad.

Como siempre, hay que acudir al market de módulos y elegir el "Twitter feed". Una vez cargado en nuestro editor de la App es el momento de ver qué campos se deben rellenar para un correcto funcionamiento del módulo. En este caso son dos: Twitter ID y Número de posts.

El Twitter ID es el identificador de la cuenta que queremos reproducir en la App. Para conseguirlo hay que ir al apartado de configuración de la cuenta de Twitter en cuestión.

Ahí se accede clicando en el avatar de Twitter desde nuestra la de perfil. En el menú desplegable que aparece hay que ir a "Configuración" [![Configuración Twitter](http://kingofapp.es/wp-content/uploads/2015/12/Configuración-Twitter-300x159.png)](http://kingofapp.es/wp-content/uploads/2015/12/Configuración-Twitter.png)Una vez dentro de configuración, en el menú lateral aparecen varias opciones. Una de las últimas es "Widgets". Es ahí donde debemos ir. [![Configuración Twitter2](http://kingofapp.es/wp-content/uploads/2015/12/Configuración-Twitter2-300x198.png)](http://kingofapp.es/wp-content/uploads/2015/12/Configuración-Twitter2.png)

El siguiente paso una vez dentro de Widgets es darle al botón de "crear nuevo" en caso de que no tengamos uno anteriormente o en "editar" en los existentes. [![configuracion twitter 3](http://kingofapp.es/wp-content/uploads/2015/12/configuracion-twitter-3-300x165.png)](http://kingofapp.es/wp-content/uploads/2015/12/configuracion-twitter-3.png)

Una vez editado y creado, justo debajo del feed de tweets aparecerá una caja con un código html. Es ahí donde encontraremos en ID de la cuenta de Twitter. [![Configuración Twitter4](http://kingofapp.es/wp-content/uploads/2015/12/Configuración-Twitter4-300x159.png)](http://kingofapp.es/wp-content/uploads/2015/12/Configuración-Twitter4.png)En nuestro caso, el código que aparece es algo así. Y en él se puede localizar muy fácilmente el ID:

_<a class="twitter-timeline" href="https://twitter.com/theKingofApp" **data-widget-id="438651236699475968"**>Tweets por el @theKingofApp.</a>_ _<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script> _

[![Twitter feed module King of App](http://kingofapp.es/wp-content/uploads/2015/12/Twitter-feed-module-King-of-App-300x159.png)](http://kingofapp.es/wp-content/uploads/2015/12/Twitter-feed-module-King-of-App.png)Puede parecer algo complicado, pero en realidad no lo es.

Con este número en nuestro poder ya sólo nos falta por rellenar el campo restante. En él, le especificaremos en número de entradas que queremos mostrar a los usuarios de la App. Este valor numérico puede ir desde el 1 hasta el infinito ;)

Dos campos a rellenar para que todo un feed de Twitter esté disponible en cualquier app. Un muro sobre el que se podrá interactuar respondiendo a los tweets, retwiteando o dándole al "like" de cualquier publicación.
