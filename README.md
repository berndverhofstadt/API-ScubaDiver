Simple Node.JS, Express, and Mongo template for OpenShift
=========================================================

This is a simple Node.JS template that uses Express and has mongodb set up. It is all wired to go in OpenShift.
I would not recommend using this for a more complicated application, as there should be more seperation into different
files for different logic.

Running on OpenShift
--------------------

Assuming you already have an OpenShift account

1) Create a Node.JS application and add a mongo cartridge

	rhc app create <your app name> nodejs-0.10 mongodb-2 --from-code=https://github.com/openshift-quickstart/simple_node_express_mongo

By default flag ```--from-code``` will add this repository as an upstream, which can be use later to pull updates.

2) cd into the directory that matches your application name

	cd <your app name>

3) Modify the code and push back up to your OpenShift application

	git push


This application lists all entries in ```names``` table, by default it's empty, so entering your application should give you following output

	[]

For the application to show some data, connect to your application using ssh

	rhc ssh

Then run following commands

	mongo 										# runs mongo CLI
	show dbs 									# shows all dbs
	use <your app name>							# or check output from previous command for it's name
	db.names.find()								# gives you names' entries, should be empty
	db.names.insert({name: 'a', surname: 'b'})	# inserts object into names
	db.names.find()								# should return previously inserted object

Now running the application in the browser should also return inserted object.

Notes
-----

The MongoDB code you want to modify can be found in this line

	self.db.collection('names').find().toArray(function(err, names) {}

If you chose to use a different database other than the one named the same as your application you need to change the Auth section as well.

OpenShift has authentication turned on for the database, therefore any connection has to authenticate. By default a connection from the MongoDB driver will try to authenticate against users in the DB you specify.

Please change the Auth line to look like the following so that the authentication uses the OpenShift provided credentials.

	self.db.authenticate(self.dbUser, self.dbPass, {authdb: "admin"}, function(err, res){...

License
-------

This code is dedicated to the public domain to the maximum extent permitted by applicable law, pursuant to CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
