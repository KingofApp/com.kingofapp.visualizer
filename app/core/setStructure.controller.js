(function(){
	angular
		.module("king.core.structureService")
		.config(config)
		.controller("setStructure", setStructure);

	config.$inject = ["$routeProvider"];

	function config($routeProvider){
		$routeProvider.when('/setStructure', {controller: "setStructure", template: ""});
		console.log("dentro config");
	}

	setStructure.$inject = ["structureService", "$routeParams"];

	function setStructure(structureService, $routeParams){
		//recibir el json, decoearlo y update...
		//http://localhost:9000/app/#/setStructure?json={\n      '\/': {\n        name: 'Home',\n        type: '$',\n        view: \"modules\/home\/index.html\",\n        ctrl: \"modules\/home\/controller.js\",\n        children: menu.items\n      }\n    }
		//console.log($routeParams);
		//var $menu = structureService.getMenu();
		//$menu.items.push("$routeParams.name": $routeParams.module);
		console.log(angular.toJson($routeParams.json, 1));
		//structureService.update($routeParams);
	};

}());
