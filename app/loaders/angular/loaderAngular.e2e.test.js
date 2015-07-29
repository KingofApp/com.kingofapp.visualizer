(function(){
	describe('loaderAngular', function() {
		beforeEach(function(){
		    browser.driver.manage().window().setSize(1124, 850);
		    browser.ignoreSynchronization = true;
		});
    // NOTE: Angular tests
		// * Estructurar un poco los nombres de modulos y el structureService
		// * angular-scope
		// * angular-menu
		// * angular-staticfeed
		// *
		// *
		// *
		// *
		// *
		// *
		// *
    // * Carga de modulos con el mismo nombre que la carpeta del modulo
    // * Carga de modulos con nombre diferente a la carpeta de modulo
		// * Carga mismo modulo diferentes paths
    // * Carga de modulos 2 niveles (Cada uno carga su titulo y sus funciones van)
    // * Carga de modulos 3 niveles (Cada uno carga su titulo y sus funciones van)
    // * Interaccion modulos de 2 niveles scope send texts
    // * Interaccion modulos de 3 niveles scope send texts
    // * Interaccion modulo simple con el mismo nombre que la carpeta del modulo
    // * Interaccion modulo simple con diferente nombre que la carpeta del modulo
    // * Alternancia entre rutas repetidas N veces
    // *
    // *
    // *


		afterEach(function() {
			browser.ignoreSynchronization = false;
		});
	});
}());
