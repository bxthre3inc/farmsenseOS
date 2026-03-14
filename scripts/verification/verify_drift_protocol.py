import os
import sys

REQUIRED_MARKER = "D-DAP (Documentation Drift Aversion Protocol)"
REQUIRED_FIELDS = ["Status:", "Last Audited:", "Drift Aversion: REQUIRED"]

def check_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        missing = []
        for field in REQUIRED_FIELDS:
            if field not in content:
                missing.append(field)
                
        if REQUIRED_MARKER not in content and "DOCUMENTATION DRIFT AVERSION PROTOCOL" not in content:
            missing.append("D-DAP Protocol Marker")
            
        return missing
    except Exception as e:
        return [f"Read Error: {e}"]

def main():
    docs_dir = "docs"
    non_compliant = []
    
    # Check root files
    for root_file in ["README.md", "todo.md"]:
        if os.path.exists(root_file):
            missing = check_file(root_file)
            if missing:
                non_compliant.append((root_file, missing))
    
    # Check docs directory
    if os.path.exists(docs_dir):
        for root, dirs, files in os.walk(docs_dir):
            for file in files:
                if file.endswith(".md"):
                    filepath = os.path.join(root, file)
                    missing = check_file(filepath)
                    if missing:
                        non_compliant.append((filepath, missing))
    
    if non_compliant:
        print("❌ DRIFT PROTOCOL NON-COMPLIANCE DETECTED:")
        for path, missing in non_compliant:
            print(f"  - {path}: Missing {', '.join(missing)}")
        sys.exit(1)
    else:
        print("✅ ALL DOCUMENTATION COMPLIANT WITH DRIFT AVERSION PROTOCOL.")
        sys.exit(0)

if __name__ == "__main__":
    main()
