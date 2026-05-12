package main;

/**
 * Handles inputs
 *
 * @author (Zach Brough)
 * @version (2,8,2024)
 */

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;


public class KeyHandler implements KeyListener {
    
    public static boolean upPressed, downPressed, leftPressed, rightPressed, pausePressed; //Creates booleans for each input
    
    
    public void keyTyped(KeyEvent e) {
       //Stops there being an error
    }
    
    public void keyPressed(KeyEvent e) {
         int code = e.getKeyCode();
         
         if(code == KeyEvent.VK_W || code == KeyEvent.VK_UP) {
            upPressed = true;
         }
         
         if(code == KeyEvent.VK_A || code == KeyEvent.VK_LEFT){
            leftPressed = true;
         }
         
         if(code == KeyEvent.VK_S || code == KeyEvent.VK_DOWN){
            downPressed= true;
         }
         
         if(code == KeyEvent.VK_D || code == KeyEvent.VK_RIGHT){
            rightPressed = true;
         }
         
         //Controls pause
         if(code == KeyEvent.VK_SPACE){
            if(pausePressed){
                pausePressed = false;
            }else{
                pausePressed = true;
             }
         }
    }
    
    
    public void keyReleased(KeyEvent e) {
        //Stops there being an error
    }
}
