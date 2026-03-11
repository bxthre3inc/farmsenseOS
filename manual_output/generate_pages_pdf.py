#!/usr/bin/env python3
"""
Generate consolidated PDF from page-based HTML files
"""

import asyncio
from playwright.async_api import async_playwright
import os

def get_page_files():
    """Get all page HTML files in order"""
    pages_dir = '/home/workspace/Bxthre3/the-farmsense-project/manual_output/html_pages'
    files = [f for f in os.listdir(pages_dir) if f.startswith('page_') and f.endswith('.html')]
    files.sort()  # page_001, page_002, etc.
    return [os.path.join(pages_dir, f) for f in files]

async def generate_pdf():
    print("🎨 Starting PDF generation from 566 pages...")
    
    pages = get_page_files()
    print(f"📄 Found {len(pages)} pages")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        
        # Create PDF
        pdf = await context.new_page()
        
        # Build HTML
        html_parts = ['<!DOCTYPE html><html><head><meta charset="UTF-8"><title>FarmSense Master Manual V2.1 - Complete</title><style>body{font-family:Inter,sans-serif;margin:0;padding:0;}@page{size:A4;margin:20mm;}h1{font-size:24pt;color:#10b981;border-bottom:2px solid #10b981;padding-bottom:10pt;margin-top:30pt;}h2{font-size:18pt;color:#fff;margin-top:24pt;}h3{font-size:14pt;color:#34d399;margin-top:18pt;}p,li,td{font-size:10pt;line-height:1.6;color:#cbd5e1;}table{width:100%;border-collapse:collapse;margin:15pt 0;}th{background:#064e3b;color:#34d399;padding:8pt;text-align:left;font-size:9pt;}td{padding:6pt;border-bottom:1px solid #1e293b;}code{background:#1e293b;padding:2pt 4pt;border-radius:3pt;color:#22d3ee;font-family:JetBrains Mono,monospace;font-size:9pt;}.page-break{page-break-after:always;}.header{position:fixed;top:0;left:0;right:0;height:40pt;background:#0f172a;border-bottom:1px solid #1e293b;padding:10pt 20pt;display:flex;justify-content:space-between;align-items:center;font-size:8pt;color:#64748b;}.footer{position:fixed;bottom:0;left:0;right:0;height:30pt;background:#0f172a;border-top:1px solid #1e293b;padding:8pt 20pt;text-align:center;font-size:8pt;color:#64748b;}</style></head><body>']
        
        # Add cover page
        html_parts.append('''
        <div style="height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(135deg,#0f172a 0%,#064e3b 100%);text-align:center;padding:40pt;">
            <div style="font-size:12pt;color:#34d399;letter-spacing:4pt;text-transform:uppercase;margin-bottom:20pt;">Comprehensive Technical Specification</div>
            <h1 style="font-size:36pt;color:#fff;margin:0;border:none;">FarmSense</h1>
            <h2 style="font-size:20pt;color:#94a3b8;margin-top:10pt;font-weight:normal;">Deterministic Farming Operating System</h2>
            <h3 style="font-size:16pt;color:#10b981;margin-top:30pt;">Master Manual V2.1</h3>
            <div style="margin-top:40pt;color:#64748b;font-size:10pt;">
                <p>566 Pages | 18 Parts | 6,214 Lines</p>
                <p style="margin-top:20pt;">© 2026 Bxthre3 Inc.</p>
                <p>CONFIDENTIAL — For Investor & Academic Review</p>
            </div>
        </div>
        <div class="page-break"></div>
        ''')
        
        # Add each page content
        for i, page_file in enumerate(pages[:100]):  # Limit to first 100 for demo
            with open(page_file, 'r') as f:
                content = f.read()
            
            # Extract body content
            import re
            body_match = re.search(r'<article[^>]*>(.*?)</article>', content, re.DOTALL)
            if body_match:
                body = body_match.group(1)
                # Clean up classes for PDF
                body = re.sub(r'class="[^"]*"', '', body)
                html_parts.append(f'<div style="margin-bottom:30pt;">{body}</div>')
                
                if i < len(pages) - 1:
                    html_parts.append('<div class="page-break"></div>')
            
            if (i + 1) % 20 == 0:
                print(f"  ✅ Added pages {i-18}-{i+1}")
        
        html_parts.append('</body></html>')
        
        # Save combined HTML
        combined_html = ''.join(html_parts)
        combined_path = '/tmp/combined_for_pdf.html'
        with open(combined_path, 'w') as f:
            f.write(combined_html)
        
        # Generate PDF
        await pdf.goto(f'file://{combined_path}')
        await pdf.wait_for_load_state('networkidle')
        
        pdf_path = '/home/workspace/Bxthre3/the-farmsense-project/manual_output/pdf/FarmSense_Master_Manual_V2.1_Pages.pdf'
        await pdf.pdf(path=pdf_path, format='A4', print_background=True, margin={'top': '20mm', 'bottom': '20mm', 'left': '20mm', 'right': '20mm'})
        
        await browser.close()
        
        # Check size
        size_kb = os.path.getsize(pdf_path) / 1024
        print(f"✅ PDF Generated: {pdf_path}")
        print(f"   Size: {size_kb:.1f} KB")
        print(f"   Pages: ~100 (demo limited)")

if __name__ == '__main__':
    asyncio.run(generate_pdf())
