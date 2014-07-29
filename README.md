# Minesweeper

The classic game of minesweeper for the web.
A working demo of the game can be found here: http://people.ischool.berkeley.edu/~derek/minesweeper/

## Rules of Minesweeper

Minesweeper is a grid of tiles, each of which may or may not cover hidden mines. The goal is to click on every tile except those that have mines. When a user clicks a tile, one of two things happens. If the tile was covering a mine, the mine is revealed and the game ends in failure. If the tile was not covering a mine, it instead reveals the number of adjacent (including diagonals) tiles that are covering mines – and, if that number was 0, behaves as if the user has clicked on every cell around it. When the user is confident that all tiles not containing mines have been clicked, the user presses a Validate button (often portrayed as a smiley-face icon) that checks the clicked tiles: if the user is correct, the game ends in victory, if not, the game ends in failure.

## Features implemented

- New game (easy 8x8 with 10 mines, medium 16x16 with 40 mines, hard 30x16 with 99 mines)
- Validation of game (Win/Lose Notification)
- Cheat/Hint (shows mines to player for approx. 2 seconds if requested)

## Structure of Application 

This version of minesweeper is a single page application that utilizes basic web technologies (HTML, CSS, JavaScript). The appliacation logic is seperated out into two major sections. The first section represents the 'class' objects that represent aspects of the game. One is the main game object which holds the logic for playing the game of minesweeper (appropriately named MineSweeper. The second is a much simpler object which represents a stop/start timer for keeping track of time while a player is solving a sudoku puzzle. There at two custome objects which implement the representation of the grid used to play minesweeper. The second section is the wiring which utilizes the DOM and JavaScriopt to connect the form/input elements which constitute the grid and ancillary controls in the html to instantiated MineSweeper and Timer objects to play a game. 

Unit testing is performed using Jasmine. Basic tests are written for the Timer object and Grid object. With the help of Grunt these tests can be run as part of a build stage or alone.  

## Technologies Utilized

HTML5, CSS3, JavaScript, Jasmine, Grunt

