# Upload a Document with N Files associated


## Description

### How it works

This is a demonstration of how a web form carrying some textual data and N files
can be managed client-side and server-side.

From the web browser point of view, we will:

- upload the files to the server,
- wait for the server's response carrying the path of the uploaded files (public
  URL / filesystem),
- upload the document's form data with additional info about the associated
  files (path and other info).

From the server(s) point of view, two calls will be received on two different routes:

- `/api/files` will receive the files and answer with their new path (public
  URL / filesystem);
- `/api/documents` will receive the form data related to the document and its
  associated files.

### Q/A

**Q:** What are the technologies involved?<br/>
**A:** Node.js/Express.js on the server-side and Vanilla JS on the client-side.

**Q:** Fine, so why don't we just upload all of this data as a whole?<br/>
**A:** Because this is just a demonstration :) waiting for being re-implemented
       with a different server-side technology and strategy (e.g. two different
       servers for the two routes).

**Q:** Is the data persisted, let's say in some nosql-thing?<br/>
**A:** Nope :) The user will only select the files, fill the data and click on
       *Upload*; than read the response message summarizing the information
       received by the server and leave the uploaded data to its destiny.


## Getting it to work

### How to install it

Prerequisites (commands that should be globally available in your system):

```
node
npm
bower
```

Then you need to type:

```
git clone https://github.com/double-m/multiattachment-upload
cd multiattachment-upload
npm install
bower install
```

### How to start it

In a development environment:

```
node_modules/nodemon/bin/nodemon.js bin/www -e js -w server
```

In a production environment:

```
npm start
```

Automated testing:

```
npm test
```

### How to use it

The client-side application is served by Express.js, so point a modern browser
to [localhost:3000](http://localhost:3000), drop some files in the box and click
on the *Create* button (some precompiled data will make this operation quicker).

