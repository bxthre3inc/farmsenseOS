import os
import re

target_dir = '/home/bxthre3/Downloads/farmsense-implementation-package/farmsense-code'
artifacts_dir = '/home/bxthre3/.gemini/antigravity/brain/f63ead2f-77b0-4bf5-8d71-53da89daae29'

def process_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        new_content = re.sub(r'(?i)FarmSense', 'FarmSense', content)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        pass

for d in [target_dir, artifacts_dir]:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith(('.md', '.py', '.ts', '.tsx', '.html', '.sql', '.go', '.txt', '.json', '.yml', '.yaml')):
                process_file(os.path.join(root, file))
