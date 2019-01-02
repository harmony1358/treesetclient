[![Build Status](https://travis-ci.com/harmony1358/treesetclient.svg?branch=master)](https://travis-ci.com/harmony1358/treesetclient) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/cbaf14de58bd4dc4917ce182ae8d726d)](https://www.codacy.com/app/harmony1358/treesetclient?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=harmony1358/treesetclient&amp;utm_campaign=Badge_Grade)
    
<span style="color: red">IMPORTANT!</span> - [How to launch both frontend and backend](#launching-with-backend)  
  
# TreeSetClient

Example TreeSet Web Client for bit4mation backend API [treeset](https://github.com/harmony1358/treeset).  
Built with Typescript and [jsTree](https://www.jstree.com/) library.  
  
## Concept

This project implements basic API client and Web interface for manipulating tree structure held on TreeSet backend.  
The concept is to separate frontend and backend. Another point is to make client library isomorphic - available for use either in browser, server and mobile projects.  
  
## Classes
[Interfaces.ts](https://github.com/harmony1358/treesetclient/blob/master/src/Interfaces.ts)  
Basic entity types definition. ITreeNode - interface for TreeSet API entity object. INode - interface for jsTree transient node entity.  
  
[TreeSetAPI.ts](https://github.com/harmony1358/treesetclient/blob/master/src/TreeSetAPI.ts)   
Isomorphic API client library. It uses "isomorphic-fetch" and can be used separately in browser env, server env and native mobile env.    

[TreeSetController.ts](https://github.com/harmony1358/treesetclient/blob/master/src/TreeSetController.ts)  
Main UI controller with required callbacks and actions for use with jsTree. Encapsulates TreeSetAPI as a backbone.    
  
[index.ts](https://github.com/harmony1358/treesetclient/blob/master/index.ts)  
Main application launcher and jsTree setup configuration.  
  
[assets](https://github.com/harmony1358/treesetclient/tree/master/assets)  
HTML and CSS assets folder  
  
## Building
  
Project is built by "npm" or "yarn".  
Build artifacts are generated to "dist" folder.  
HTML/JS distribution will be generated to "dist/html".  
  
yarn:
```sh
yarn
yarn build
```  
  
npm:
```sh
npm install
npm run build
```  
  
## Testing
  
Project uses Mocha/Chai for testing and Istambul/NYC for coverage reporting.  
  
yarn:
```sh
# Run tests
yarn test
# Run tests and generate coverage report
yarn cover
```  
  
npm:  
```sh
# Run tests
npm test
# Run tests and generate coverage report
npm run cover
```  
  
## Integration testing  
  
You can perform integration tests adding "--api" parameter to test commands.  
API mocking feature is then disabled and all tests are performed against live system.  
  
yarn:  
`yarn test --api http://some.server.com/api`  
  
npm:  
`npm test --api http://some.server.com/api`  
  
## CI
  
Project uses [Travis-CI](https://travis-ci.org/) for Continuous Integration and deployment.  
Builds are triggered automatically after each commit.  
CI pipeline configuration can be found here:  [.travis.yml](https://github.com/harmony1358/treesetclient/blob/master/.travis.yml)  
  
## Running
  
Project can be launched locally with npm/yarn task.  
You have to build project first since http-server will be serving from "dist/html" folder.      
  
yarn:  
```sh
yarn build
yarn start
```  
  
npm:
```sh
npm build
npm run start
```  
  
Browser window should automatically start and redirect to:  
[http://localhost:9090/](http://localhost:9090/)  
Http-server Proxy-passes all API requests to port 8080. Backend must be launched alongside.

## Launching with backend  
  
This project has companion project with backend App.  
Please read here: [README.md](https://github.com/harmony1358/treeset/blob/master/README.md) 
  
In order to launch whole application (backend + frontent) you have to clone and build both projects and launch them as follows:
  
```sh
# Clone backend project:
git clone https://github.com/harmony1358/treeset.git

# Clone frontend project
git clone https://github.com/harmony1358/treesetclient.git

# Launch backend
cd treeset
./gradlew bootRun &

# Launch frontend
cd ../treesetclient
yarn build
yarn start
```
