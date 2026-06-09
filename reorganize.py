import os
import shutil
import re
from pathlib import Path

# Paths
BASE_DIR = Path(".")
IMAGE_DIR = BASE_DIR / "image"
ASSETS_DIR = BASE_DIR / "assets"
NEW_IMAGE_DIR = ASSETS_DIR / "images"

# 1. Folder renames
FOLDER_RENAMES = {
    "login with gm and pn": "auth",
    "accurate face scanner": "face-scanner"
}

# 2. HTML File renames
HTML_RENAMES = {
    "ClayMask.html": "clay-mask.html",
    "FrashSkin.html": "fresh-skin.html",
    "MenSkin.html": "men-skin.html",
    "MoisturizerSkin.html": "moisturizer-skin.html",
    "Suncream.html": "suncream.html",
    "suncreamM.html": "suncream-men.html",
    "WomenSkin.html": "women-skin.html",
}

# Ensure new directories exist
directories_to_create = [
    NEW_IMAGE_DIR / "faces" / "female",
    NEW_IMAGE_DIR / "faces" / "male",
    NEW_IMAGE_DIR / "products" / "fresh",
    NEW_IMAGE_DIR / "products" / "suncream",
    NEW_IMAGE_DIR / "products" / "moisturizer",
    NEW_IMAGE_DIR / "banners",
    NEW_IMAGE_DIR / "misc",
]

for d in directories_to_create:
    d.mkdir(parents=True, exist_ok=True)

# Image mapping
image_mapping = {}

if IMAGE_DIR.exists():
    for img_path in IMAGE_DIR.iterdir():
        if not img_path.is_file():
            continue
            
        old_name = img_path.name
        
        # Move stray HTML file
        if old_name.endswith('.html'):
            if old_name == "suncreamM.html":
                # Check if it's identical to root one, if we just move it we could overwrite
                new_html_name = "suncream-men-alt.html"
                image_mapping[f"image/{old_name}"] = new_html_name
                continue
        
        new_name = old_name
        
        # Fix typos
        new_name = re.sub(r'frashmbenar', 'fresh-men-banner', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'frashm', 'fresh-men-', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'frash', 'fresh', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'mosituri', 'moisturizer', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'moisturi', 'moisturizer', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'moisturbenar', 'moisturizer-banner', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'moisturi', 'moisturizer', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'benar', 'banner', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'suncreambf', 'suncream-banner-female', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'suncreamf', 'suncream-female-', new_name, flags=re.IGNORECASE)
        new_name = re.sub(r'suncreamm', 'suncream-male-', new_name, flags=re.IGNORECASE)

        # Categorize
        if 'female' in new_name.lower():
            dest_folder = "faces/female"
        elif 'male' in new_name.lower():
            dest_folder = "faces/male"
        elif 'banner' in new_name.lower():
            dest_folder = "banners"
        elif 'fresh' in new_name.lower():
            dest_folder = "products/fresh"
        elif 'suncream' in new_name.lower():
            dest_folder = "products/suncream"
        elif 'moisturizer' in new_name.lower():
            dest_folder = "products/moisturizer"
        else:
            dest_folder = "misc"

        # Special cases to ensure banners don't go to other folders
        if 'banner' in new_name.lower():
            dest_folder = "banners"

        new_rel_path = f"assets/images/{dest_folder}/{new_name}"
        image_mapping[f"image/{old_name}"] = new_rel_path
        # Also map without leading folder if used directly somewhere
        # image_mapping[old_name] = new_rel_path

# Do folder renames
for old_f, new_f in FOLDER_RENAMES.items():
    if Path(old_f).exists():
        print(f"Renaming folder {old_f} to {new_f}")
        os.rename(old_f, new_f)

# Do HTML renames
html_files_in_root = [f for f in BASE_DIR.iterdir() if f.is_file() and f.suffix == '.html']
html_mapping = {}
for h in html_files_in_root:
    if h.name in HTML_RENAMES:
        html_mapping[h.name] = HTML_RENAMES[h.name]
        print(f"Renaming file {h.name} to {HTML_RENAMES[h.name]}")
        os.rename(h, HTML_RENAMES[h.name])

# We also need to update auth app HTML/JSX files if we can, but let's just do all of them
def update_file_contents():
    # Find all text files that might contain paths
    # .html, .js, .jsx, .css
    for ext in ['*.html', '*.js', '*.jsx', '*.css']:
        for file_path in BASE_DIR.rglob(ext):
            if 'node_modules' in file_path.parts or '.git' in file_path.parts or 'dist' in file_path.parts or '.next' in file_path.parts:
                continue
                
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                new_content = content
                
                # Replace image paths
                for old_img, new_img in image_mapping.items():
                    # Handle both relative paths
                    new_content = new_content.replace(f'"{old_img}"', f'"{new_img}"')
                    new_content = new_content.replace(f"'{old_img}'", f"'{new_img}'")
                    # Handle without 'image/' prefix in case it's in a subfolder or CSS
                    old_name = old_img.split('/')[-1]
                    new_rel = new_img.replace('assets/', '../assets/') # just a guess for nested
                    # Too risky to do blind replacements on old_name without image folder
                    
                # Replace HTML names
                for old_html, new_html in HTML_RENAMES.items():
                    new_content = new_content.replace(f'"{old_html}"', f'"{new_html}"')
                    new_content = new_content.replace(f"'{old_html}'", f"'{new_html}'")
                    new_content = new_content.replace(f"{old_html}#", f"{new_html}#")

                if content != new_content:
                    print(f"Updating references in {file_path}")
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
            except Exception as e:
                print(f"Could not process {file_path}: {e}")

print("Updating file contents...")
update_file_contents()

# Move images
print("Moving images...")
if IMAGE_DIR.exists():
    for old_img, new_img in image_mapping.items():
        old_path = BASE_DIR / old_img
        if new_img.endswith('.html'):
            new_path = BASE_DIR / new_img
        else:
            new_path = BASE_DIR / new_img
        
        if old_path.exists():
            new_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(old_path), str(new_path))

    # Remove the old image directory if empty
    try:
        shutil.rmtree(IMAGE_DIR)
        print("Removed old image directory.")
    except OSError as e:
        print(f"Could not remove image dir: {e}")

print("Reorganization complete!")
