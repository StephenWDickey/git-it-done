// this javascript file will be for our issues page
/////////////////////////////////////////////

// define some variable here
// this targets div container we created in main area
var issueContainerEl = document.querySelector("#issues-container");
// targets limit-warning container
var limitWarningEl = document.querySelector("#limit-warning");


///////////////////////////////////
// we will fetch issue data from gitHub API
var getRepoIssues = function(repo) {
    // we put ?direction=asc query to list issues in ascending order
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
                // see if there are more than 30 issues
                if(response.headers.get("Link")) {
                    // we call display warning function
                    displayWarning(repo);
                }
            });
        }
        else {
            alert("There was a problem retrieving your request");
        };
    });
};

///////////////////////////////////

// this function will display our data
var displayIssues = function(issues) {
    // we will also state when a repo has no open issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues";
        return;
    };

    // for loop to access array data
    for(i=0; i<issues.length; i++) {
        // a is a link element
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // we know html_url will give us the value we want to link to issue
        issueEl.setAttribute("href", issues[i].html__url);
        // this will open link in new tab
        issueEl.setAttribute("target", "_blank");

        // now we will create a type element for our issues/pull requests
        var typeEl = document.createElement("span");

        // we will see if issue is a pull request or an issue
        if (issues[i].pull_request) {
            // if pull request, we get this type
            typeEl.textContent = "(Pull request)";
        }
        else {
            // if issue we will get this type
            typeEl.textContent = "(Issue)";
        }

        // attach type to issue element
        issueEl.appendChild(typeEl);

        // now attach issue element to container
        issueContainerEl.appendChild(issueEl);
    }
};
//////////////////////////////////////////////////////////

// new function displayWarning for when there are > 30 issues
var displayWarning = function(repo) {
    // adds text to limitWarning Element
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    // create link to issues page
    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append link element to limit warning container
    limitWarningEl.appendChild(linkEl);
};



////////////////////////////////////
// hard coded to test script
getRepoIssues("facebook/react");