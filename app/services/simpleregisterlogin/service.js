angular
  .module('king.services.simpleregisterlogin', [])
  .run(['configService', 'structureHooks', function(configService, structureHooks) {
    var config = {};
    var defaultUrl = '/login-register-XZ';
    var module = {};
    if (configService.services && configService.services.simpleregisterlogin) {
      console.info('[V] Loading login config...');
      config = configService.services.simpleregisterlogin.scope;
      load();
    }

    function load() {
      structureHooks.setIndex(defaultUrl);
      module[defaultUrl] = loginRegister();
      structureHooks.addModule(module);

      // Crear Modulo LOGIN Conexion con Firebase
      // PRUEBA en dispositivo
      // Prueba en builder
    }

    function loginRegister() {
      return {
        name: 'Login / Register',
        identifier: 'static_loginregister',
        type: 'A',
        showOn: {
          menu: false,
          market: false,
          dragDrop: false
        },
        view: 'modules/static_loginregister/index.html',
        files: ['modules/static_loginregister/controller.js', 'modules/static_loginregister/factory.js'],
        libs: [{
          bower: {
            'firebase': '2.2.4'
          },
          src: 'https://cdn.firebase.com/js/client/2.2.4/firebase.js'
        }, {
          bower: {
            'angularfire': '1.1.3'
          },
          src: 'https://cdn.firebase.com/libs/angularfire/1.1.3/angularfire.min.js'
        }],
        scope: {
          'firebaseSrc': config.firebaseSrc,
          'debug': true
        }
      };
    }
  }]);
