#Genetic Programming

##Definition

Genetic programming is a different way of solving problems. Instead of choosing an algorithm to apply to a problem, you make a program that attempts to automatically build the best program to solve a problem. You basically create an algorithm that creates algorithms.

##How it Works?

1. It generally works by starting with a large set of programs, somewhat good solutions.
2. The programs are then made to compete in some user defined task.
3. After the competition, a ranked list of the programs from best to worst can be determined.
4. The best programs are replicated and modified in two different ways.
	- Mutation, in which certain parts of the program are altered very slightly in a random manner in the hope that this will make a good solution even better.
	- Crossover (Breeding), which involves taking a portion of one of the best programs and replacing it with a portion of one of the other best programs.
This replication and modification procedure creates many new programs that are based on, but different from, the best programs.
5. The whole procedure is then repeated.
6. Because the best programs are being kept and modified, it is expected that with each generation they will get better and better, in much the same way that teenagers can be smarter than their parents.
7. New generations are created until a termination condition is reached.
	- The perfect solution has been found.
	- A good enough solution has been found.
	- The solution has not improved for several generations.
	- The number of generations has reached a specific limit.

##How to implement it programatically?

In order to create programs that can be tested, mutated, and bred. You'll need a way to represent and run them.
The representation has to lend itself to easy modification and more importantly has to be guaranteed to be an actual program.
Researchers have come up with a few different ways to represent programs for genetic programming and the most commonly used is a tree representation.

##Tree programming

The tree is made up of nodes, which have some number of child nodes.
Some of the nodes will return parameters passed to the program, others will return constant, and the most interesting ones will return operation on their child nodes.
Which means that each node represents either an operation on its child nodes or an end point.
Once a node is evaluated, it is given to the node above it, which in turn applies its own operation to its branches.

To programatically implement a tree, you have to create four classes, FunctionWrapper, FunctionNode, ParameterNode and ConstantNode.

###FunctionWrapper
A wrapper for the functions that will be used on function nodes.

###FunctionNode
The class for function nodes.

###ParameterNode
The class for nodes that only return one of the parameters passed to the program.

###ConstantNode
The class for nodes that return a constant value.

##The initial Population

Most of the time, the initial population consists of a set of random programs.
This makes the process easier to start, since it is not necessary to design several programs that almost solve a problem.
It also creates much more diversity in the initial population -- a set of programs designed by a single programmer to solve a problem are likely to be very similar.

Creating a random program consisting of creating a root node with a random associated function, and then creating as many random child nodes as necessary, which in turn may have their own associated random child nodes.

If you could just generate random programs until one is correct. Obviously, this would be ridiculously impractical because there are infinite possible programs and it is highly unlikely that you would stumble across a correct one in any reasonable timeframe.

##Measuring Success

It is necessary to come up with a way to measure how good a solution is.
If you are testing a program against a numerical outcome, so an easy way to test a program is to see how close it gets to the correct answer.

##Mutating Programs

Mutation takes a single program and alters it slightly. The tree programs can be altered in a number of ways.
	- By changing the function on a node or by altering its branches.
	- By replacing a subtree with and entirely new one.
Mutation is not something that should be done too much. You can assign a relatively small probability that any node will be modified.
Beginning at the top of the tree, if a random number is lower than that probability, the node is mutated in one of the ways described above; otherwise the test is performed again on its child nodes.

Remember that mutations are random, and they aren't necessarily directed toward improving the solution.
The hope is simply that some will improve the result. These changes will be used to continue, and over several generations the best solution will eventually be found.

##Crossovering Programs

Crossover involves taking two successful programs and combining them to create a new program, usually by replacing a branch from one with a branch from other.
The function for performing a crossover takes two trees as input and traverses down both of them. If a randomly selected threshold is reached, the function returns a copy of the first tree with one of its branches replaced by a branch in the second tree.

