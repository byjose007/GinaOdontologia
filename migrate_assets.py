
import os
import shutil
import glob

SOURCE_DIR = "recursos"
DEST_DIR = "assets/gallery"
IMG_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
VID_EXTENSIONS = {'.mp4', '.mov', '.webm'}

def migrate_assets():
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)

    img_count = 1
    vid_count = 1
    
    # Walk through source directory
    for root, dirs, files in os.walk(SOURCE_DIR):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            src_path = os.path.join(root, file)
            
            # Skip hidden files
            if file.startswith('.'):
                continue
                
            new_name = ""
            if ext in IMG_EXTENSIONS:
                new_name = f"image-{img_count:02d}{ext}"
                img_count += 1
            elif ext in VID_EXTENSIONS:
                new_name = f"video-{vid_count:02d}{ext}"
                vid_count += 1
            else:
                continue # Skip unknown files
            
            dest_path = os.path.join(DEST_DIR, new_name)
            print(f"Moving {src_path} -> {dest_path}")
            shutil.copy2(src_path, dest_path)

if __name__ == "__main__":
    migrate_assets()
