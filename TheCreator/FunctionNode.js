/**
	FunctionNode
	The class for function nodes.
**/
var FunctionNode = function(functionWrapper, children){
	this.method = functionWrapper.method;
	this.name = functionWrapper.name;
	this.children = children;
};

/**
	evaluate
	evaluate node function on its child nodes
 **/
FunctionNode.prototype.evaluate = function(args){

	var results = [];

	for(var i = 0; i < this.children.length; i++)
		results[i] = this.children[i].evaluate(args);

	return this.method(results);
};

/**
	display
	prints the name of the function
 **/
FunctionNode.prototype.display = function(indent){

	indent = indent || 0;

	var printedValue = '';

	for(var i = 0; i < indent; i++)
		printedValue += "\t";

	printedValue += this.name;

	printedValue += "\n";

	for(var i = 0; i < this.children.length; i++)
		printedValue += this.children[i].display(indent + 1);

	return printedValue;
};

module.exports = FunctionNode;
