import turtle  # Main graphics library for creating the game window and objects
import time    # For controlling game speed and adding delays
import random  # For generating random positions for food

#########################
# SCREEN SETUP
#########################
# Create and configure the main game window
screen = turtle.Screen()
screen.title("Snake Game")  # Set window title
screen.bgcolor("black")     # Set background color
screen.setup(width=600, height=600)  # Set window size (600x600 pixels)
screen.tracer(0)  # Turn off automatic updates (improves performance)

#########################
# SNAKE HEAD SETUP
#########################
# Create and configure the snake's head
head = turtle.Turtle()  # Create a turtle object for snake's head
head.speed(0)          # Set the fastest speed (0) for instant drawing
head.shape("square")   # Set shape to square (default size 20x20 pixels)
head.color("white")    # Set color to white
head.penup()          # Lift the pen up (don't draw lines when moving)
head.goto(0, 0)       # Place head at center of screen
head.direction = "stop"  # Initial direction (snake doesn't move until key press)

#########################
# FOOD SETUP
#########################
# Create and configure the food
food = turtle.Turtle()
food.speed(0)         # Fastest speed for food placement
food.shape("circle")  # Circular shape to distinguish from snake
food.color("red")     # Red color for visibility
food.penup()          # Don't draw lines when moving
food.goto(0, 100)     # Initial position above center

#########################
# GAME VARIABLES
#########################
segments = []      # List to store all body segments of the snake
score = 0          # Current game score
high_score = 0     # Highest score achieved

#########################
# SCORE DISPLAY SETUP
#########################
# Create and configure the score display
score_display = turtle.Turtle()
score_display.speed(0)      # Fastest speed for updating
score_display.color("white")  # White text
score_display.penup()        # Don't draw lines
score_display.hideturtle()   # Hide the turtle icon
score_display.goto(0, 260)   # Position near top of screen
# Write initial score display
score_display.write(f"Score: {score}  High Score: {high_score}", 
                   align="center", font=("Courier", 24, "normal"))

#########################
# MOVEMENT FUNCTIONS
#########################
def move():
    """
    Main movement function. Updates snake's position based on current direction.
    Moves 20 pixels in the current direction (matches turtle's default size).
    """
    if head.direction == "up":
        y = head.ycor()        # Get current y coordinate
        head.sety(y + 20)      # Move 20 pixels up
    elif head.direction == "down":
        y = head.ycor()
        head.sety(y - 20)      # Move 20 pixels down
    elif head.direction == "left":
        x = head.xcor()
        head.setx(x - 20)      # Move 20 pixels left
    elif head.direction == "right":
        x = head.xcor()
        head.setx(x + 20)      # Move 20 pixels right

#########################
# DIRECTION CONTROL FUNCTIONS
#########################
# These functions change snake's direction
# Each checks that snake isn't moving in opposite direction
# (prevents snake from reversing into itself)
def go_up():
    if head.direction != "down":  # Can't go up if moving down
        head.direction = "up"

def go_down():
    if head.direction != "up":    # Can't go down if moving up
        head.direction = "down"

def go_left():
    if head.direction != "right":  # Can't go left if moving right
        head.direction = "left"

def go_right():
    if head.direction != "left":   # Can't go right if moving left
        head.direction = "right"

#########################
# KEYBOARD BINDINGS
#########################
# Set up keyboard listeners
screen.listen()  # Tell screen to listen for keyboard input
# Bind both WASD and arrow keys to direction functions
screen.onkeypress(go_up, "w")
screen.onkeypress(go_down, "s")
screen.onkeypress(go_left, "a")
screen.onkeypress(go_right, "d")
screen.onkeypress(go_up, "Up")
screen.onkeypress(go_down, "Down")
screen.onkeypress(go_left, "Left")
screen.onkeypress(go_right, "Right")

#########################
# MAIN GAME LOOP
#########################
while True:
    screen.update()  # Update screen (manual update since tracer is off)
    
    #########################
    # BORDER COLLISION CHECK
    #########################
    # Check if snake hits the border (game boundaries)
    if (head.xcor() > 290 or head.xcor() < -290 or 
        head.ycor() > 290 or head.ycor() < -290):
        time.sleep(1)           # Pause briefly
        head.goto(0, 0)         # Reset head position
        head.direction = "stop"  # Stop movement
        
        # Hide all body segments
        for segment in segments:
            segment.goto(1000, 1000)  # Move segments off screen
        segments.clear()              # Clear segments list
        
        # Reset score
        score = 0
        score_display.clear()
        score_display.write(f"Score: {score}  High Score: {high_score}", 
                          align="center", font=("Courier", 24, "normal"))
    
    #########################
    # FOOD COLLISION CHECK
    #########################
    # Check if snake head touches food
    if head.distance(food) < 20:  # Distance less than 20 pixels (size of one segment)
        # Move food to random position
        x = random.randint(-280, 280)  # Keep food within game boundaries
        y = random.randint(-280, 280)
        food.goto(x, y)
        
        # Add new body segment
        new_segment = turtle.Turtle()
        new_segment.speed(0)
        new_segment.shape("square")
        new_segment.color("grey")   # Body segments are grey
        new_segment.penup()
        segments.append(new_segment)
        
        # Update score
        score += 10
        if score > high_score:
            high_score = score  # Update high score if current score is higher
        score_display.clear()
        score_display.write(f"Score: {score}  High Score: {high_score}", 
                          align="center", font=("Courier", 24, "normal"))
    
    #########################
    # BODY SEGMENT MOVEMENT
    #########################
    # Move segments in reverse order
    # Each segment moves to position of segment in front of it
    for index in range(len(segments)-1, 0, -1):
        x = segments[index-1].xcor()
        y = segments[index-1].ycor()
        segments[index].goto(x, y)
    
    # Move first segment to where head was
    if len(segments) > 0:
        x = head.xcor()
        y = head.ycor()
        segments[0].goto(x, y)
    
    # Move snake head
    move()
    
    #########################
    # BODY COLLISION CHECK
    #########################
    # Check if head hits any segment
    for segment in segments:
        if segment.distance(head) < 20:
            time.sleep(1)           # Pause briefly
            head.goto(0, 0)         # Reset head position
            head.direction = "stop"  # Stop movement
            
            # Hide segments
            for segment in segments:
                segment.goto(1000, 1000)  # Move off screen
            segments.clear()              # Clear segments list
            
            # Reset score
            score = 0
            score_display.clear()
            score_display.write(f"Score: {score}  High Score: {high_score}", 
                              align="center", font=("Courier", 24, "normal"))
    
    time.sleep(0.1)  # Control game speed (lower = faster)

# Keep window open (this line never reached in practice)
screen.mainloop()