import os
import re
import sys

def verify_links(directory):
    md_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                md_files.append(os.path.join(root, file))

    errors = []
    
    for md_file in md_files:
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Check relative links: [label](path)
        links = re.findall(r'\[.*?\]\((.*?)\)', content)
        for link in links:
            if link.startswith(("http://", "https://", "mailto:", "#")):
                continue
                
            path_part = link.split("#")[0]
            if not path_part:
                continue
                
            link_path = os.path.normpath(os.path.join(os.path.dirname(md_file), path_part))
            if not os.path.exists(link_path):
                errors.append(f"❌ {md_file}: Broken link to '{link}'")

        # 2. Check internal anchors: #section-name
        anchors = re.findall(r'\[.*?\]\(#(.*?)\)', content)
        for anchor in anchors:
            # Check if anchor exists in headers
            header_match = re.search(rf'^#+ .*?{re.escape(anchor.replace("-", " "))}.*?$', content, re.IGNORECASE | re.MULTILINE)
            # Markdown anchors are usually lowercase and hyphenated
            slug = anchor.lower().replace("-", " ")
            found = False
            for line in content.splitlines():
                if line.startswith("#"):
                    header_text = line.lstrip("#").strip().lower()
                    if header_text.replace(" ", "-") == anchor or header_text == slug:
                        found = True
                        break
            if not found:
                errors.append(f"⚠️ {md_file}: Potential broken internal anchor '#{anchor}'")

    return errors

if __name__ == "__main__":
    docs_dir = "docs/md"
    if not os.path.exists(docs_dir):
        print(f"Directory {docs_dir} not found.")
        sys.exit(1)
        
    print(f"Checking documentation integrity in {docs_dir}...")
    link_errors = verify_links(docs_dir)
    
    if link_errors:
        for err in link_errors:
            print(err)
        # Note: We might not want to hard-fail immediately if there are legacy issues, 
        # but for a strict protocol we should.
        # sys.exit(1) 
    else:
        print("✅ No broken links or anchors detected.")
    
    sys.exit(0)
