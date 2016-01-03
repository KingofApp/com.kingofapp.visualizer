angular
  .module('king.services.simpleregisterlogin',[])
  .run(['configService', 'structureHooks', function (configService,structureHooks) {
    var config = {};
    var defaultUrl = "/login-register-XZ";
    var module = {};
    if(configService.services && configService.services.simpleregisterlogin.scope){
      console.log("Loading Login config ...");
      config = configService.services.simpleregisterlogin.scope;
      load();
    }
    function load() {
      structureHooks.setIndex(defaultUrl);
      module[defaultUrl]=loginRegister();
      structureHooks.addModule(module);

      // Crear Modulo LOGIN Conexion con Firebase
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
        scope: { "url" : config.firebaseSrc }
      };
    }
  }]);
