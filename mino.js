package mino;
/**
 * Contorls the minos
 *
 * @author (Zach Brough)
 * @version (2, 9, 2023)
 */

import java.awt.Color;
import java.awt.Graphics2D;

import main.GameManager;
import main.KeyHandler;

public class Mino
{
    public Block b[] = new Block[4]; //Shapes position array
    public Block tempB[] = new Block[4]; //Shapes new position array
    int autoDropCounter = 0; //Drop counter
    public int direction = 1; //Rotation 
    boolean leftCollision, rightCollision, bottomCollision; //Collision varibles
    public boolean active = true; //States if shape is active
    public boolean deactivating;
    int deactivateCounter = 0;
    
    //Sets colour
    public void create(Color c){
        b[0] = new Block(c);
        b[1] = new Block(c);
        b[2] = new Block(c);
        b[3] = new Block(c);
        tempB[0] = new Block(c);
        tempB[1] = new Block(c);
        tempB[2] = new Block(c);
        tempB[3] = new Block(c);
    }
    
    public void setXY(int x, int y) {}
    
    public void updateXY(int direction) {
        checkRotationCollision();
        
        if (leftCollision == false && rightCollision == false && bottomCollision == false){
            this.direction = direction;
            b[0].x = tempB[0].x;
            b[0].y = tempB[0].y;
            b[1].x = tempB[1].x;
            b[1].y = tempB[1].y;
            b[2].x = tempB[2].x;
            b[2].y = tempB[2].y;
            b[3].x = tempB[3].x;
            b[3].y = tempB[3].y; 
        }
    }
    
    //Gets direction
    public void getDirection1() {}
    public void getDirection2() {}
    public void getDirection3() {}
    public void getDirection4() {}
    
    //Checks collision
    public void checkMovementCollision() {
        leftCollision = false;
        rightCollision = false;
        bottomCollision = false; 
    
        checkStaticBlockCollision(); 
        
        for(int i = 0; i < b.length; i++){
            if(b[i].x == GameManager.left_x){
                leftCollision = true;
            }
        }
        for(int i = 0; i < b.length; i++){
            if(b[i].x + Block.SIZE == GameManager.right_x){
                rightCollision = true;
            }
        }
        
        for(int i = 0; i < b.length; i++) {
            if(b[i].y + Block.SIZE == GameManager.bottom_y){
            bottomCollision = true; 
        }
        }
    }
    
    //Checks rotation collision
    public void checkRotationCollision() {
        leftCollision = false;
        rightCollision = false;
        bottomCollision = false;
        
        checkStaticBlockCollision();
        
        for(int i = 0; i < b.length; i++){
            if(tempB[i].x < GameManager.left_x){
                leftCollision = true;
            }
        }
        for(int i = 0; i < b.length; i++){
            if(tempB[i].x + Block.SIZE > GameManager.right_x){
                rightCollision = true;
            }
        }
        
        for(int i = 0; i < b.length; i++) {
            if(tempB[i].y + Block.SIZE > GameManager.bottom_y){
                bottomCollision = true; 
            }
        }
    }
    
    //Checks collison to other blocks
    private void checkStaticBlockCollision(){
        for(int i = 0; i < GameManager.staticBlocks.size(); i++){
            int targetX = GameManager.staticBlocks.get(i).x;
            int targetY = GameManager.staticBlocks.get(i).y;
            
            for(int ii = 0; ii < b.length; ii++){
                if(b[ii].y + Block.SIZE == targetY && b[ii].x == targetX){
                    bottomCollision = true;
                }
            }
            for (int ii = 0; ii < b.length; ii++){
                if(b[ii].x - Block.SIZE == targetX && b[ii].y == targetY){
                    leftCollision = true;
                }
                
            }
            for (int ii = 0; ii < b.length; ii++){
                if(b[ii].x+Block.SIZE == targetX && b[ii].y == targetY){
                    rightCollision = true;
                }
            }     
        }
    }
    
    //Updates mino
    public void update() {
        if(deactivating) {
            deactivating();
        }
        
        if(KeyHandler.upPressed){
            switch(direction){
                case 1: getDirection2();break;
                case 2: getDirection3();break;
                case 3: getDirection4();break;
                case 4: getDirection1();break;
                
                
            }
            KeyHandler.upPressed = false;
        }
        
        checkMovementCollision();
        
        if(KeyHandler.downPressed){
            
            if(bottomCollision == false){
            b[0].y += Block.SIZE;
            b[1].y += Block.SIZE;
            b[2].y += Block.SIZE;
            b[3].y += Block.SIZE;
            GameManager.score++;
            autoDropCounter = 0;
            }
            KeyHandler.downPressed = false;
        }
        
        if(KeyHandler.leftPressed){
            if(leftCollision == false){
            b[0].x -= Block.SIZE;
            b[1].x -= Block.SIZE;
            b[2].x -= Block.SIZE;
            b[3].x -= Block.SIZE;
            }
            KeyHandler.leftPressed = false;
        }
        
        if(KeyHandler.rightPressed){
            if(rightCollision == false) {
            b[0].x += Block.SIZE;
            b[1].x += Block.SIZE;
            b[2].x += Block.SIZE;
            b[3].x += Block.SIZE;
            
            }
            KeyHandler.rightPressed = false;
        }
        
        if(bottomCollision) {
            deactivating = true;
        }else {
            autoDropCounter++;
            if (autoDropCounter == GameManager.dropInterval){
                b[0].y += Block.SIZE;
                b[1].y += Block.SIZE;
                b[2].y += Block.SIZE;
                b[3].y += Block.SIZE;
                autoDropCounter = 0;
            }
        }
    }
    
    //Allows sliding
    private void deactivating(){
        deactivateCounter++;
        if(deactivateCounter == 45){
            deactivateCounter = 0;
            checkMovementCollision();
            if(bottomCollision){
                active = false;
            }
        }
    }
    
    //Draws shape
    public void draw(Graphics2D g2) {
        int margin = 1;
        g2.setColor(b[0].c);
        
        //Delete margin code to get rid of black outline
        g2.fillRect(b[0].x+margin, b[0].y+margin, Block.SIZE-(margin*2), Block.SIZE-(margin*2));
        g2.fillRect(b[1].x+margin, b[1].y+margin, Block.SIZE-(margin*2), Block.SIZE-(margin*2));
        g2.fillRect(b[2].x+margin, b[2].y+margin, Block.SIZE-(margin*2), Block.SIZE-(margin*2));
        g2.fillRect(b[3].x+margin, b[3].y+margin, Block.SIZE-(margin*2), Block.SIZE-(margin*2));
    }
}
