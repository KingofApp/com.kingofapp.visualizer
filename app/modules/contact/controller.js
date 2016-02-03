angular
  .controller('contactCtrl', contactCtrl);

contactCtrl.$inject = ['$scope', '$http', '$location', '$filter', 'structureService'];

function contactCtrl($scope, $http, $location, $filter, structureService) {
  //Register upper level modules
  structureService.registerModule($location, $scope, "contact");

  $scope.send = function() {
    var req = {
      method: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: {
        key: $scope.contact.modulescope.mandrill_key,
        message: {
          from_email: $scope.contact.email,
          subject: "Contact form " + $scope.contact.name,
          html: $filter('translate')('contact.message') + " : " + $scope.contact.message,
          text: $scope.contact.message,
          to: [{
            email: $scope.contact.modulescope.send_address,
            name: "Contact",
            type: 'to'
          }]
        }
      }
    };

    $http(req)
      .success(function(data) {
        if (data[0].status === 'sent') {
          $scope.contact.status = $filter('translate')('contact.message.sent');
        } else {
          $scope.contact.status = $filter('translate')('contact.message.warning') + data[0].status;
        }
        if(!$scope.contact.modulescope.debug){
          document.querySelector("paper-toast").show();
        }

      })
      .error(function(data) {
        $scope.contact.status = $filter('translate')('contact.message.rejected');
        if(!$scope.contact.modulescope.debug){
          document.querySelector("paper-toast").show();
        }
      });
  }
}
