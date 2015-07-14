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

		});

		describe('.get()', function(){

			it('should return and object', inject(function(structureService) {
				var data = structureService.get();
				expect(data).toEqual(jasmine.any(Object));

			}));

		})

		describe('.update()', function(){

			it('should update the inner structure object when you call .get()', inject(function(structureService) {
				var data = {myData: "myData"};
				structureService.update(data);
				expect(structureService.get()).toBe(data);
			}));

			it('should fail when you try to update with an nulable object', inject(function(structureService) {
				var promise = structureService.update(null);
				expect(promise.error).toBe(true);
				expect(promise.message).toBe('Structure data should not be null');
			}));

		});


	});
}());