# File Parser Service - Testing Guide

## Overview
This document provides testing instructions for the updated file parser service that handles PDF, DOCX, and TXT files.

## Changes Made

### 1. Fixed PDF.js Worker Issue
**Problem**: PDF.js was trying to load the worker from a CDN (`cdnjs.cloudflare.com`), which was causing a 404 error.

**Solution**: 
- Updated `fileParserService.ts` to use a local worker file instead of CDN
- Modified the worker configuration to use `import('pdfjs-dist/build/pdf.worker.mjs?url')`
- Added Vite configuration to properly handle PDF.js bundling

### 2. Enhanced Error Handling
- Added better error messages for different failure scenarios
- Improved PDF parsing with additional configuration options:
  - `useWorkerFetch: false` - Prevents fetch-related errors
  - `isEvalSupported: false` - Improves compatibility
  - `useSystemFonts: true` - Better text extraction

### 3. Updated Vite Configuration
Added optimization settings in `vite.config.ts`:
- Excluded `pdfjs-dist` from dependency optimization
- Created manual chunk for PDF.js to improve loading

## Files Modified

1. **src/services/fileParserService.ts**
   - Fixed PDF.js worker initialization
   - Enhanced error handling for all file types
   - Better text extraction for PDF files

2. **vite.config.ts**
   - Added `optimizeDeps.exclude` for pdfjs-dist
   - Added build configuration with manual chunks

## Testing Instructions

### Test 1: PDF File Upload
1. Navigate to ATS Scanner page
2. Upload a PDF resume
3. Expected: File should parse successfully without worker errors
4. Check console for any errors

### Test 2: DOCX File Upload
1. Navigate to ATS Scanner page
2. Upload a DOCX resume
3. Expected: File should parse successfully
4. Verify extracted text is accurate

### Test 3: TXT File Upload
1. Navigate to ATS Scanner page
2. Upload a TXT resume
3. Expected: File should parse successfully
4. Verify text is correctly displayed

### Test 4: PDF Download (Resume Editor)
1. Navigate to Resume Editor
2. Make edits to your resume
3. Click "Download as PDF"
4. Expected: PDF should download successfully
5. Open and verify PDF content

### Test 5: Error Scenarios
Test these edge cases:
- Upload empty file → Should show "File is empty" error
- Upload file > 50MB → Should show size limit error
- Upload corrupted file → Should show appropriate error message
- Upload unsupported format → Should show format error

## Verification Checklist

- [ ] PDF files parse without "Setting up fake worker" warning
- [ ] PDF worker loads from local bundle, not CDN
- [ ] DOCX files extract text correctly
- [ ] TXT files are read properly
- [ ] File size validation works
- [ ] Format validation works
- [ ] Error messages are user-friendly
- [ ] PDF download works in Resume Editor
- [ ] No console errors during file upload
- [ ] ATS analysis completes successfully after parsing

## Common Issues and Solutions

### Issue: "Failed to fetch dynamically imported module"
**Solution**: Clear browser cache and rebuild:
```cmd
npm run build
npm run dev
```

### Issue: Worker still trying to load from CDN
**Solution**: 
1. Stop the dev server
2. Delete `node_modules/.vite` folder
3. Restart dev server

### Issue: PDF parsing fails with no error
**Solution**: 
- Check if PDF is password-protected
- Verify PDF is not image-based (scanned document)
- Try with a different PDF file

## Browser Console Commands for Testing

```javascript
// Test file size validation
const largeFile = new File([new ArrayBuffer(51 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });

// Test format validation
const invalidFile = new File(['test'], 'test.xyz', { type: 'text/plain' });

// Check PDF.js worker status
console.log('PDF.js version:', window.pdfjsLib?.version);
```

## Next Steps After Testing

1. If all tests pass:
   - Commit changes
   - Deploy to production

2. If tests fail:
   - Check browser console for errors
   - Verify file format and size
   - Check network tab for failed requests
   - Review error messages in fileParserService.ts

## Performance Metrics

Expected performance:
- PDF (1-5 pages): < 2 seconds
- PDF (5-10 pages): 2-5 seconds
- DOCX: < 1 second
- TXT: < 0.5 seconds

## Support

If issues persist:
1. Check that pdfjs-dist version is ^4.4.159
2. Verify mammoth is installed (^1.8.0)
3. Ensure Vite version is 4.5.3
4. Clear all caches and reinstall dependencies
