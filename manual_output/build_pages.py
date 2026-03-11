#!/usr/bin/env python3
"""
FarmSense Master Manual: Page-Based HTML Generator
Creates ~95 individual HTML pages with breadcrumb navigation
"""

import re
import os

def main():
    print("🌱 Building FarmSense Page-Based Manual...")
    
    # Read source
    with open('/home/workspace/Bxthre3/the-farmsense-project/docs/FarmSense_Master_Manual_Comprehensive_V2.1.md', 'r') as f:
        content = f.read()
    
    # Extract all h2 sections (## headers)
    pattern = r'## ([^\n]+)\n'
    matches = list(re.finditer(pattern, content))
    
    pages = []
    for i, match in enumerate(matches):
        title = match.group(1)
        start = match.end()
        end = matches[i+1].start() if i+1 < len(matches) else len(content)
        section_content = content[start:end]
        
        # Determine part/section from title
        part_match = re.match(r'(\d+)\.(\d+)', title)
        if part_match:
            part_num = int(part_match.group(1))
            section_num = int(part_match.group(2))
        elif title.startswith("Table of Contents"):
            part_num = 0
            section_num = 0
        elif title.startswith("DOCUMENT METRICS"):
            part_num = 99
            section_num = 0
        else:
            part_num = 99
            section_num = i
        
        pages.append({
            'title': title,
            'part': part_num,
            'section': section_num,
            'content': section_content,
            'index': i
        })
    
    print(f"📄 Found {len(pages)} sections to convert")
    
    # Create HTML output dir
    output_dir = '/home/workspace/Bxthre3/the-farmsense-project/manual_output/html_pages'
    os.makedirs(output_dir, exist_ok=True)
    
    # Build navigation structure
    nav = build_navigation(pages)
    
    # Generate each page
    for i, page in enumerate(pages):
        prev_page = pages[i-1] if i > 0 else None
        next_page = pages[i+1] if i+1 < len(pages) else None
        
        html = generate_page_html(page, prev_page, next_page, nav, i, len(pages))
        
        filename = f"page_{i+1:03d}_{sanitize_filename(page['title'])}.html"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w') as f:
            f.write(html)
        
        print(f"  ✅ Page {i+1:03d}: {page['title'][:50]}...")
    
    # Generate index/TOC page
    generate_toc_page(pages, output_dir)
    
    print(f"\n✅ Complete: {len(pages)} pages generated")
    print(f"📁 Location: {output_dir}")
    print(f"🎨 Next: Run PDF generation")

def build_navigation(pages):
    """Build hierarchical navigation structure"""
    nav = {}
    for page in pages:
        part = page['part']
        if part not in nav:
            nav[part] = {
                'title': get_part_title(part),
                'pages': []
            }
        nav[part]['pages'].append(page)
    return nav

def get_part_title(part_num):
    titles = {
        0: "Table of Contents",
        1: "PART I: Executive Foundation",
        2: "PART II: Market Intelligence",
        3: "PART III: Human Capital",
        4: "PART IV: Technical Core",
        5: "PART V: Hardware Ecosystem",
        6: "PART VI: Interface Layer",
        7: "PART VII: Hydrologic Oracle",
        8: "PART VIII: Pilot Mission",
        9: "PART IX: Operations",
        10: "PART X: Cloud Architecture",
        11: "PART XI: Security",
        12: "PART XII: Legal Framework",
        13: "PART XIII: Compliance",
        14: "PART XIV: Economics",
        15: "PART XV: Grant Strategy",
        16: "PART XVI: 2026 Results",
        17: "PART XVII: Technical Data",
        18: "PART XVIII: Dictionary",
        99: "Document Information"
    }
    return titles.get(part_num, f"Part {part_num}")

