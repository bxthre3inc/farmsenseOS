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
        print("❌ DAP NON-COMPLIANCE DETECTED:")
        for path, missing in non_compliant:
            print(f"  - {path}: Missing {', '.join(missing)}")
        
    # E-DAP checks
    ext_violations = []
    for root, dirs, files in os.walk("."):
        if "node_modules" in root or ".git" in root or "ARCHIVE" in root:
            continue
        for file in files:
            if file.endswith(".bak") or file.endswith(".old") or ".py.bak" in file:
                ext_violations.append(os.path.join(root, file))
                
    if ext_violations:
        print("\\n❌ E-DAP INFRASTRUCTURE VIOLATIONS (Prohibited File Sprawl):")
        for v in ext_violations:
            print(f"  - {v}")
            
    if non_compliant or ext_violations:
        sys.exit(1)
    else:
        print("✅ ALL SYSTEMS COMPLIANT WITH D-DAP AND E-DAP PROTOCOLS.")
        sys.exit(0)

if __name__ == "__main__":
    main()
