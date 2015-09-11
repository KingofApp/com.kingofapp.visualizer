angular
.controller('contactCtrl', contactCtrl);

contactCtrl.$inject = ['$scope','$http', '$location', '$filter', 'structureService'];

function contactCtrl($scope, $http, $location, $filter, structureService) {
  //Register upper level modules
  structureService.registerModule($location,$scope,"contact");
  $scope.send = function (){
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
           to: [
           {
             email: $scope.contact.modulescope.send_address,
             name: "Contact",
             type: 'to'
           }
         ]
       }}
    };

    if($scope.contactForm.$valid){
      $http(req)
      .success(function(data) {
        $scope.contact.status = data[0].status;
      })
      .error(function(data) {
        console.log("ERROR: " + data);
      });
    }
  }
}
