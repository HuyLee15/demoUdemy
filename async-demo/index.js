console.log('Before');
getUser(1, getRepositories);
console.log('After');

getRepositories = (user) => {
    getRepositories(user.gitHubUsername, getCommits);
}

getCommits = (repo) => {
    getCommits(repo, displayCommits);
}

displayCommits = (commits) => {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database!');
        callback({ id: id, gitHubUsername: 'HuyLee' });
    }, 2000);
}

getRepositories = (username, callback) => {
    setTimeout(() => {
        console.log('Calling GitBub API!');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}