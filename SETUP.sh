#!/bin/bash
# ATS Scanner Multi-Format Support - Quick Setup Script
# Run this to get everything set up in 3 commands

echo "=================================="
echo "ATS Scanner - Multi-Format Setup"
echo "=================================="
echo ""

# Command 1: Install Dependencies
echo "📦 Step 1: Installing dependencies..."
echo "   Command: bun install"
echo ""
echo "   This will install:"
echo "   • pdfjs-dist@^4.4.159 (PDF parsing)"
echo "   • mammoth@^1.8.0 (DOCX parsing)"
echo "   • All other dependencies"
echo ""
echo "   Run this now:"
echo "   cd pathfinderAi"
echo "   bun install"
echo ""
echo "   ⏱️  Expected time: 2-5 minutes"
echo ""

# Command 2: Verify Installation
echo "✅ Step 2: Verify installation (after bun install completes)"
echo "   Command: bun list | grep -E 'pdfjs-dist|mammoth'"
echo ""
echo "   Expected output:"
echo "   ├─ mammoth@^1.8.0"
echo "   ├─ pdfjs-dist@^4.4.159"
echo ""

# Command 3: Start Development Server
echo "🚀 Step 3: Start development server"
echo "   Command: bun run dev"
echo ""
echo "   This will start the app on http://localhost:5173"
echo "   ⏱️  Expected time: 10-30 seconds"
echo ""

# Final Steps
echo "🎯 After app starts:"
echo "   1. Open http://localhost:5173 in your browser"
echo "   2. Navigate to ATS Scanner"
echo "   3. Try uploading:"
echo "      • A PDF resume"
echo "      • A DOCX resume"
echo "      • A TXT resume"
echo "   4. Verify all three formats work"
echo ""

echo "📚 Documentation:"
echo "   • QUICK_START.md - 5 minute overview"
echo "   • SETUP_CHECKLIST.md - Detailed testing checklist"
echo "   • INSTALL_DEPENDENCIES.md - Installation help"
echo "   • MULTI_FORMAT_SETUP.md - Full technical guide"
echo ""

echo "=================================="
echo "Ready? Run these commands:"
echo "=================================="
echo ""
echo "cd pathfinderAi"
echo "bun install"
echo "bun run dev"
echo ""
echo "=================================="
