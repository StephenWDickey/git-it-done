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
// targets span element above repo container
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
        
        // each repository needs a container, this will be a link element
        var repoEl = document.createElement("a");
        // we assign multiple classes to this container
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // we set value of the link element to our issues page
        // in our query string we set key repo = var repoName
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // we will store repository name in span element
        var titleEl = document.createElement("span");
        // we will assign textContent a value of our formatted data, repoName
        titleEl.textContent = repoName

        // now we append data to containers
        // container for repository gets title info stored in span element
        repoEl.appendChild(titleEl);

        // we will add info regarding issues for the repositories
        // create span element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // check if current repo in array has issues
        // we know the value for issues in gitHub is open_issues_count from devtools
        if (repos[i].open_issues_count > 0) {
            // if there are issues, we add an icon to the span element
            // this icon has many classes
            // we put an icon before our number of issues, followed by a string
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // we attach the status element to the container
        repoEl.appendChild(statusEl);

        // then we attach repositories into the column that will hold them
        repoContainerEl.appendChild(repoEl);

        // we are going to set up a second page so user can see issues
        // this will be in single-repo.html
        // we will also create a new js file
    }
};


// event listener waits for submit, runs formSubmitHandler()
// we add the event listener to the form element because of 'bubbling'
userFormEl.addEventListener("submit", formSubmitHandler);