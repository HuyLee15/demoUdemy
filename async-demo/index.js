console.log('Before');

getUser(1, (user) => {
    //get the repositories
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repo[0], (commits) => {
            console.log(commits);
        });
    });
});

const p = getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database!');
            resolve({ id: id, gitHubUsername: 'HuyLee' });
        }, 2000);
    });
}

getRepositories = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitBub API!');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
};

getCommits = (repo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitBub API!');
            resolve(['commit']);
        }, 2000);
    });
};