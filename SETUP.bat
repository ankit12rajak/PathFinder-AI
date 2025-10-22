@echo off
REM ATS Scanner Multi-Format Support - Quick Setup Script (Windows)
REM Run this to get everything set up in 3 commands

title ATS Scanner - Multi-Format Setup
cls

echo ==================================
echo ATS Scanner - Multi-Format Setup
echo ==================================
echo.

REM Command 1: Navigate and Install Dependencies
echo 1. INSTALL DEPENDENCIES
echo ========================
echo.
echo Command: bun install
echo.
echo This will install:
echo   - pdfjs-dist@4.4.159 (PDF parsing)
echo   - mammoth@1.8.0 (DOCX parsing)
echo   - All other dependencies
echo.
echo TO RUN:
echo   cd pathfinderAi
echo   bun install
echo.
echo Expected time: 2-5 minutes
echo.

REM Command 2: Verify Installation
echo 2. VERIFY INSTALLATION
echo =======================
echo.
echo After bun install completes, run:
echo   bun list
echo.
echo Look for:
echo   - mammoth@1.8.0
echo   - pdfjs-dist@4.4.159
echo.

REM Command 3: Start Development Server
echo 3. START DEVELOPMENT SERVER
echo ============================
echo.
echo Command: bun run dev
echo.
echo This will:
echo   - Start the development server
echo   - App available at http://localhost:5173
echo   - Hot reload enabled
echo.
echo Expected time: 10-30 seconds
echo.

REM Final Steps
echo 4. TEST THE APPLICATION
echo ========================
echo.
echo After the app starts:
echo   1. Open http://localhost:5173 in your browser
echo   2. Navigate to "ATS Scanner"
echo   3. Upload a PDF resume
echo   4. Upload a DOCX resume
echo   5. Upload a TXT resume
echo   6. Verify all three formats work correctly
echo.

REM Documentation
echo DOCUMENTATION
echo ==============
echo.
echo - QUICK_START.md - 5 minute overview
echo - SETUP_CHECKLIST.md - Complete testing checklist
echo - INSTALL_DEPENDENCIES.md - Installation troubleshooting
echo - MULTI_FORMAT_SETUP.md - Technical deep dive
echo - IMPLEMENTATION_SUMMARY.md - Architecture overview
echo.

REM Summary
echo ==================================
echo QUICK START
echo ==================================
echo.
echo Copy and paste these commands:
echo.
echo   cd pathfinderAi
echo   bun install
echo   bun run dev
echo.

echo.
echo Press any key to close this window...
pause >nul
