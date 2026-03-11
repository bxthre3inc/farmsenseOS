#!/usr/bin/env node
/**
 * FarmSense Investor Materials PDF/HTML Generator
 * 
 * Usage:
 *   node build.js                      # Build all documents (PDF + HTML)
 *   node build.js --format=pdf         # Build only PDFs
 *   node build.js --format=html        # Build only HTML
 *   node build.js --doc=executive-summary  # Build specific document
 *   node build.js --watch              # Watch mode for development
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItTOC from 'markdown-it-table-of-contents';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse arguments
const args = process.argv.slice(2);
const format = args.find(a => a.startsWith('--format='))?.split('=')[1] || 'both';
const specificDoc = args.find(a => a.startsWith('--doc='))?.split('=')[1];
const watchMode = args.includes('--watch');

// Markdown parser with extensions
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});
md.use(markdownItAttrs);
md.use(markdownItTOC, {
    includeLevel: [2, 3],
    containerClass: 'toc bg-slate-900/50 border border-white/5 rounded-xl p-6 my-8'
});

// Document configurations
const documents = [
    {
        id: 'executive-summary',
        title: 'Executive Summary',
        subtitle: 'FarmSense Seed Round A-1',
        source: '../FarmSense/Investor_Materials/SECRET_CLEARANCE_BRIEF.md',
        classification: 'CONFIDENTIAL',
        icon: 'target',
        sections: [
            { title: 'Executive Summary', icon: 'file-text' },
            { title: 'The Trojan Horse Model', icon: 'shield' },
            { title: 'Technical Capabilities', icon: 'cpu' },
            { title: 'Operational Scenarios', icon: 'globe' },
            { title: 'Investment Thesis', icon: 'trending-up' }
        ]
    },
    {
        id: 'technical-overview',
        title: 'Technical Architecture',
        subtitle: 'FS-1 Deterministic Agriculture OS',
        source: '../docs/MASTER_SOFTWARE_ARCH.md',
        classification: 'CONFIDENTIAL',
        icon: 'layers',
        sections: [
            { title: 'System Architecture', icon: 'grid' },
            { title: 'Data Pipeline', icon: 'database' },
            { title: 'Edge Compute', icon: 'hard-drive' },
            { title: 'API & Integration', icon: 'plug' }
        ]
    },
    {
        id: 'financial-projections',
        title: 'Financial Projections',
        subtitle: 'Revenue Model & Growth Trajectory',
        source: '../docs/MASTER_PROJECT_ROADMAP.md',
        classification: 'STRICTLY CONFIDENTIAL',
        icon: 'bar-chart-3',
        sections: [
            { title: 'Revenue Streams', icon: 'dollar-sign' },
            { title: 'Growth Projections', icon: 'trending-up' },
            { title: 'Unit Economics', icon: 'pie-chart' },
            { title: 'Use of Funds', icon: 'briefcase' }
        ]
    },
    {
        id: 'team-leadership',
        title: 'Leadership & Team',
        subtitle: 'Builders of the Deterministic Future',
        classification: 'CONFIDENTIAL',
        icon: 'users',
        sections: [
            { title: 'Founding Team', icon: 'user' },
            { title: 'Advisory Board', icon: 'users-round' },
            { title: 'Key Hires', icon: 'briefcase' }
        ]
    }
];

async function loadTemplate(name) {
    const templatePath = path.join(__dirname, 'templates', `${name}.html`);
    return await fs.readFile(templatePath, 'utf-8');
}

async function renderMarkdown(sourcePath) {
    // Resolve path relative to pdf_build directory
    const fullPath = path.resolve(__dirname, sourcePath);
    
    try {
        const content = await fs.readFile(fullPath, 'utf-8');
        return md.render(content);
    } catch (err) {
        console.warn(`⚠️  Could not load ${fullPath}: ${err.message}`);
        return `<p class="text-slate-500 italic">Content loading...</p>`;
    }
}

function interpolateTemplate(template, vars) {
    let result = template;
    for (const [key, value] of Object.entries(vars)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, value);
    }
    return result;
}

async function generateDocument(doc, baseTemplate, outputDir) {
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Build document HTML
    let documentHtml = '';
    
    // Cover page
    const coverTemplate = await loadTemplate('cover');
    documentHtml += interpolateTemplate(coverTemplate, {
        title: doc.title,
        subtitle: doc.subtitle,
        docType: 'Investor Material',
        classification: doc.classification,
        date: date
    });
    
    // Content pages
    const contentTemplate = await loadTemplate('content');
    
    if (doc.source) {
        // Render markdown content
        const bodyContent = await renderMarkdown(doc.source);
        documentHtml += interpolateTemplate(contentTemplate, {
            title: doc.title,
            body: bodyContent,
            date: date
        });
    } else if (doc.sections) {
        // Build from sections
        for (const section of doc.sections) {
            const body = `<h1>${section.title}</h1><p class="text-slate-500">Section content to be added...</p>`;
            documentHtml += interpolateTemplate(contentTemplate, {
                title: doc.title,
                body,
                date: date
            });
        }
    }
    
    // Wrap in base template
    const finalHtml = interpolateTemplate(baseTemplate, {
        title: doc.title,
        content: documentHtml
    });
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    const outputBase = path.join(outputDir, doc.id);
    
    // Write HTML
    if (format === 'html' || format === 'both') {
        await fs.writeFile(`${outputBase}.html`, finalHtml, 'utf-8');
        console.log(`✅ HTML: ${outputBase}.html`);
    }
    
    // Generate PDF
    if (format === 'pdf' || format === 'both') {
        let browser;
        try {
            browser = await chromium.launch({ headless: true });
            const page = await browser.newPage();
            
            // Load HTML content
            await page.setContent(finalHtml, { waitUntil: 'networkidle' });
            
            // Wait for fonts and icons
            await page.waitForTimeout(1000);
            
            // Generate PDF
            await page.pdf({
                path: `${outputBase}.pdf`,
                format: 'A4',
                printBackground: true,
                preferCSSPageSize: true,
                displayHeaderFooter: false
            });
            
            console.log(`✅ PDF: ${outputBase}.pdf`);
        } finally {
            if (browser) await browser.close();
        }
    }
}

async function generateDataRoomIndex(outputDir, builtDocs) {
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Room | FarmSense Investor Materials</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-200 min-h-screen">
    <div class="max-w-5xl mx-auto px-6 py-20">
        <!-- Header -->
        <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
                <span class="text-emerald-400 font-bold text-xs uppercase tracking-widest">Strategic Capital Portal</span>
            </div>
            <h1 class="text-5xl font-black text-white tracking-tight mb-4">Investor Data Room</h1>
            <p class="text-slate-400 max-w-xl mx-auto">Confidential materials for cleared partners evaluating FarmSense Seed Round A-1.</p>
        </div>
        
        <!-- Documents Grid -->
        <div class="grid gap-4">
            ${builtDocs.map(doc => `
            <a href="${doc.id}.html" class="group bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-6 transition-all hover:bg-slate-900">
                <div class="flex items-start gap-5">
                    <div class="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <i data-lucide="${doc.icon || 'file-text'}" class="w-7 h-7 text-emerald-400"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">${doc.title}</h3>
                            <span class="text-xs font-bold text-slate-500 uppercase">${doc.classification}</span>
                        </div>
                        <p class="text-slate-400 mb-4">${doc.subtitle}</p>
                        <div class="flex items-center gap-4 text-sm">
                            <span class="text-emerald-400 font-medium flex items-center gap-1">
                                <i data-lucide="file-text" class="w-4 h-4"></i> View HTML
                            </span>
                            <span class="text-slate-500">|</span>
                            <a href="${doc.id}.pdf" class="text-slate-400 hover:text-white flex items-center gap-1 transition-colors" onclick="event.stopPropagation()">
                                <i data-lucide="download" class="w-4 h-4"></i> Download PDF
                            </a>
                        </div>
                    </div>
                </div>
            </a>
            `).join('')}
        </div>
        
        <!-- Footer -->
        <div class="mt-16 pt-8 border-t border-white/5 text-center">
            <div class="flex items-center justify-center gap-3 mb-4">
                <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <i data-lucide="sprout" class="w-5 h-5 text-slate-950"></i>
                </div>
                <span class="text-white font-bold">FarmSense</span>
            </div>
            <p class="text-slate-600 text-sm">Generated ${date}</p>
            <p class="text-slate-700 text-xs mt-2">CONFIDENTIAL — Distribution limited to cleared partners</p>
        </div>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>`;
    
    await fs.writeFile(path.join(outputDir, 'index.html'), indexHtml, 'utf-8');
    console.log(`✅ Data Room Index: ${path.join(outputDir, 'index.html')}`);
}

async function main() {
    console.log('🌱 FarmSense Investor Materials Generator\n');
    
    const baseTemplate = await loadTemplate('base');
    const outputDir = path.join(__dirname, 'dist');
    
    // Filter documents if specific one requested
    const docsToBuild = specificDoc 
        ? documents.filter(d => d.id === specificDoc)
        : documents;
    
    if (docsToBuild.length === 0) {
        console.error(`❌ Document "${specificDoc}" not found`);
        console.log('Available:', documents.map(d => d.id).join(', '));
        process.exit(1);
    }
    
    // Generate each document
    for (const doc of docsToBuild) {
        console.log(`\n📄 Building: ${doc.title}`);
        await generateDocument(doc, baseTemplate, outputDir);
    }
    
    // Generate data room index (HTML only)
    if (format === 'html' || format === 'both') {
        console.log('\n📁 Generating Data Room Index...');
        await generateDataRoomIndex(outputDir, documents);
    }
    
    console.log('\n✨ Done! Output directory:', outputDir);
    
    // Watch mode
    if (watchMode) {
        console.log('\n👁️  Watch mode enabled. Press Ctrl+C to exit.');
        const { default: chokidar } = await import('chokidar');
        
        chokidar.watch([
            path.join(__dirname, 'templates/*.html'),
            path.join(__dirname, '../docs/**/*.md'),
            path.join(__dirname, '../FarmSense/Investor_Materials/**/*.md')
        ]).on('change', async (filePath) => {
            console.log(`\n🔄 ${filePath} changed, rebuilding...`);
            for (const doc of docsToBuild) {
                await generateDocument(doc, baseTemplate, outputDir);
            }
            await generateDataRoomIndex(outputDir, documents);
            console.log('✨ Rebuild complete');
        });
    }
}

main().catch(err => {
    console.error('❌ Build failed:', err);
    process.exit(1);
});