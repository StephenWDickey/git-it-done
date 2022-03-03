// script file for git-it-done

// passing user into function will return data from many users, DYNAMIC
var getUserRepos = function (user) { 

    // define the url variable with user parameter
    var url = "https://api.github.com/users/" + user + "/repos";

    // we fetch data, use .then method on promise, capture response in callback function
    fetch(url).then(function(response) {
        // response must be reformatted via json(), this we receive as promise which must have .then method following
        response.json().then(function(data) {
            console.log(data);
        });
    });

 
};


getUserRepos();