var FunctionNode = require(__dirname + '/FunctionNode');
var ParameterNode = require(__dirname + '/ParameterNode');
var ConstantNode = require(__dirname + '/ConstantNode');

/**
	randomInteger
	generate a random integer between min and max§
 **/
Math.randomInteger = function(min, max){
	return Math.floor( Math.random() * (max - min + 1) ) + min;
};

/**
	TreeFactory
	The class for creating tree programs and manipulate them
 **/
var TreeFactory = function(numberOfProgramParameters, functionsList){
	this.numberOfProgramParameters = numberOfProgramParameters;
	this.functionsList = functionsList;
};

/**
	createRandom
	creates random tree
	it starts with creating a node with a random function
	then looks to see how many child nodes this function require.
	for every child node required, the function calls itself to create a new node.
	in this way an entire tree is constructed, with branches ending only if the function requires no more child nodes (that is if function returns a constant or an input variable)
 **/
TreeFactory.prototype.createRandom = function(maxDepthOfTheTree, probabilityOfNodeIsFunctionNode, probabilityOfNodeIsParameterNode){

	maxDepthOfTheTree = (maxDepthOfTheTree === null || maxDepthOfTheTree === undefined)? 4 : maxDepthOfTheTree;
	probabilityOfNodeIsFunctionNode = probabilityOfNodeIsFunctionNode || 0.5;
	probabilityOfNodeIsParameterNode = probabilityOfNodeIsParameterNode || 0.6;

	if(Math.random() < probabilityOfNodeIsFunctionNode && maxDepthOfTheTree > 0)
	{
		var method = this.functionsList[ Math.randomInteger(0, this.functionsList.length - 1) ];

		var children = [];

		for(var i = 0; i < method.childCount; i++)
			children[i] = this.createRandom(maxDepthOfTheTree - 1, probabilityOfNodeIsFunctionNode, probabilityOfNodeIsParameterNode);

		return new FunctionNode(method, children);
	}
	else if(Math.random() < probabilityOfNodeIsParameterNode)
		return new ParameterNode( Math.randomInteger(0, this.numberOfProgramParameters - 1) );
	else
		return new ConstantNode( Math.randomInteger(0, 10) );
};

/**
	mutate
	mutate a tree by replacing a subtree with an entirely new one
 **/
TreeFactory.prototype.mutate = function(tree, probabilityOfChange){

	probabilityOfChange = probabilityOfChange || 0.1;

	if(Math.random() < probabilityOfChange)
	{
		return this.createRandom();
	}
	else
	{
		if(typeof tree === 'FunctionNode')
		{
			var children = [];

			for(var i = 0; i < tree.children.length; i++)
			{
				children[i] = this.mutate(tree.children[i], probabilityOfChange);
			}

			tree.children = children;
		}

		return tree;
	}
};

/**
	crossover
	crossover two trees by replacing a branch from one with a branch from other
 **/
TreeFactory.prototype.crossover = function(tree1, tree2, probabilityOfSwap, iAmAtTheTopOfTheTree){

	probabilityOfSwap = probabilityOfSwap || 0.7;
	iAmAtTheTopOfTheTree = (iAmAtTheTopOfTheTree === null || iAmAtTheTopOfTheTree === undefined)? true : iAmAtTheTopOfTheTree;

	if(Math.random() < probabilityOfSwap && !iAmAtTheTopOfTheTree)
	{
		return tree2;
	}
	else
	{
		if(typeof tree1 === 'FunctionNode' && typeof tree2 === 'FunctionNode')
		{
			var children = [];

			for(var i = 0; i < tree1.children.length; i++)
			{
				children[i] = this.crossover(tree1.children[i], tree2.children[ Math.randomInteger(0, this.tree2.children.length - 1) ], probabilityOfSwap, false);
			}

			tree1.children = children;
		}

		return tree1;
	}
};

module.exports = TreeFactory;
