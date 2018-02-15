# zendeskApi Haiping Xue

## Installation

### clone the project from this repo

```
git clone <repo git url>
```

### install npm following 
https://nodejs.org/en/

### go to root directory of the repository and run command

```
npm install
```

### run server.js 

```
node server.js
```

### open a chrome browser with localhost:8081 for testing

### to change user name and password, change the following field in server.js, this app use token to authenticate user

```
    // create a zendesk client
    var client = zendesk.createClient({
      username:  '',
      token:     '',
      remoteUri: ''
    });
```

### run test

```
npm test
```