def generate_page_html(page, prev_page, next_page, nav, index, total):
    """Generate HTML for a single page"""
    
    # Convert markdown to HTML (basic)
    content_html = markdown_to_html(page['content'])
    
    # Build breadcrumb
    breadcrumb = build_breadcrumb(page, nav)
    
    # Build navigation sidebar
    sidebar = build_sidebar(nav, page)
    
    # Build prev/next buttons
    prev_link = f'<a href="page_{prev_page["index"]+1:03d}_{sanitize_filename(prev_page["title"])}.html" class="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>Previous: {escape_html(prev_page["title"][:40])}</a>' if prev_page else '<span></span>'
    
    next_link = f'<a href="page_{next_page["index"]+1:03d}_{sanitize_filename(next_page["title"])}.html" class="px-4 py-2 bg-emerald-600 rounded-lg text-white hover:bg-emerald-500 flex items-center gap-2 ml-auto">Next: {escape_html(next_page["title"][:40])}<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a>' if next_page else '<span></span>'
    
    page_num = f"Page {index+1} of {total}"
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{escape_html(page['title'])} | FarmSense Master Manual</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; }}</style>
</head>
<body class="bg-slate-950 text-slate-200">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <div>
                    <h1 class="text-white font-bold text-sm">FarmSense Master Manual</h1>
                    <p class="text-slate-500 text-xs">V2.1 Comprehensive</p>
                </div>
            </div>
            <div class="flex items-center gap-4 text-xs">
                <a href="index.html" class="text-slate-400 hover:text-emerald-400">Contents</a>
                <span class="text-slate-600">|</span>
                <a href="../pdf/FarmSense_Master_Manual_Comprehensive_V2.1.pdf" class="text-slate-400 hover:text-emerald-400 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    PDF
                </a>
                <span class="text-slate-600">|</span>
                <span class="text-slate-500">{page_num}</span>
            </div>
        </div>
    </header>

    <div class="flex max-w-7xl mx-auto">
        <!-- Sidebar Navigation -->
        <aside class="w-64 hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto border-r border-white/5 bg-slate-900/50">
            {sidebar}
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0">
            <!-- Breadcrumb -->
            <div class="px-8 py-4 border-b border-white/5 bg-slate-900/30">
                <nav class="flex items-center gap-2 text-sm text-slate-400">
                    {breadcrumb}
                </nav>
            </div>

            <!-- Page Content -->
            <article class="px-8 py-12 max-w-4xl">
                <h1 class="text-4xl font-black text-white mb-6 tracking-tight">{escape_html(page['title'])}</h1>
                
                <div class="prose prose-invert prose-slate max-w-none">
                    {content_html}
                </div>

                <!-- Page Navigation -->
                <div class="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                    {prev_link}
                    {next_link}
                </div>
            </article>

            <!-- Footer -->
            <footer class="px-8 py-6 border-t border-white/5 text-center text-slate-600 text-sm">
                <p>FarmSense Master Manual V2.1 | © 2026 Bxthre3 Inc. | CONFIDENTIAL</p>
            </footer>
        </main>
    </div>
