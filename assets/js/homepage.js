// script file for git-it-done

// passing user into function will return data from many users, DYNAMIC
var getUserRepos = function (user) { 

    // define the url variable with user parameter
    var url = "https://api.github.com/users/" + user + "/repos";

    // we fetch data, use .then method on promise, capture response in callback function
    fetch(url).then(function(response) {
        // response must be reformatted via json(), this we receive as promise which must have .then method following
        response.json().then(function(data) {
            // we are running data and user parameters through our other function
            displayRepos(data, user);
        });
    });

 
};

///////////////
// targets html form
var userFormEl = document.querySelector ("#user-form");
// targets html input
var nameInputEl = document.querySelector("#username");

// targets container for repos
var repoContainerEl = document.querySelector("#repos-container");
// targets header element above repo container
var repoSearchTerm = document.querySelector("#repo-search-term");
/////////////////

// we need to make a function to handle form data
var formSubmitHandler = function(event) {
    // prevents browser refresh
    event.preventDefault();
    // retrieve value from input, trim removes unecessary spaces
    var username = nameInputEl.value.trim();
    // if statement for input validation
    if (username) {
        // calls getUserRepos function
        getUserRepos(username);
        // clears search field of input element
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
};

/////////////////////////////

// new function to display repository info
var displayRepos = function(repos, searchTerm) {

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // we've received response/data via fetch function
    // now we must loop through arrays and get values we are interested in
    for (var i=0; i<repos.length; i++) {
        
        // format repository name
        // these values were obtained by seeing what theyre called in devtools
        // owner for user, name for repository name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
        // each repository needs a container
        var repoEl = document.createElement("div");
        // we assign multiple classes to this container
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // we will store repository name in span element
        var titleEl = document.createElement("span");
        // we will assign textContent a value of our formatted data, repoName
        titleEl.textContent = repoName

        // now we append data to containers
        // container for repository gets title info stored in span element
        repoEl.appendChild(titleEl);

        // then we attach repositories into the column that will hold them
        repoContainerEl.appendChild(repoEl);
    }
};


// event listener waits for submit, runs formSubmitHandler()
// we add the event listener to the form element because of 'bubbling'
userFormEl.addEventListener("submit", formSubmitHandler);