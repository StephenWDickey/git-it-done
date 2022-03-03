// script file for git-it-done

var getUserRepos = function () {
    fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();