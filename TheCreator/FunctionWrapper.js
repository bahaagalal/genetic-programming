/**
	FunctionWrapper
	A wrapper for the functions that will be used on function nodes.
 **/
var FunctionWrapper = function(method, childCount, name){
	this.method = method;
	this.childCount = childCount;
	this.name = name;
};

module.exports = FunctionWrapper;
