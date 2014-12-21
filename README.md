
API - ScubaDiver
----------------

Simple Node.JS, Express, and Mongo example for OpenShift
=========================================================

This is a simple Node.JS example that uses Express and has mongodb set up. It is all wired to go in OpenShift.
I would not recommend using this for a more complicated application, as there should be more seperation into different files for different logic.


Running on OpenShift
--------------------

Assuming you already have an OpenShift account

1) Create a Node.JS application and add a mongoDB cartridge

	rhc app create <your app name> nodejs-0.10 mongodb-2 

2) Clone repository to edit on your local device.

	git clone <link to repo>

3) Push changes to the remote git. 

> Every push will be build automatically (standard on OpenShift small gear). When the build failed you'll get an error `503 Service Temporarily Unavailable`


Engines
-----------

![npm version](https://img.shields.io/npm/v/npm.svg) ![node.js version](https://img.shields.io/node/v/gh-badges.svg)

`npm` is the package manager for javascript, and is default for Node.js. npm is bundled and installed automatically with the environment. npm runs through the command line and manages dependencies for an application.

Dependencies
-------------------

To get the dependencies include the following in your `package.json` file.

    "dependencies": {
          "mongodb" : "> 1.1.10",
          "express": "> 4.0.0",
          "mongoose": "> 3.6.13",
          "body-parser": ">= 1.0.1",
          "bson": ">= 0.2.16" 
    },

After adding this run the command within your project

    npm install

All the packages will be include in the `node_modules` folder

Environment Variables
--------

The **Node.JS cartridge** provides several environment variables to reference for ease of use:

    OPENSHIFT_NODEJS_IP
    The IP address used to bind Node.js
 
    OPENSHIFT_NODEJS_PORT 
    The Node.js listening port
 
    OPENSHIFT_NODEJS_POLL_INTERVAL 
    May be set as a user environment variable to change the default of 1s


The **mongodb cartridge** provides several environment variables to reference for ease of use:

    OPENSHIFT_MONGODB_DB_HOST 
    The MongoDB IP address
    
    OPENSHIFT_MONGODB_DB_PORT 
    The MongoDB port 
    
    OPENSHIFT_MONGODB_DB_USERNAME 
    The MongoDB username
	
    OPENSHIFT_MONGODB_DB_PASSWORD 
    The MongoDB password
	
    OPENSHIFT_MONGODB_DB_URL 
    The MongoDB connection URL 
    (e.g. `mongodb://<username>:<password>@<hostname>:<port>/<table>`)
	
    OPENSHIFT_MONGODB_DB_LOG_DIR 
    The path to the MongoDB log directory


Repo Layout
-----------

    .openshift/                 - Location for OpenShift specific files.
    .openshift/action_hooks/    - Entry points into various application and
                                  platform lifecycle operations.
    .openshift/cron/            - Scripts or jobs to be run on a periodic basis.
    .openshift/markers/         - Marker files, eg. hot_deploy enabling hot
                                  deploy feature.
    node_modules/               - Any node modules packaged with the app.
    README.md                   - This file.
    deplist.txt                 - Deprecated.
    index.html                  - Default OpenShift page seen when you open your
                                  app in a web browser.
    package.json                - npm package descriptor.
    server.js                   - Main application file, where the whole logic
                                  is placed.

Bibliography
------------

 - [Build a RESTful API Using Node and Express 4](http://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
 - [Designing a RESTful Web API](http://scotch.io/bar-talk/designing-a-restful-web-api)
 - [Mongoose Schemas](http://mongoosejs.com/docs/guide.html)
 - [OpenShift Origin Cartridge Guide](http://www.openshift.org/documentation/oo_cartridge_guide.html)

License ![MIT License](https://img.shields.io/npm/l/express.svg)
------
