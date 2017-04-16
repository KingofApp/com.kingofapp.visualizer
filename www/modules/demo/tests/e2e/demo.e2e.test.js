(function() {
	'use strict';

  var helper = require('../../../../../e2e-tests/e2etest.service');

  describe('demo controller', function() {
    beforeAll(function() {
      browser.driver.manage().window().setSize(400, 666);
      browser.get('http://localhost:9001/#/menu-abcd/demo-abcd');
    });

    it('should load module', function(done) {
      expect(element(by.css('.demo'))).toBeDefined();

      done();
    });

    it('should show koa-badge', function(done) {
      helper.isPresent('#koabadge', true);

      done();
    });

    it('should generate koa-badge', function(done) {
      helper.isPresent('android-badge', true);

      done();
    });

    it('should show koa-button', function(done) {
      helper.isPresent('#koabutton', true);

      done();
    });

    it('should generate koa-button', function(done) {
      helper.isPresent('android-button', true);

      done();
    });

    it('should show koa-card', function(done) {
      helper.isPresent('#koacard', true);

      done();
    });

    it('should generate koa-card', function(done) {
      helper.isPresent('android-card', true);

      done();
    });

    it('should show koa-checkbox', function(done) {
      helper.isPresent('#koacheckbox', true);

      done();
    });

    it('should generate koa-checkbox', function(done) {
      helper.isPresent('android-checkbox', true);

      done();
    });

    it('should click a checkbox and  it must be checked', function(done) {
      helper.clickElement('#checkboxContainer');
			helper.checkElementToExist('#checkboxtest', 'checked', true);

			done();
    });

		it('should show koa-dialog', function(done) {
      helper.isPresent('#koadialog', true);

      done();
    });

    it('should generate koa-dialog', function(done) {
      helper.isPresent('android-dialog', true);

      done();
    });

		it('should show the modal window', function(done) {
			helper.clickElement('#modalbutton');
			helper.checkElementToExist('#modal', 'aria-hidden', false);

			done();
		});

		it('should close the modal window when tapme button is pressed', function(done) {
			helper.clickElement('#tapme');
			helper.checkElementToExist('#modal', 'aria-hidden', true);

			done();
		});

		it('should show koa-dropdown-menu', function(done) {
			helper.isPresent('#koadropmenu', true);

			done();
		});

		it('should generate koa-dropdown-menu', function(done) {
			helper.isPresent('android-dropdown-menu', true);

			done();
		});

		it('should show the list of items', function(done) {
			helper.clickElement('#koadropclick');
			helper.checkElementToBe('android-item', 'allosaurus');
			helper.clickElement('#koadropclick');
			done();
		});

		it('should show koa-grid', function(done) {
			helper.isPresent('#koagrid', true);

			done();
		});

		it('should generate koa-grid', function(done) {
			helper.isPresent('android-grid', true);

			done();
		});

		it('should show koa-icon-button', function(done) {
			helper.isPresent('#koaiconbutton', true);

			done();
		});

		it('should generate koa-icon-button', function(done) {
			helper.isPresent('android-icon-button', true);

			done();
		});

		it('should show koa-input', function(done) {
			helper.isPresent('#koainputtextarea', true);

			done();
		});

		it('should generate koa-input', function(done) {
			helper.isPresent('android-input', true);

			done();
		});

		it('should generate koa-textarea', function(done) {
			helper.isPresent('android-textarea', true);

			done();
		});

		it('should show koa-item', function(done) {
			helper.isPresent('#koaitem', true);

			done();
		});

		it('should generate koa-item', function(done) {
			helper.isPresent('android-item', true);

			done();
		});

		it('should show koa-menu', function(done) {
			helper.isPresent('#koamenus', true);

			done();
		});

		it('should generate koa-menu', function(done) {
			helper.isPresent('android-menu', true);

			done();
		});

		it('should generate koa-submenu', function(done) {
			helper.isPresent('android-submenu', true);

			done();
		});

		it('should open the submenu', function(done) {
			helper.clickElement('#clickmenu');
			helper.checkElementToExist('#testsubmenu', 'aria-selected', true);

			done();
		});

		it('should show koa-menu-button', function(done) {
			helper.isPresent('#koamenubutton', true);

			done();
		});

		it('should generate koa-menu-button', function(done) {
			helper.isPresent('android-menu-button', true);

			done();
		});

		it('should show a menu when koa-menu-button is pressed', function(done) {
			helper.clickElement('#testiconbutton', true);
			helper.checkElementToBe('#alphatest', 'alpha');
			helper.clickElement('#koamenubutton', true);

			done();
		});

		it('should show koa-progress', function(done) {
			helper.isPresent('#koaprogress', true);

			done();
		});

		it('should generate koa-progress', function(done) {
			helper.isPresent('android-progress', true);

			done();
		});

		it('should show koa-radio-button', function(done) {
			helper.isPresent('#koaradiobutton', true);

			done();
		});

		it('should generate koa-radio-button', function(done) {
			helper.isPresent('android-radio-button', true);

			done();
		});

		it('should click a koa-radio-button and  it must be checked', function(done) {
			helper.clickElement('#radiobuttontest');
			helper.checkElementToExist('#radiobuttontest', 'checked', true);

			done();
		});

		it('should show koa-slider', function(done) {
			helper.isPresent('#koaslider', true);

			done();
		});

		it('should generate koa-slider', function(done) {
			helper.isPresent('android-slider', true);

			done();
		});

		it('should show koa-spinner', function(done) {
			helper.isPresent('#koaspinner', true);

			done();
		});

		it('should generate koa-spinner', function(done) {
			helper.isPresent('android-spinner', true);

			done();
		});

		it('should show koa-tabs', function(done) {
			helper.isPresent('#koatabs', true);

			done();
		});

		it('should generate koa-tabs', function(done) {
			helper.isPresent('android-tabs', true);

			done();
		});

		it('should show koa-toggle-button', function(done) {
			helper.isPresent('#koatogglebutton', true);

			done();
		});

		it('should generate koa-toggle-button', function(done) {
			helper.isPresent('android-toggle-button', true);

			done();
		});

		it('should generate koa-toggle-button', function(done) {
			helper.isPresent('android-toggle-button', true);

			done();
		});

		it('should change to active when its pressed', function(done) {
			helper.clickElement('#toggleButton');
			helper.checkAriaPressedToBe('#toggletest', 'true', true);

			done();
		});

		it('should change to not active when its pressed again', function(done) {
			helper.clickElement('#toggleButton');
			helper.checkAriaPressedToBe('#toggletest', 'false', true);

			done();
		});

		it('should generate koa-toolbar', function(done) {
			helper.isPresent('android-toolbar', true);

			done();
		});

		it('should show koa-table', function(done) {
			helper.isPresent('#koatable', true);

			done();
		});

		it('should show koa-h', function(done) {
			helper.isPresent('#koah', true);

			done();
		});

		it('should show koa-p', function(done) {
			helper.isPresent('#koaptag', true);

			done();
		});


  });

}());
