package main;

/**
 * This is the main class that starts game and controls window
 *
 * @author (Zach Brough)
 * @version (7,2,2024)
 */

import javax.swing.JFrame;

public class Main
{
    //Sets up window and game
    public static void main(/*String[]args*/)
    {
        JFrame window = new JFrame("Zachtris");
        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        window.setResizable(false);
        GamePanel gp = new GamePanel();
        window.add(gp);
        window.pack();
        window.setLocationRelativeTo(null);
        window.setVisible(true);
        gp.launchGame();
    }
}
