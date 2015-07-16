(function(){
	'use strict';
	describe('structureService', function() {
		beforeEach(module('king.core.structureService'));


		describe('.getCurrent()', function(){
			
			it('should return valid data structure from a path', inject(function(structureService) {
				var $locationMock = { "$$path": "/youtube" };
				structureService.getCurrent($locationMock, function(module){
					expect(module).toEqual(jasmine.any(Object));
					expect(module.name).toBe("youtube");
				});
			}));
			
			/*
			it('should return error when fail search', inject(function(structureService) {
				// BLINDAR A NIVEL DE structure.service
				var $locationMock = { "$$path": "/jhsdkjh" };
				var bool = true;
				structureService.getCurrent($locationMock, function(module){
					bool = false;
				});
				expect(bool).toBe(true);
			}));
			*/

		});

		describe('.get()', function(){

			it('should return and object', inject(function(structureService) {
				var data = structureService.get();
				expect(data).toEqual(jasmine.any(Object));

			}));

		})

		describe('.update()', function(){
			var data;

			beforeEach(function(){
				data = angular.copy({
					'/': {
						name: 'Home',
						type: '$',
						view: "modules/home/index.html",
						ctrl: "modules/home/controller.js"
					}
			    });
			});

			it('should update the inner structure object when you call .get()', inject(function(structureService) {
				structureService.update(data);
				expect(structureService.get()).toBe(data);
			}));

			it('should fail when you try to update a data with not valid format', inject(function(structureService) {
				var data = {myData: "myData"};
				var response = structureService.update(data);

				expect(response.error).toBe(true);
				expect(response.message).toBeTruthy();
				expect(response.message[0].errors).toBeArrayOfStrings;
			}));


			it('should fail when name is not defined', inject(function(structureService) {
				delete data['/'].name;
				var response = structureService.update(data);

				expect(response.error).toBe(true);
				expect(response.message[0].errors[0]).toBe('name should be a String');
			}));

			it('should fail when type is not defined', inject(function(structureService) {
				delete data['/'].type;
				var response = structureService.update(data);

				expect(response.error).toBe(true);
				expect(response.message[0].errors[0]).toBe('type should be a String');
			}));

			it('should fail when view is not defined', inject(function(structureService) {
				delete data['/'].view;
				var response = structureService.update(data);

				expect(response.error).toBe(true);
				expect(response.message[0].errors[0]).toBe('view should be a String');
			}));

			it('should fail when ctrl is not defined', inject(function(structureService) {
				delete data['/'].ctrl;
				var response = structureService.update(data);

				expect(response.error).toBe(true);
				expect(response.message[0].errors[0]).toBe('ctrl should be a String');
			}));


		it('should fail when you try to update with an nulable object', inject(function(structureService) {
				var response = structureService.update(null);
				expect(response.error).toBe(true);
				expect(response.message).toBe('Structure data should be an Object');
			}));

		});


	});
}());