</body>
</html>'''

def build_breadcrumb(page, nav):
    """Build breadcrumb navigation"""
    if page['part'] == 0:
        return '<span class="text-emerald-400">Table of Contents</span>'
    
    part_title = get_part_title(page['part'])
    return f'''<a href="index.html" class="hover:text-emerald-400 transition-colors">Home</a>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <a href="#{page['part']}" class="hover:text-emerald-400 transition-colors">Part {page['part']}</a>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span class="text-white font-medium truncate max-w-xs">{escape_html(page['title'][:50])}</span>'''

def build_sidebar(nav, current_page):
    """Build navigation sidebar"""
    items = []
    for part_num in sorted(nav.keys()):
        part = nav[part_num]
        is_active = current_page['part'] == part_num
        
        pages_html = ""
        for p in part['pages']:
            is_current = p['index'] == current_page['index']
            page_link = f'page_{p["index"]+1:03d}_{sanitize_filename(p["title"])}.html'
            if is_current:
                pages_html += f'<a href="{page_link}" class="block px-3 py-1.5 text-xs text-emerald-400 bg-emerald-500/10 rounded border-l-2 border-emerald-400">{escape_html(p["title"][:35])}</a>'
            else:
                pages_html += f'<a href="{page_link}" class="block px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded transition-colors">{escape_html(p["title"][:35])}</a>'
        
        if is_active:
            items.append(f'''<div class="mb-4">
                <div class="px-3 py-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">Part {part_num}</div>
                <div class="space-y-1">{pages_html}</div>
            </div>''')
        else:
            # Show just the part title collapsed
            items.append(f'''<div class="mb-2">
                <div class="px-3 py-2 text-xs font-bold text-slate-600 uppercase tracking-wider">Part {part_num}</div>
            </div>''')
    
    return '<nav class="p-4">' + ''.join(items) + '</nav>'

def markdown_to_html(content):
    """Basic markdown to HTML conversion"""
    # Headers
    content = re.sub(r'### ([^\n]+)', r'<h3 class="text-xl font-bold text-emerald-400 mt-8 mb-4">\1</h3>', content)
    content = re.sub(r'#### ([^\n]+)', r'<h4 class="text-lg font-semibold text-white mt-6 mb-3">\1</h4>', content)
    
    # Bold and italic
    content = re.sub(r'\*\*\*([^*]+)\*\*\*', r'<strong><em>\1</em></strong>', content)
    content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', content)
    content = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', content)
    
    # Code
    content = re.sub(r'`([^`]+)`', r'<code class="bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm font-mono">\1</code>', content)
    
    # Tables
    content = process_tables(content)
    
    # Lists
    content = process_lists(content)
    
    # Paragraphs
    paragraphs = content.split('\n\n')
    processed = []
    for p in paragraphs:
        p = p.strip()
        if p and not p.startswith('<') and not p.startswith('|'):
            p = f'<p class="text-slate-300 leading-relaxed mb-4">{p}</p>'
        processed.append(p)
    
    return '\n\n'.join(processed)

def process_tables(content):
    """Process markdown tables to HTML"""
    lines = content.split('\n')
    result = []
    in_table = False
    table_lines = []
    
    for line in lines:
        if '|' in line and not line.startswith('##') and not line.startswith('###'):
            if not in_table:
                in_table = True
                table_lines = []
            table_lines.append(line)
        else:
            if in_table:
                result.append(convert_table_to_html(table_lines))
                in_table = False
            result.append(line)
    
    if in_table:
        result.append(convert_table_to_html(table_lines))
    
    return '\n'.join(result)

def convert_table_to_html(table_lines):
    """Convert markdown table lines to HTML"""
    # Filter out separator lines
    data_lines = [l for l in table_lines if '---' not in l and l.strip()]
    if not data_lines:
        return ''
    
    html = '<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse">'
    
    # Header
    headers = [c.strip() for c in data_lines[0].split('|') if c.strip()]
    html += '<thead><tr>' + ''.join(f'<th class="text-left p-3 bg-slate-800 text-emerald-400 font-semibold border-b border-slate-700">{escape_html(h)}</th>' for h in headers) + '</tr></thead>'
    
    # Body
    html += '<tbody>'
    for row in data_lines[1:]:
        cells = [c.strip() for c in row.split('|') if c.strip()]
        html += '<tr class="border-b border-slate-800/50 hover:bg-slate-800/30">' + ''.join(f'<td class="p-3 text-slate-300">{escape_html(c)}</td>' for c in cells) + '</tr>'
    html += '</tbody></table></div>'
    
    return html

def process_lists(content):
    """Process markdown lists to HTML"""
    lines = content.split('\n')
    result = []
    in_list = False
    list_items = []
    
    for line in lines:
        list_match = re.match(r'^[\s]*[-*] (.+)$', line)
        if list_match:
            if not in_list:
                in_list = True
                list_items = []
            list_items.append(list_match.group(1))
        else:
            if in_list:
                result.append('<ul class="list-disc list-inside text-slate-300 mb-4 space-y-1">' + ''.join(f'<li>{markdown_inline_to_html(item)}</li>' for item in list_items) + '</ul>')
                in_list = False
            result.append(line)
    
    if in_list:
        result.append('<ul class="list-disc list-inside text-slate-300 mb-4 space-y-1">' + ''.join(f'<li>{markdown_inline_to_html(item)}</li>' for item in list_items) + '</ul>')
    
    return '\n'.join(result)

def markdown_inline_to_html(text):
    """Convert inline markdown to HTML"""
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', text)
    text = re.sub(r'`([^`]+)`', r'<code class="bg-slate-800 text-cyan-400 px-1 rounded text-xs">\1</code>', text)
    return text

def generate_toc_page(pages, output_dir):
    """Generate table of contents page"""
    # Group pages by part
    parts = {}
    for p in pages:
        part = p['part']
        if part not in parts:
            parts[part] = []
        parts[part].append(p)
    
    toc_items = []
    for part_num in sorted(parts.keys()):
        if part_num == 0 or part_num == 99:
            continue
        part_pages = parts[part_num]
        part_title = get_part_title(part_num)
        
        page_links = ''.join([
            f'<a href="page_{p["index"]+1:03d}_{sanitize_filename(p["title"])}.html" class="block py-1 text-sm text-slate-400 hover:text-emerald-400 transition-colors">{p["index"]+1}. {escape_html(p["title"])}</a>'
            for p in part_pages
        ])
        
        toc_items.append(f'''<div class="bg-slate-900/50 border border-white/5 rounded-xl p-6">
            <h2 class="text-lg font-bold text-white mb-1">{part_title}</h2>
            <p class="text-xs text-slate-500 mb-4">{len(part_pages)} sections</p>
            <div class="space-y-1">{page_links}</div>
        </div>''')
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table of Contents | FarmSense Master Manual</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>body {{ font-family: 'Inter', sans-serif; }}</style>
</head>
<body class="bg-slate-950 text-slate-200 min-h-screen">
    <!-- Header -->
    <header class="bg-slate-900/95 backdrop-blur border-b border-white/5">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                <div>
                    <h1 class="text-white font-bold">FarmSense Master Manual</h1>
                    <p class="text-slate-500 text-sm">V2.1 Comprehensive | 95 Sections | 6,214 Lines</p>
                </div>
            </div>
            <a href="../pdf/FarmSense_Master_Manual_Comprehensive_V2.1.pdf" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Download PDF
            </a>
        </div>
    </header>

    <!-- Hero -->
    <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="text-center mb-12">
            <h1 class="text-4xl font-black text-white mb-4">Table of Contents</h1>
            <p class="text-slate-400 max-w-2xl mx-auto">The definitive technical, operational, and financial specification for the FarmSense Deterministic Farming Operating System (FS-1). Navigate through 18 parts and 95 detailed sections.</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div class="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
                <div class="text-3xl font-black text-emerald-400">18</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider">Parts</div>
            </div>
            <div class="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
                <div class="text-3xl font-black text-emerald-400">95</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider">Sections</div>
            </div>
            <div class="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
                <div class="text-3xl font-black text-emerald-400">6,214</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider">Lines</div>
            </div>
            <div class="bg-slate-900/50 border border-white/5 rounded-xl p-4 text-center">
                <div class="text-3xl font-black text-emerald-400">45K+</div>
                <div class="text-xs text-slate-500 uppercase tracking-wider">Words</div>
            </div>
        </div>

        <!-- TOC Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {''.join(toc_items)}
        </div>

        <!-- Footer -->
        <div class="mt-16 text-center text-slate-600 text-sm">
            <p>FarmSense™ | FS-1™ | Digital Water Ledger™</p>
            <p class="mt-2">© 2026 Bxthre3 Inc. All rights reserved. | CONFIDENTIAL</p>
        </div>
    </div>
</body>
</html>'''
    
    with open(os.path.join(output_dir, 'index.html'), 'w') as f:
        f.write(html)
    print("  ✅ Generated: index.html")

def sanitize_filename(title):
    """Create safe filename from title"""
    safe = re.sub(r'[^\w\s-]', '', title).strip().lower()
    safe = re.sub(r'[-\s]+', '-', safe)
    return safe[:50]

def escape_html(text):
    """Escape HTML special characters"""
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')

if __name__ == '__main__':
    main()
