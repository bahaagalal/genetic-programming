/**
	ConstantNode
	The class for nodes that return a constant value.
**/
var ConstantNode = function(constant){
	this.constant = constant;
};

/**
	evaluate
	extracts and return the parameter from program arguments
**/
ConstantNode.prototype.evaluate = function(args){
	return this.constant;
};

/**
	display
	prints the constant
**/
ConstantNode.prototype.display = function(indent){

	indent = indent || 0;

	var printedValue = '';

	for(var i = 0; i < indent; i++)
		printedValue += "\t";

	printedValue += this.constant;

	printedValue += "\n";

	return printedValue;
};

module.exports = ConstantNode;
