(function() {
  'use strict';

  angular
    .module('king.core.paymentService', [])
    .factory('paymentService', paymentService);

  paymentService.$inject = [];
  function paymentService() {

    return {
      init: init
    };

    function init() {
      evaluate();
    }


    function evaluate() {

    }

  }

}());
