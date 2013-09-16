App URL : http://romankim-proj1.herokuapp.com/

Design challenges:

Main objective of this project was to 1. implement the game of life and the rules that govern each cells and 2. create multiple states that run independently from each other.

My main focus was on seperating the graphics library and the implementation of the data structure. I resolved this by having separate object for the 'board' object, which represents the data structure of the cell, and the 'pad' object, which represents the graphics that gets painted on the screen. The two objects were designed so that they do not necessarily know about each other.

I could use various data types for the representation of the board. In this design, I used a two dimensional array. For a N by N grid, I constructed a 2N x N grid, which the latter half was allocated for a 'buffer' to store temporary values for the next state before it actually becomes painted on the screen.
