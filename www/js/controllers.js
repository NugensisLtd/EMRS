angular.module('emrs.controllers', [])

.controller('TabsCtrl', ['$scope', '$location', '$state', 'AppSvc', function($scope, $location, $state, AppSvc){
	$scope.DoLogout = function () {
		console.log('Logging out...')
		AppSvc.Logout();
		AppSvc.LogVars();
		$state.go("login");
	};
}])

.controller('ContactListCtrl', ['$scope', '$location', '$ionicModal', 'AppSvc', function($scope, $location, $ionicModal, AppSvc){
	$scope.contacts = [
		{ name: "Stephen Waterson", age: 34},
		{ name: "Deborah Waterson", age: 36},
		{ name: "Lucas Waterson", age: 2},
	];

	$scope.deleteMode = false;

	// Create and load the Modal
	$ionicModal.fromTemplateUrl('templates/editcontact.html', function(modal) {
		$scope.contactModal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});

	// Called when the form is submitted
	$scope.saveContact = function(contact) {
		$scope.contacts.push({
			name: contact.name,
			age: contact.age
		});
		
		$scope.contactModal.hide();
		contact = {};
	};

	// Open our new task modal
	$scope.newContact = function() {
		$scope.contactModal.show();
	};

	// Close the new task modal
	$scope.cancelContact = function() {
		$scope.contactModal.hide();
	};

	$scope.DeleteContact = function(contact, index) {
		$scope.contacts.splice(index, 1);
	};
}])

.controller('LoginCtrl', ['$scope', '$location', '$state', 'AppSvc', function($scope, $location, $state, AppSvc){
	console.log('LoginCtrl fired up');
	AppSvc.LogVars();

	$scope.auth = AppSvc;
	$scope.login = { username: "", password: ""};

	$scope.DoLogin = function (login) {

		console.log('Logging in...')
		AppSvc.Login($scope.login.username, $scope.login.password, function(response) {
            if(response.success) {
            	console.log('Logging in success')
                AppSvc.SetCredentials($scope.login.username, $scope.login.password);
                AppSvc.LogVars();
                $state.go( "tabs.contactlist" );
            } else {
                $scope.error = response.message;
                $scope.dataLoading = false;
            }
        });

		//AppSvc.LogVars();
	};

	$scope.DoLogout = function () {
		console.log('Logging out...')
		AppSvc.Logout();
		AppSvc.LogVars();
	};

	$scope.ShowUsername = function () {
		console.log($scope.login.username);
	};

}])
;