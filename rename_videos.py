import os

public_dir = os.path.join(os.getcwd(), 'public')
files = os.listdir(public_dir)

print("Current files in public:")
for f in files:
    if f.endswith('.mp4'):
        print(f" - {repr(f)}")

# Map substrings in files to clean names
mapping = {
    "POV-": "ugc_video_1.mp4",
    "Discover the ritual": "ugc_video_2.mp4",
    "tried my fair share": "ugc_video_3.mp4",
    "towel robe": "ugc_video_4.mp4"
}

for f in files:
    if f.endswith('.mp4'):
        for key, target in mapping.items():
            if key in f:
                src_path = os.path.join(public_dir, f)
                dst_path = os.path.join(public_dir, target)
                try:
                    os.rename(src_path, dst_path)
                    print(f"Successfully renamed {repr(f)} to {target}")
                except Exception as e:
                    print(f"Error renaming {repr(f)}: {e}")
