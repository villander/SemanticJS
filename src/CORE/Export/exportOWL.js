/**
Creates an entity. Called from the Ontology object.

@method exportOWL
@for CORE.Export
@throws {exportOWLException} Exportation failed
@param {Object} ontology The ontology object
@param {Object} options Rules of exportation in key / value pairs
@return {String} Returns the contents of the OWL file output
*/

define(function(){
	
	function _initialise(ontology, options){
		var plug = "";
		// xml version
		plug+="<?xml version='1.0'?> \n\n";
		// doctype
		plug+="<!DOCTYPE Ontology [\n";
		plug+="<!ENTITY xsd 'http://www.w3.org/2001/XMLSchema#' >\n";
		plug+="<!ENTITY xml 'http://www.w3.org/XML/1998/namespace' >\n";
		plug+="<!ENTITY rdfs 'http://www.w3.org/2000/01/rdf-schema#' >\n";
		plug+="<!ENTITY rdf 'http://www.w3.org/1999/02/22-rdf-syntax-ns#' >\n";
		plug+="]>\n\n";

		plug += _plugOntology(ontology, {});

		return plug;
	}
	function _plugOntology(ontology, options){
		var plug = "";
		plug+="<Ontology xmlns='http://www.w3.org/2002/07/owl#'\n";
		plug+="xml:base='"+ontology.domain+"'\n";
		plug+="xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'\n";
		plug+="xmlns:rdfs='http://www.w3.org/2000/01/rdf-schema#'\n";
		plug+="xmlns:owl='http://www.w3.org/2002/07/owl#'\n";
		plug+="xmlns:owlx='http://www.w3.org/2003/05/owl-xml'\n";
		plug+="xmlns:xsd='http://www.w3.org/2001/XMLSchema#'\n";
		plug+="ontologyIRI='"+ontology.URI+"'>\n\n";

		plug+="<Prefix name='rdf' IRI='http://www.w3.org/1999/02/22-rdf-syntax-ns#'/>\n";
		plug+="<Prefix name='rdfs' IRI='http://www.w3.org/2000/01/rdf-schema#'/>\n";
		plug+="<Prefix name='owl' IRI='http://www.w3.org/2002/07/owl#'/>\n";
		plug+="<Prefix name='owlx' IRI='http://www.w3.org/2003/05/owl-xml'/>\n";
		plug+="<Prefix name='xsd' IRI='http://www.w3.org/2001/XMLSchema#'/>\n\n";

		return plug;
	}
	function _finalise(options){
		var plug = "";
		plug+="</Ontology>\n\n";
		plug+="<!-- Generated by SemanticJS (by Oguz Gelal) v"+SEMANTICS.version+" https://github.com/oguzgelal/SemanticJS -->\n";
		return plug;
	}
	/************* Entities *************/
	function _plugEntity(entity, options){
		var plug = "";
		if (entity.parent){
			plug+="<!-- Entity: "+entity.name+" ("+entity.URI+") -->\n";
			plug+="<owlx:Class owlx:name='"+entity.name+"' owlx:complete='false'>\n";
			plug+="\t<!-- Parent Entity: "+entity.parent.name+" ("+entity.parent.URI+") -->\n";
			plug+="\t<owlx:Class owlx:name='"+entity.parent.name+"' />\n";
			plug+="</owlx:Class>\n";
		}
		else{
			plug+="<!-- Entity: "+entity.name+" ("+entity.URI+") -->\n";
			plug+="<owlx:Class owlx:name='"+entity.name+"' owlx:complete='false' />\n";
		}
		return plug;
	}
	function _plugEntities(ontology, options){
		var plug = "";
		plug+="<!--//////////// Entities ////////////-->\n\n";
		for(var key in ontology.entityCollection){
			plug += _plugEntity(ontology.entityCollection[key], {});
		}
		plug+="\n\n";
		return plug;
	}
	/************* Relations *************/
	function _plugRelationDomains(relation, options){
		var plug = "";
		plug+="\t<owlx:domain> \n";
		plug+="\t\t<owlx:UnionOf> \n";
		for(var key in relation.domains){
			plug+="\t\t\t<!-- Entity: "+relation.domains[key].name+" ("+relation.domains[key].URI+") -->\n";
			plug+="\t\t\t<owlx:Class owlx:name='"+relation.domains[key].name+"' />\n";
		}
		plug+="\t\t</owlx:UnionOf> \n";
		plug+="\t</owlx:domain>  \n";
		return plug;
	}
	function _plugRelationRanges(relation, options){
		var plug = "";
		plug+="\t<owlx:range> \n";
		plug+="\t\t<owlx:UnionOf> \n";
		for(var key in relation.ranges){
			plug+="\t\t\t<!-- Entity: "+relation.ranges[key].name+" ("+relation.ranges[key].URI+") -->\n";
			plug+="\t\t\t<owlx:Class owlx:name='"+relation.ranges[key].name+"' />\n";
		}
		plug+="\t\t</owlx:UnionOf> \n";
		plug+="\t</owlx:range>  \n";
		return plug;
	}
	function _plugRelation(relation, options){
		var plug = "";
		plug+="<!-- Relation: "+relation.name+" ("+relation.URI+") -->\n";
		plug+="<owlx:ObjectProperty owlx:name='"+relation.name+"'>\n";
		plug += _plugRelationDomains(relation, {});
		plug += _plugRelationRanges(relation, {});
		plug+="</owlx:ObjectProperty>\n\n";
		return plug;
	}
	function _plugRelations(ontology, options){
		var plug = "";
		plug+="<!--//////////// Relations ////////////-->\n\n";
		for(var key in ontology.relationCollection){
			plug += _plugRelation(ontology.relationCollection[key], {});
		}
		plug+="\n\n";
		return plug;
	}

	function exportOWL(ontology, options){
		var output = "";
		// initialise output
		output += _initialise(ontology, {});
		// generate entities
		output += _plugEntities(ontology, {});
		// generate object properties (relations)
		output += _plugRelations(ontology, {});
		// finalise output
		output += _finalise({});
		return output;
	}

	return exportOWL;
});