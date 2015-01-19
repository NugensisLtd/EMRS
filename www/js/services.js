angular.module('emrs.services', [])

.service('AppSvc', function($timeout){
	this.AppVars = { username: "", loggedIn: false, password: "", APIAuthToken: null };

	this.Login = function(username, password, callback) {

        /* Dummy authentication for testing, uses $timeout to simulate api call
         ----------------------------------------------*/
        $timeout(function(){
            var response = { success: username === 'test' && password === 'test' };
            if(!response.success) {
                response.message = 'Username or password is incorrect';
            }
            callback(response);
        }, 1000);


        /* Use this for real authentication
         ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

    };

    this.SetCredentials = function (username, password) {
    	this.AppVars.username = username;
		this.AppVars.password = password;
		this.AppVars.loggedIn = true;
		this.AppVars.APIAuthToken = "21331232424122";
    }

	this.Logout = function() {
		this.AppVars.username = null;
		this.AppVars.password = null;
		this.AppVars.loggedIn = false;
		this.AppVarsAPIAuthToken = null;
	};

	this.LogVars = function() { console.log(this.AppVars); };

	this.LoggedIn = function() { return this.AppVars.loggedIn; };
})
;
