angular
  .module('king.services.simpleregisterlogin',[])
  .run(['configService', 'structureHooks', function (configService,structureHooks) {
    if(configService.services && configService.services.simpleregisterlogin.scope){
      console.log("Loading Login config ...");
      load(configService.services.simpleregisterlogin.scope);
    }
    function load(config) {
      console.log("CONFIG", config);
      structureHooks.setIndex('/polymermenu-abcde');
      // TODO Add module
      // Create module loginRegister()
      // Add module "/loginRegister": loginRegister()
      // structureHooks.addModule({'/loginregister':loginRegister()});
      // Conexion con Firebase
      // Registro y login para acceder al verdadero Index
      // PRUEBA en dispositivo
      // Prueba en builder
    }
    function loginRegister(){
      return {
        name: 'Login / Register',
        identifier: 'loginregister',
        type : 'A',
        showOn : {
          menu : false,
          market : false,
          dragDrop : false
        },
        view :   "modules/static_loginregister/index.html",
        files: [ "modules/static_loginregister/controller.js" ],
        scope: { "config" : "x" }
      };
    }
  }]);
