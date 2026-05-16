# Tetris

This is a Tetris clone built in Java Script using the BlueJ IDE. It was built for my final year coding project in high school with the goal of building a fully working of version of Tetris and to improve my planning and JavaScript skills. 

![image alt](https://github.com/zach1492/Tetris---2024-school-project/blob/1849e355bdc6d727a534b46cc52bdaba22bb20a4/Images/Image1)

## Technologies

• JavaScript

• BlueJ IDE

## Features

Here’s what you can do with my Tetris program:

• Minoes move without collision

• Level/Difficulty progression

• Pause and restart the game

• Stats tracker: Level, Score, High Score, Timer

## Controls

• Move Left: A or Left Arrow

• Move Right: D or Right Arrow

• Move Down: S or Down Arrow

• Rotate: W or Up Arrow

• Pause/Restart: Space

## Process

The first step was planning the project. To do this I made a mindmap of how everthing would interact and fit together and a drawing of how I wanted it to look.

After I had planned the project, I made the GameManager class to control the game loop, draw the graphics, and manage the window. This allowed the screen to be constantly updated and redrawn.

Next, I implemented the keyboard handler to detect user inputs.
After I had finished the core basics, I added in the block script to represent one square of the tetrominoes. This provided a reusable structure for handling mino positions and rendering.

I then implemented the mino script, which controlled the behaviour of each mino like rotation. I then made child scripts for each mino shape that contained the relevant shape data to pass up to the mino script.

After the minoes were functional, I added in collision with static blocks and the boundary so minoes interacted correctly.
Then to finish my game, I implemented state management into the GameManager script, such as handling active and next pieces, level progression, full lines, and game end state.
One problem I had is part of the assignment criteria; we couldn’t copyright anything, so to get around this I renamed the game from Tetris to Zachtris for submission to the teacher.

## What I Learned
### JavaScript Improvement

I wasn’t very confident with JavaScript before this project, as I hadn’t done much programming with it, but after this project I felt like I had a much deeper understanding of the language and some of its libraries.

### Game Logic & State Management

Building the game helped me understand how to track state changes over time, including piece movement, collision handling, and managing game-over conditions.

### Coordinates and Grid Systems

This project improved my ability to work with grid-based systems, including calculating positions, detecting collisions, and determining when a row is fully filled using two arrays to track active and static blocks.

### Graphics Rendering (Java AWT)

I learned how to use Java’s Graphics2D library to render shapes, text, and UI elements, as well as manage real-time updates to the screen.

### Event Handling & Game Loop Design

I improved my understanding of how user input and timed updates interact within a continuous game loop to create responsive gameplay.

### Overall Growth

Each part of this project strengthened my ability to design, build, and refine a complete software system because there were a lot of scripts, so it was important to keep track of how they interacted with each other.

## How it can be improved

• Add some visual themes like dark mode or seasonal themes depending on the time of the year

• The collision wasn’t 100% perfect so very rarely blocks could go into each other, so that’s something that could definitely be improved on

• Maybe add a Sandtris mode

• Implement a hold piece mechanic like in classic Tetris

## To run the project locally:

Clone the repository to your machine

Open the project in BlueJ or your Java IDE

Compile all files

Run the main class

Start playing the game in the window that opens

Have fun!
