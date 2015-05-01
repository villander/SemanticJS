SemanticJS
=====

This is *(will be)* an open-source javascript library for building **Semantic Web** and **Linked Data** application, similar to <a href='http://owlapi.sourceforge.net/' target='_new'>OWL API</a> and <a href='https://jena.apache.org/' target='_new'>Jena API</a>. You will be able to create Ontologies, Entities, Relationships, link those and *(hopefully)* run the reasoner.

First note
-----

This is pretty new, this README will be updated with new informations. For now, you can contact me from <a href='http://oguzgelal.com/contact' target='_new'>oguzgelal.com/contact</a>.

Information
------
This library is **not dependant** to anything whatsoever. It is **lightweight**, **easy to install** and **easy to use**. It adpots the UMD (Universal Module Definition) standards, which makes it compatible with **AMD**, **CommonJS / Node.JS** and **Plain Browser Loading**. 

Documentation
------
The documentations are auto-generated by the Grunt **YUIDocs** plugin. It is located in the `dist/docs/` directory. When `grunt` command is runned everytime, the docs are re-generated and placed into the dist directory. Docs are in html format and could be viewed with the help of a browser.

Setup and Build
--------
The node_modules directory which contains all the third party plugins **(that are necessary for build process only, not included in the library)** is ignored. So after cloning the project, running `(sudo) npm install` is needed. After that, all you need to do is to run `grunt` command.

All the building process is handled by Grunt. It compresses, optimizes and minifies all the modular javascript structure, and places in the `dist/` directory. The output of library is only one lightweight file, **semantic.min.js** (or semantic.js which is the non-minified version).

Usage
--------

Before creating any ontologies, you should start with initialising the `Semant` object.

```Javascript
var semantics = new Semant();
```

Semant object is the global namespace of this API. With this var, you control global stuff that aren't related to any specific dataset. Such as *debug mode*:

```Javascript
semantics.setDebug(true);
```

Debug variable already defults to `true`. Basically, it enables and disables all the `console.logs()`'s through out the API. You also create ontologies from this var.

```Javascript
var people = semantics.createOntology("People", "http://ppl.com");
```

Every ontology must have a **name** and a **unique domain**. URI's will be generated with these info. If something goes wrong while creating ontology, `createOntologyException` will be thworn. Once you create an ontology, you can now create under an ontology:

```Javascript
var male = people.createEntity("Male");
var female = people.createEntity("Female");
```

or another way to create entities are calling the `createSubEntity` method. This method is equivalent to `createEntity`, but it is not called from an ontology, it is called directly from an entity. Another difference is that it sets some fields of the entity in such a way that the newly created entity becomes the sub-entity of the entity in context.

```Javascript
var alive = semantics.createOntology("Alive", "http://ppl.com");
var human = alive.createEntity("Human");
var male = human.createSubEntity("Male");
var female = human.createSubEntity("Female");
```

As in Ontologies, every entity must have a **unique name** so that unique URI's could be created. If anything goes wrong, `createEntityException` will be thrown.

Exceptions
------

All the exceptions inherits from `Exception` class at *Core/Exception/Exception.js*. They have `code`, `name`, `notice` *(what happened)* and `message` *(what caused it)*. All exceptions takes `message` field as an argument. Other details are coded into relevant class. 

All exceptions have `.toString()` method which gives you the basic information about the exception, and `.details()` method which gives you detailed information. If **debug mode** is enables, detailed version will be written on the console when thrown.