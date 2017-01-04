(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'angulartics',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'king.loaders.common',
    'king.loaders.angular',
    'king.core.structureService',
    'king.core.storageService',
    'king.core.paymentService',
    'king.core.structureHooksService'
  ]);
}());
