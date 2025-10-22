# Installing PDF and DOCX File Parser Dependencies

This document provides instructions for installing the required dependencies for PDF and DOCX file parsing support in the ATS Scanner.

## Prerequisites

Ensure you have the following installed:
- Node.js (v18+)
- Bun package manager

## Required Dependencies

The application now requires two additional libraries for proper file format support:

### 1. **pdfjs-dist** (PDF parsing)
   - Purpose: Extract text from PDF files
   - Version: ^4.4.159
   - Repository: https://github.com/mozilla/pdf.js

### 2. **mammoth** (DOCX parsing)
   - Purpose: Extract text from Word documents (.docx)
   - Version: ^1.8.0
   - Repository: https://github.com/mwilliamson/mammoth.js

## Installation Steps

### Using Bun (Recommended)

```bash
# Navigate to the project root
cd pathfinderAi

# Install the new dependencies
bun install

# Or specifically install the new packages
bun add pdfjs-dist@^4.4.159 mammoth@^1.8.0
```

### Using npm

```bash
# Navigate to the project root
cd pathfinderAi

# Install all dependencies
npm install

# Or specifically install the new packages
npm install pdfjs-dist@^4.4.159 mammoth@^1.8.0
```

### Using yarn

```bash
# Navigate to the project root
cd pathfinderAi

# Install all dependencies
yarn install

# Or specifically install the new packages
yarn add pdfjs-dist@^4.4.159 mammoth@^1.8.0
```

## Verification

After installation, verify that the dependencies are installed correctly:

```bash
# Check if packages are in node_modules
ls node_modules | grep -E "pdfjs-dist|mammoth"

# Or check package.json
cat package.json | grep -A 2 "pdfjs-dist\|mammoth"
```

## File Format Support

After installing these dependencies, the application will support:

### ✅ PDF Files (.pdf)
- Uses **pdfjs-dist** to extract text
- Supports encrypted PDFs with proper handling
- Extracts text from all pages
- Handles compressed streams and encoding

### ✅ DOCX Files (.docx)
- Uses **mammoth** to extract text
- Supports modern Office Open XML format
- Preserves text structure and formatting

### ✅ Text Files (.txt)
- Native support (no additional dependencies needed)
- Handles various text encodings

## Troubleshooting

### "Cannot find module 'pdfjs-dist'" Error

This error occurs when the dependency is not installed. Solution:

```bash
bun install pdfjs-dist
```

### "Cannot find module 'mammoth'" Error

This error occurs when the dependency is not installed. Solution:

```bash
bun install mammoth
```

### Large File Processing

If processing large files (>10MB) is slow:
- Consider increasing Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096`
- Current limit is set to 50MB per file

### PDF Text Extraction Issues

If PDF text extraction returns garbage or empty results:
- The PDF may be image-based (scanned document)
- Consider using OCR tools or converting to a text-readable format
- Try uploading as a different format (DOCX or TXT)

### DOCX Processing Errors

If DOCX files fail to process:
- Ensure the file is in valid DOCX format (compressed ZIP with XML)
- Try opening and re-saving in Microsoft Word
- Convert to PDF or TXT as alternative

## Development Notes

### Dynamic Imports

The file parser service uses dynamic imports for these dependencies to reduce bundle size in production:

```typescript
// Lazy load when needed
const pdfjsModule = await import('pdfjs-dist');
const mammothModule = await import('mammoth');
```

### PDF.js Worker

PDF.js requires a worker file for processing. The service automatically loads it from CDN:

```typescript
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
```

### Text Cleaning

All extracted text undergoes cleaning to:
- Remove control characters
- Normalize line endings
- Fix encoding artifacts
- Remove excessive whitespace

## Performance Considerations

- **PDF Processing**: ~500-1000ms per page (varies by complexity)
- **DOCX Processing**: ~100-500ms depending on file size
- **TXT Processing**: ~50ms typically
- **Max File Size**: 50MB
- **Text Truncation**: Service truncates to 3000 characters for analysis to optimize API calls

## Next Steps

1. Install dependencies: `bun install`
2. Test with sample files:
   - Upload a PDF resume
   - Upload a DOCX resume
   - Upload a TXT resume
3. Verify all three formats work in the ATS Scanner
4. Run the application: `bun run dev`

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify file format and size
3. Try a different file format
4. Check that dependencies are properly installed
5. Restart the development server
