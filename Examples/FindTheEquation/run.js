var _ = require('underscore');
var FunctionWrapper = require(__dirname + '/../../TheCreator/FunctionWrapper');
var Population = require(__dirname + '/../../TheCreator/Population');

/**
	input data set
	26 | 35 | 829
	8 | 24 | 141
	20 | 1 | 467
	33 | 11 | 1215
	37 | 16 | 1517
 **/
var inputDataSet = [
	{x: 26, y: 35, result: 829},
	{x: 8, y: 24, result: 141},
	{x: 20, y: 1, result: 467},
	{x: 33, y: 11, result: 1215},
	{x: 37, y: 16, result: 1517}
];

/**
	functions list
 **/
var addFunction = new FunctionWrapper(function(args){
	return args[0] + args[1];
}, 2, 'add');

var subtractFunction = new FunctionWrapper(function(args){
	return args[0] - args[1];
}, 2, 'subtract');

var multiplicationFunction = new FunctionWrapper(function(args){
	return args[0] * args[1];
}, 2, 'multiply');

var functionsList = [addFunction, subtractFunction, multiplicationFunction];

/**
	score & rank function
 **/
var scoreFunction = function(tree){
	var difference = 0;

	for(var i = 0; i < inputDataSet.length; i++)
	{
		var calculatedResult = tree.evaluate([inputDataSet[i]['x'], inputDataSet[i]['y']]);

		difference += Math.abs(calculatedResult - inputDataSet[i]['result']);
	}

	return difference;
};

var j = 0;

/**
	rankFunction
 **/
var rankFunction = function(population){
	var scores = [];

	for(var i = 0; i < population.length; i++)
	{
		scores.push({
			score: scoreFunction(population[i]),
			tree: population[i]
		});
	}

	scores = _.sortBy(scores, 'score');

	console.log(j + ': ' + scores[0]['score']);
	j++;

	return scores;
};

var result = Population.evolve(2, functionsList, 500, rankFunction, 0, 10000, 0.9, 0.9, 0.9, 0.5);

console.log(result.display());
