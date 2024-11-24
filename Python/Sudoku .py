import pygame
import math
import random

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
FPS = 60

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
GRAY = (128, 128, 128)

# Set up the display
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Racing Game")
clock = pygame.time.Clock()

class Car:
    def __init__(self, x, y, color):
        self.x = x
        self.y = y
        self.color = color
        self.angle = 0
        self.speed = 0
        self.acceleration = 0.1
        self.max_speed = 10
        self.turn_speed = 3
        self.width = 40
        self.height = 20
        self.points = 0
        self.checkpoint_passed = False

    def move(self):
        # Convert angle to radians
        rad = math.radians(self.angle)
        
        # Update position based on speed and angle
        self.x += math.cos(rad) * self.speed
        self.y -= math.sin(rad) * self.speed

        # Keep car within screen bounds
        self.x = max(0, min(self.x, WINDOW_WIDTH - self.width))
        self.y = max(0, min(self.y, WINDOW_HEIGHT - self.height))

    def accelerate(self):
        self.speed = min(self.speed + self.acceleration, self.max_speed)

    def brake(self):
        self.speed = max(self.speed - self.acceleration, -self.max_speed/2)

    def coast(self):
        if abs(self.speed) > 0:
            self.speed *= 0.95  # Friction

    def turn(self, direction):
        if abs(self.speed) > 0.5:
            self.angle += direction * self.turn_speed * (self.speed/self.max_speed)

    def draw(self, surface):
        # Create a rectangle representing the car
        car_rect = pygame.Surface((self.width, self.height), pygame.SRCALPHA)
        pygame.draw.rect(car_rect, self.color, (0, 0, self.width, self.height))
        
        # Add direction indicator
        pygame.draw.polygon(car_rect, (255, 255, 0), 
                          [(self.width-5, self.height//2),
                           (self.width, self.height//2-5),
                           (self.width, self.height//2+5)])

        # Rotate the car
        rotated_car = pygame.transform.rotate(car_rect, self.angle)
        
        # Get the new rect for positioning
        car_rect = rotated_car.get_rect(center=(self.x + self.width//2, 
                                               self.y + self.height//2))
        
        # Draw the car
        surface.blit(rotated_car, car_rect.topleft)

class Track:
    def __init__(self):
        self.checkpoints = [
            pygame.Rect(400, 100, 20, 100),
            pygame.Rect(600, 300, 100, 20),
            pygame.Rect(200, 400, 100, 20)
        ]
        self.walls = [
            pygame.Rect(100, 50, 10, 500),
            pygame.Rect(100, 50, 600, 10),
            pygame.Rect(700, 50, 10, 500),
            pygame.Rect(100, 550, 610, 10),
            # Inner obstacles
            pygame.Rect(300, 200, 200, 20),
            pygame.Rect(400, 300, 20, 150),
        ]

    def draw(self, surface):
        # Draw walls
        for wall in self.walls:
            pygame.draw.rect(surface, GRAY, wall)
        
        # Draw checkpoints
        for checkpoint in self.checkpoints:
            pygame.draw.rect(surface, GREEN, checkpoint, 2)

    def check_collision(self, car):
        car_rect = pygame.Rect(car.x, car.y, car.width, car.height)
        
        # Check wall collisions
        for wall in self.walls:
            if car_rect.colliderect(wall):
                car.speed = -car.speed * 0.5  # Bounce back
                return True
        
        # Check checkpoint collisions
        for i, checkpoint in enumerate(self.checkpoints):
            if car_rect.colliderect(checkpoint) and not car.checkpoint_passed:
                car.points += 10
                car.checkpoint_passed = True
                return False
        
        return False

class Game:
    def __init__(self):
        self.player = Car(150, 300, BLUE)
        self.track = Track()
        self.font = pygame.font.Font(None, 36)
        self.game_time = 0
        self.start_time = pygame.time.get_ticks()

    def handle_input(self):
        keys = pygame.key.get_pressed()
        
        if keys[pygame.K_UP]:
            self.player.accelerate()
        elif keys[pygame.K_DOWN]:
            self.player.brake()
        else:
            self.player.coast()

        if keys[pygame.K_LEFT]:
            self.player.turn(1)
        if keys[pygame.K_RIGHT]:
            self.player.turn(-1)

    def update(self):
        self.player.move()
        self.track.check_collision(self.player)
        self.game_time = (pygame.time.get_ticks() - self.start_time) // 1000

    def draw(self):
        screen.fill(WHITE)
        self.track.draw(screen)
        self.player.draw(screen)

        # Draw HUD
        score_text = self.font.render(f'Score: {self.player.points}', True, BLACK)
        time_text = self.font.render(f'Time: {self.game_time}s', True, BLACK)
        speed_text = self.font.render(f'Speed: {abs(int(self.player.speed*10))}', True, BLACK)
        
        screen.blit(score_text, (10, 10))
        screen.blit(time_text, (10, 40))
        screen.blit(speed_text, (10, 70))

def main():
    game = Game()
    running = True

    while running:
        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        # Game loop
        game.handle_input()
        game.update()
        game.draw()
        
        pygame.display.flip()
        clock.tick(FPS)

    pygame.quit()

if __name__ == "__main__":
    main()