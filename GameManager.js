package main;
/**
 * Managers game
 *
 * @author (Zach Brough) 
 * @version (2,10,2024)
 */

import java.awt.Graphics2D;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.RenderingHints;
import java.util.Random;
import java.util.ArrayList;
import java.text.AttributedString;
import java.awt.font.TextAttribute;

import mino.Mino;
import mino.Block;
import mino.Mino_L1;
import mino.Mino_L2;
import mino.Mino_Square;
import mino.Mino_Bar;
import mino.Mino_T;
import mino.Mino_Z1;
import mino.Mino_Z2;
import java.util.Timer;
import java.util.TimerTask;

public class GameManager
{
    //Screen size varibles
    public final int SHIFT = 0; //shifts desired positions
    final int WIDTH = 360;
    final int HEIGHT = 600;
    public static int left_x;
    public static int right_x;
    public static int top_y;
    public static int bottom_y;
    
    
    //Mino start locaction
    final int MINO_START_X;
    final int MINO_START_Y;
    Mino currentMino; //Controls current mino
    Mino nextMino; //Shows next mino
    final int NEXTMINO_X;//next mino box x varible
    final int NEXTMINO_Y;//next mino box y varible
    public static ArrayList<Block> staticBlocks = new ArrayList <>();//Blocks that are not moving array
    
    public static int dropInterval = 60; //drop speed
    boolean gameOver; // game over varible
    
    //effect varibles
    boolean effectCounterOn;
    int effectCounter;
    ArrayList<Integer> effectY = new ArrayList<>();
    
    //progression varibles
    int level = 1;
    int lines = 0; 
    public static int score = 0;
    int highScore = 0;
    private Timer timer;
    private int secondsElapsed = 0;

