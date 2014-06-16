/**
	ParameterNode
	The class for nodes that only return one of the parameters passed to the program.
**/
var ParameterNode = function(parameterIndex){
	this.parameterIndex = parameterIndex;
};

/**
	evaluate
	extracts and return the parameter from program arguments
**/
ParameterNode.prototype.evaluate = function(args){
	return args[this.parameterIndex];
};

/**
	display
	prints the parameter index
**/
ParameterNode.prototype.display = function(indent){

	indent = indent || 0;

	var printedValue = '';

	for(var i = 0; i < indent; i++)
		printedValue += "\t";

	printedValue += "parameter[" + this.parameterIndex + "]";

	printedValue += "\n";

	return printedValue;
};

module.exports = ParameterNode;
