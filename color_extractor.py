from PIL import Image
import statistics

img = Image.open(r'src\services\design\Home.png')
pixels = img.load()
width, height = img.size

print(f"Image dimensions: {width}x{height}")

# Sample specific regions for color extraction
def sample_region(x_start, x_end, y_start, y_end, label):
    colors = []
    for x in range(x_start, min(x_end, width), 5):
        for y in range(y_start, min(y_end, height), 5):
            colors.append(pixels[x, y][:3])  # RGB only
    
    if colors:
        # Get median color values for more accurate sampling
        r_vals = [c[0] for c in colors]
        g_vals = [c[1] for c in colors]
        b_vals = [c[2] for c in colors]
        
        avg_r = int(statistics.median(r_vals))
        avg_g = int(statistics.median(g_vals))
        avg_b = int(statistics.median(b_vals))
        
        hex_color = f'#{avg_r:02x}{avg_g:02x}{avg_b:02x}'
        print(f"{label}: RGB({avg_r}, {avg_g}, {avg_b}) = {hex_color}")

print("\n=== COLOR ANALYSIS FROM HOME.PNG ===\n")

# Sidebar (left area - approximately 0-170 pixels wide)
print("SIDEBAR:")
sample_region(10, 160, 20, 150, "  Background (top area)")
sample_region(10, 160, 150, 300, "  Background (middle area)")
sample_region(10, 160, 600, 700, "  Background (bottom area)")

print("\nMAIN PAGE BACKGROUND:")
sample_region(200, 900, 50, 150, "  Main content area")

print("\nCARDS (Stat cards - top row):")
sample_region(205, 350, 125, 195, "  Card background")
sample_region(215, 330, 140, 162, "  Card value text")

print("\nCHART CARDS:")
sample_region(205, 650, 320, 400, "  Chart container background")

print("\nBORDERS:")
sample_region(203, 207, 120, 200, "  Card border (left edge)")

print("\nTEXT COLORS:")
sample_region(215, 330, 138, 148, "  Card label text (small)")
sample_region(215, 330, 160, 175, "  Card value text (large)")

print("\nBASE ELEMENTS:")
sample_region(800, 900, 10, 30, "  Notification bell area")