    public GameManager()
    {
        left_x = (GamePanel.WIDTH/2) - (WIDTH/2) - 170;
        right_x = left_x + WIDTH + SHIFT;
        top_y = 50;
        bottom_y = top_y + HEIGHT;
        
        MINO_START_X = left_x + (WIDTH/2) - Block.SIZE;
        MINO_START_Y = top_y + Block.SIZE;
        
        NEXTMINO_X = right_x + 90;
        NEXTMINO_Y = top_y + 100;
        
        currentMino = pickMino();
        currentMino.setXY(MINO_START_X, MINO_START_Y);
        nextMino = pickMino();
        nextMino.setXY(NEXTMINO_X,NEXTMINO_Y);
                timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            
            public void run() {
                if (!gameOver && !KeyHandler.pausePressed) {
                    secondsElapsed++;
                }
            }
        }, 1000, 1000);
    }
    
    //Sets next mino
    private Mino pickMino(){
        Mino mino = null;
        int i = new Random().nextInt(7);
        
        switch(i) {
            case 0: mino = new Mino_L1();break;
            case 1: mino = new Mino_L2();break;
            case 2: mino = new Mino_Square();break;
            case 3: mino = new Mino_Bar();break;
            case 4: mino = new Mino_T();break;
            case 5: mino = new Mino_Z1();break;
            case 6: mino = new Mino_Z2();break;
        }
        return mino;
    }
    
    //Updates code
    public void update(){
        if(currentMino.active == false) {
            staticBlocks.add(currentMino.b[0]);
            staticBlocks.add(currentMino.b[1]);
            staticBlocks.add(currentMino.b[2]);
            staticBlocks.add(currentMino.b[3]);
            
            //Controls game over
            if(currentMino.b[0].x == MINO_START_X && currentMino.b[0].y == MINO_START_Y){
                gameOver = true;
            }
            currentMino.deactivating = false;
            
            currentMino = nextMino;
            currentMino.setXY(MINO_START_X, MINO_START_Y);
            nextMino = pickMino();
            nextMino.setXY(NEXTMINO_X, NEXTMINO_Y);
            
            checkDelete();
        }else{
            currentMino.update();
            //Controls high score
            if (score > highScore){
                highScore = score;
            }
        }
        
    }
    
    private void checkDelete() {
        int x = left_x;
        int y = top_y;
        int blockCount = 0;
        int lineCount = 0;
        
        while(x<right_x && y < bottom_y) {
            
            for(int i = 0; i < staticBlocks.size(); i++){
                if(staticBlocks.get(i).x == x && staticBlocks.get(i).y == y){
                    blockCount++;
                }
            }
            x += Block.SIZE;
            if(x == right_x){
                //Removes row
                if(blockCount == 12){
                    
                    effectCounterOn = true;
                    effectY.add(y);
                    
                    for(int i = staticBlocks.size()-1; i > -1; i--){
                        if(staticBlocks.get(i).y == y){
                            staticBlocks.remove(i);
                        }
                    }
                    
                    //Adds lines to score
                    lineCount++;
                    lines++;
                    
                    //Controls levels and speed
                    if(lines % 10 == 0 && dropInterval > 1){
                        level++;
                        if(dropInterval > 10){
                        dropInterval -= 10;
                        }else{
                        dropInterval -= 1;
                    }
                    }
                    
                    for(int i = 0; i < staticBlocks.size(); i++){
                        if(staticBlocks.get(i).y < y){
                            staticBlocks.get(i).y += Block.SIZE;
                        }
                    }
                }
                blockCount = 0;
                x = left_x;
                y += Block.SIZE;
                
                //Adds Score
                if(lineCount>0){
                    int singleLineScore = 100 * level;
                    score += singleLineScore * lineCount;
                }
            }
        }
    }
    
    public void draw(Graphics2D g2){
        //Draw play area frame
        g2.setColor(Color.black);
        g2.setStroke(new BasicStroke(4f));
        g2.fillRect(left_x-1, top_y-1, WIDTH+2, HEIGHT+2);
        g2.setColor(Color.white);
        g2.drawRect(left_x-3, top_y-3, WIDTH+6, HEIGHT+6);
        g2.setStroke(new BasicStroke(1));
        Color gridColor = new Color(50,50,50,255);
        //g2.setColor(Color.gridColor);
        //Comment this out to not have a grid on the tetris screen
        /*
        for(int i=30;i <= 330; i += 30){
            g2.drawLine(left_x+i, top_y+2, left_x+i, bottom_y-2);
        }
        for(int i=30;i <= 570; i += 30){
            g2.drawLine(left_x+2, top_y+i, right_x-2, top_y+i);
        }
        */
        g2.setStroke(new BasicStroke(4));
        g2.setColor(Color.black);

        
        
        // Draw Next mino Frame
        int x = right_x + 20;
        int y = top_y;
        g2.fillRect(x,y,200,200);
        g2.setFont(new Font("Arial",Font.PLAIN, 30));
        g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        g2.setColor(Color.white);
        g2.drawString("NEXT", x+60, y+60);
        
        //Draws score, high score, levels and lines infomation
        g2.drawRect(x,top_y,200,200);
        
        //x += 40;
        y = bottom_y - 350;
        g2.drawString("LEVEL: " + level, x, y); 
        y += 70;
        g2.drawString("SCORE: " + score, x, y); 
        y += 70;
        g2.drawString("HIGHSCORE: " + highScore, x, y); 
        y += 70;
        
        //timer
        int hours = secondsElapsed / 3600;
        int minutes = (secondsElapsed % 3600) / 60;
        int seconds = secondsElapsed % 60;
        String timeString = String.format("TIMER: %02d:%02d:%02d", hours, minutes, seconds);
        g2.drawString(timeString, x, y);
        y += 30;
        
        //instructions
        g2.setFont(new Font("Arial", Font.PLAIN, 10));
        g2.setColor(Color.white);
        g2.drawString("INSTRUCTIONS:", x, y);
        y += 30;
        g2.drawString("Move Left: A or Left Arrow", x, y);
        y += 30;
        g2.drawString("Move Right: D or Right Arrow", x, y);
        y += 30;
        g2.drawString("Move Down: S or Down Arrow", x, y);
        y += 30;
        g2.drawString("Rotate: W or Up Arrow", x, y);
        y += 30;
        g2.drawString("Pause/Restart: Space", x, y);
        y += 70;
        //Draw the currentMino
        if(currentMino != null) {
            currentMino.draw(g2);
        }
        
        //draw the next mino
        nextMino.draw(g2);
        
        //draw static block
        for(int i = 0; i < staticBlocks.size(); i++){
            staticBlocks.get(i).draw(g2);
        }
        
        //Draws delete effect
        if(effectCounterOn){
            effectCounter++;
            
            g2.setColor(Color.red);
            for(int i = 0; i < effectY.size(); i ++){
                g2.fillRect(left_x,effectY.get(i),WIDTH, Block.SIZE);
            }
            if(effectCounter == 10){
                effectCounterOn = false;
                effectCounter = 0;
                effectY.clear();
            }
        }
        
        //Draws game Over
        g2.setColor(Color.orange);
        g2.setFont(g2.getFont ().deriveFont(50f));
        if(gameOver){
            x = left_x + 25;
            y = top_y + 325;
            g2.drawString("GAME OVER",x,y);
        }
        
        //Draws pause
        if(KeyHandler.pausePressed && gameOver == false){
            x = left_x + 70;
            y = top_y + 320;
            g2.drawString("PAUSED", x, y);
        }
        
        //Resests game
        if (KeyHandler.pausePressed && gameOver){
            score = 0;
            lines = 0;
            level = 1; 
            dropInterval = 60;
            staticBlocks.clear();
            gameOver = false;
            KeyHandler.pausePressed = false;
        }
        //Draws Tetris title
        x = (GamePanel.WIDTH / 2) - 75;
        y = top_y - 12;
        g2.setColor(Color.white);
        g2.setFont(new Font("Modern", Font.PLAIN, 40));
        AttributedString attributedString = new AttributedString("Zachtris");
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.red, 0, 1);
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.orange, 1, 2);
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.yellow, 2, 3);
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.green, 3, 4);
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.cyan, 4, 5);
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.magenta, 5, 6);
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.pink, 6, 7);
        attributedString.addAttribute(TextAttribute.FOREGROUND, Color.red, 7, 8);
        Font font1 = new Font("Modern", Font.ITALIC, 40);
        attributedString.addAttribute(TextAttribute.FONT, font1, 0, 8);
        g2.drawString(attributedString.getIterator(), x, y);
    }
} 
