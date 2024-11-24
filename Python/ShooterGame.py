import pygame
import random
import math
from pygame import mixer

# Initialize Pygame
pygame.init()

# Create game window
WIDTH = 800
HEIGHT = 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Space Shooter")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Player
class Player:
    def __init__(self):
        self.image = pygame.Surface((50, 50))
        self.image.fill(WHITE)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 10
        self.speed = 5
        self.health = 100

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= self.speed
        if keys[pygame.K_RIGHT] and self.rect.right < WIDTH:
            self.rect.x += self.speed

    def shoot(self):
        return Bullet(self.rect.centerx, self.rect.top)

# Enemy
class Enemy:
    def __init__(self):
        self.image = pygame.Surface((30, 30))
        self.image.fill((255, 0, 0))  # Red color
        self.rect = self.image.get_rect()
        self.rect.x = random.randint(0, WIDTH - self.rect.width)
        self.rect.y = random.randint(-100, -40)
        self.speed_x = random.choice([-2, -1, 1, 2])
        self.speed_y = random.randint(1, 3)

    def update(self):
        self.rect.x += self.speed_x
        self.rect.y += self.speed_y
        
        # Bounce off walls
        if self.rect.left < 0 or self.rect.right > WIDTH:
            self.speed_x *= -1
            
        # Reset if moved past bottom
        if self.rect.top > HEIGHT:
            self.reset()
            
    def reset(self):
        self.rect.x = random.randint(0, WIDTH - self.rect.width)
        self.rect.y = random.randint(-100, -40)
        self.speed_x = random.choice([-2, -1, 1, 2])
        self.speed_y = random.randint(1, 3)

# Bullet
class Bullet:
    def __init__(self, x, y):
        self.image = pygame.Surface((5, 10))
        self.image.fill((255, 255, 0))  # Yellow color
        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.rect.bottom = y
        self.speed = -10

    def update(self):
        self.rect.y += self.speed
        return self.rect.bottom < 0

# Game class
class SpaceShooter:
    def __init__(self):
        self.player = Player()
        self.enemies = [Enemy() for _ in range(6)]
        self.bullets = []
        self.score = 0
        self.game_over = False
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        
        # Try to initialize sound - if it fails, continue without sound
        try:
            if pygame.mixer.get_init():
                self.has_sound = True
                # You can add the background.wav file later if you want music
                # mixer.music.load('background.wav')
                # mixer.music.play(-1)
            else:
                self.has_sound = False
        except:
            self.has_sound = False

    def handle_collisions(self):
        # Bullet-Enemy collisions
        for bullet in self.bullets[:]:
            for enemy in self.enemies[:]:
                if bullet.rect.colliderect(enemy.rect):
                    if bullet in self.bullets:
                        self.bullets.remove(bullet)
                    enemy.reset()
                    self.score += 10
                    break

        # Player-Enemy collisions
        for enemy in self.enemies:
            if self.player.rect.colliderect(enemy.rect):
                self.player.health -= 10
                enemy.reset()
                if self.player.health <= 0:
                    self.game_over = True

    def run(self):
        running = True
        while running:
            # Event handling
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE and not self.game_over:
                        self.bullets.append(self.player.shoot())
                    elif event.key == pygame.K_r and self.game_over:
                        self.__init__()  # Reset game

            if not self.game_over:
                # Update
                self.player.update()
                for enemy in self.enemies:
                    enemy.update()
                
                # Update bullets and remove those that are off screen
                self.bullets = [bullet for bullet in self.bullets if not bullet.update()]
                
                # Handle collisions
                self.handle_collisions()

            # Draw
            screen.fill(BLACK)
            
            # Draw game objects
            screen.blit(self.player.image, self.player.rect)
            for enemy in self.enemies:
                screen.blit(enemy.image, enemy.rect)
            for bullet in self.bullets:
                screen.blit(bullet.image, bullet.rect)

            # Draw HUD
            score_text = self.font.render(f'Score: {self.score}', True, WHITE)
            health_text = self.font.render(f'Health: {self.player.health}', True, WHITE)
            screen.blit(score_text, (10, 10))
            screen.blit(health_text, (10, 50))

            if self.game_over:
                game_over_text = self.font.render('Game Over! Press R to restart', True, WHITE)
                screen.blit(game_over_text, (WIDTH//2 - game_over_text.get_width()//2, HEIGHT//2))

            pygame.display.flip()
            self.clock.tick(60)

        pygame.quit()

# Run the game
if __name__ == "__main__":
    game = SpaceShooter()
    game.run()