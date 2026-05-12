
package main;

/**
 * The program is to set the game panels settings and controls time and updates
 *
 * @author (Zach)
 * @version (8,2,2024)
 */

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;


import javax.swing.JPanel;


public class GamePanel extends JPanel implements Runnable
{
    //Varibles
    public static final int WIDTH = 760;//1280
    public static final int HEIGHT = 720;
    final int FPS = 60;
    Thread gameThread;
    GameManager pm;

    public GamePanel()
    {
        //Sets sceen panel colour, dimensions and layout
        this.setPreferredSize(new Dimension(WIDTH,HEIGHT));
        Color GREY = new Color(3, 65, 174);
        this.setBackground(GREY);
        this.setLayout(null);
        
        this.addKeyListener(new KeyHandler());
        this.setFocusable(true);
        
        pm = new GameManager();
    }
    
    public void launchGame(){
        gameThread = new Thread(this);
        gameThread.start();
    }
    
    //Controls time
    public void run(){
        double drawInterval = 1000000000/FPS;
        double delta = 0;
        long lastTime = System.nanoTime();
        long currentTime;
        
        while(gameThread != null) {
            currentTime = System.nanoTime();
            
            delta += (currentTime - lastTime) / drawInterval;
            lastTime = currentTime;
            
            if(delta >= 1) {
                update();
                repaint();
                delta --;
            }
        }
    }
    
    //Updates the game
    private void update(){
        if(KeyHandler.pausePressed == false && pm.gameOver == false){
            pm.update();
        }
    }
    
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        
        Graphics2D g2 = (Graphics2D)g;
        pm.draw(g2);
    }
}
