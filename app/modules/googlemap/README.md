#(How to) Configurar el módulo mapas
===================================

La utilidad de **Google** va más allá de las búsquedas y la publicidad. Una de las **aplicaciones** que más nos ha solucionado la vida es la referida a los mapas. Añadir una **ubicación** a una App es la manera más sencilla de decirle a todo usuario donde estamos y como encontrarnos. Es por ello que en King of App hemos desarrollado el **módulo “mapas”**; para que nadie se pierda. Pero, ¿cómo debemos configurarlo? La solución, en las siguientes cuatro líneas.

 1. El módulo mapas, como todos los demás está **disponible en nuestro market** (y es gratis). Así que sólo hay que seleccionarlo y añadirlo al editor de la App. Como en el resto de módulos, **la configuración es sencilla** pues sólo nos reclama rellenar tres campos. Como es natural, podremos cambiarle el nombre al módulo para que al usuario le resulte más descriptivo en el menú. Los dos campos principales a rellenar son los correspondientes a la **longitud** y la **latitud** del punto que se debe marcar en el mapa. Por ejemplo, si queremos que marque *La Casa Blanca*, porque resulta que tu App es la del presidente de los Estados Unidos de América. Los datos a entrar van a ser:

-   Latitud: 38.8976763
-   Longitud: -77.0387185

¿Que cómo lo he sabido? Muy sencillo, una vez más Google nos da la respuesta a cualquiera de nuestras inquietudes. Una buena fórmula de encontrar estos datos es directamente desde [la página de mapas de Google]. Si nos fijamos en la URL de la dirección que hemos buscado (*La Casa Blanca*) podremos encontrar en ella las dos variables que necesitamos:

https://www.google.es/maps/place/The+White+House/@38.8976763,-77.0387185,17z/data=!3m1!4b1!4m2!3m1!1s0x89b7b7bcdecbb1df:0x715969d86d0b76bf

[![Maps Module](http://kingofapp.es/wp-content/uploads/2015/12/Maps-Module-300x159.png)](http://kingofapp.es/wp-content/uploads/2015/12/Maps-Module.png)

Fácil, ¿verdad? El tercer campo que solicitamos para configurar el módulo de mapas es el **Zoom**. Aquí hay que entrar un valor numérico, entre 1-15 aproximadamente, para que la imagen se acerque más o menos al punto seleccionado. Tres pequeños datos para una funcionalidad completa.

  [la página de mapas de Google]: http://maps.google.com/
