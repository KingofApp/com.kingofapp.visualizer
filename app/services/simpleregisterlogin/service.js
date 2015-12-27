angular
  .module('king.services.simpleregisterlogin',[])
  .run(['configService','structureService', function (configService,structureService) {
    if(configService.services && configService.services.simpleregisterlogin.scope){
      console.log("Loading Login config ...");
      load(configService.services.simpleregisterlogin.scope);
    }
    function load(config) {
      console.log("CONFIG", config);
      structureService.setIndex('/polymermenu-abcde');

    }
  }]);
