# Upload a Document with N Files attached


## Description

### How it works

This is a demonstration of how a web form carrying some data and N files can be managed client-side and server side.

What we want to have in the server is:

- the textual fields present in the form (describing what here is generically called a "document"),
- the files dropped in a box (the *DropZone*),
- the association between the document and the files.

The chosen workflow, from the web browser point of wiew, is:

- upload the files,
- wait for the response carrying the resulting path of the uploaded files in the server's file system,
- upload the document with the file paths as dynamically added form fields.

### Q/A

**Q:** What are the technologies involved?
**A:** Node.js/Express.js on the server-side and li'l old jQuery on the client-side.

**Q:** Fine, so why don't we just upload all of this data as a whole?
**A:** Because this is just a demonstration :) waiting for being reimplemented with a different server-side technology where the "whole" will lack the W...

**Q:** Is the data persisted, let's say in some nosql-thing?
**A:** Nope :) We just upload, read the response message saying that all is fine, than leave all the temporary data at its destiny.


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
git clone https://github.com/double-m/form-upload-with-multifile-attachment
cd form-upload-with-multifile-attachment
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

The client-side application is served by Express.js, so point a modern browser to [localhost:3000](http://localhost:3000), drop some files in the box and click on the *Create* button (some precompiled data will make this operation quicker).

