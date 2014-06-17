var TreeFactory = require(__dirname + '/TreeFactory');

/**
	random number based on probability thing
 **/
var selectElement = function(p){
	return parseInt( Math.log( Math.random() ) / Math.log(p) );
}
/**
	Population
	The class for evolving populations
**/
var Population = {
	/**
		evolve
		creates an initial random population
		loops up to maximum number of generations
		each time calling rank function to rank the programs from best to worset
		the best program is automatically passed through to the next generation unaltered
		the rest of the next generation is constructed by randomly choosing programs that are near the top of ranking and then breeding and mutating them
		the process repeats until either a program has a perfect score of 0 or maximum number of generations is reached
	 **/
	evolve: function(numberOfProgramParameters, functionsList, populationSize, rankFunction, terminatingCondition, maximumNumberOfGenerations, mutationRate, breedingRate, probabilityOfSelectingLowerRankedPrograms, probabilityOfIntroducingNewProgramsInThePopulations){

		maximumNumberOfGenerations = (maximumNumberOfGenerations === null || maximumNumberOfGenerations === undefined)? 500 : maximumNumberOfGenerations;
		mutationRate = (mutationRate === null || mutationRate === undefined)? 0.1 : mutationRate;
		breedingRate = (breedingRate === null || breedingRate === undefined)? 0.4 : breedingRate;
		probabilityOfSelectingLowerRankedPrograms = (probabilityOfSelectingLowerRankedPrograms === null || probabilityOfSelectingLowerRankedPrograms === undefined)? 0.7 : probabilityOfSelectingLowerRankedPrograms;
		probabilityOfIntroducingNewProgramsInThePopulations = (probabilityOfIntroducingNewProgramsInThePopulations === null || probabilityOfIntroducingNewProgramsInThePopulations === undefined)? 0.05 : probabilityOfIntroducingNewProgramsInThePopulations;

		var treeFactory = new TreeFactory(numberOfProgramParameters, functionsList);

		var population = [];

		for(var i = 0; i < populationSize; i++)
			population[i] = treeFactory.createRandom();

		var scores;

		for(var i = 0; i < maximumNumberOfGenerations; i++)
		{
			scores = rankFunction(population);

			if(scores[0]['score'] == terminatingCondition)
				break;

			var nextPopulation = [scores[0]['tree'], scores[1]['tree']];

			while(nextPopulation.length < populationSize)
			{
				if(Math.random() > probabilityOfIntroducingNewProgramsInThePopulations)
				{
					nextPopulation.push(
						treeFactory.mutate(
							treeFactory.crossover(
								scores[ selectElement(probabilityOfSelectingLowerRankedPrograms) ]['tree'],
								scores[ selectElement(probabilityOfSelectingLowerRankedPrograms) ]['tree'],
								breedingRate
							),
							mutationRate
						)
					);
				}
				else
				{
					nextPopulation.push(
						treeFactory.createRandom()
					);
				}
			}

			population = nextPopulation;
		}

		return scores[0]['tree'];
	}
};

module.exports = Population;
