# True PDF Compression: Implementation Notes

## Implemented on this feature branch

- Added the official `@wasm-zoo/ghostscript@0.7.2` browser WebAssembly package.
- Added a Ghostscript-backed `compressPdf()` implementation that runs in the browser's isolated Worker/MEMFS runtime.
- Added Light (300 DPI), Balanced (150 DPI), and Strong (96 DPI) presets for embedded color and grayscale images.
- Added output signature and page-count validation. The UI offers the compressed file only when it is smaller; otherwise it downloads the original.
- Added the AGPL-3.0 project license and a post-install script that copies the Ghostscript and bundled third-party notices into `public/licenses/ghostscript/`.

## Privacy and deployment

The PDF bytes are passed to the browser WebAssembly runtime and are not uploaded to an application server. The Ghostscript runtime is bundled into the application build by the package's static asset references. The package does not require SharedArrayBuffer or cross-origin isolation.

The Ghostscript binary is AGPL-3.0-or-later. The package metadata uses `SEE LICENSE IN LICENSE`; its Ghostscript-specific license and third-party notices are copied from the installed package during `npm install`. The repository's own source is now licensed under AGPL-3.0. Review these obligations before distributing or deploying modified versions.

## Important document-fidelity caveat

Ghostscript rewrites the PDF. Even when page count remains unchanged, forms, annotations, bookmarks, layers, accessibility metadata, embedded files, and digital signatures may be altered or removed. Stronger presets downsample images and reduce their visual detail. Keep the original file and do not use a compressed copy as the authoritative digitally signed document.

## Verification still required before merge

This environment can write repository changes but cannot run the project's local npm build or browser test corpus. Before merging, run:

```bash
npm ci
npm run build
npm audit signatures
```

Then manually test text-only, scanned, mixed-content, rotated, form/annotation, encrypted, and digitally signed PDFs in supported browsers. Confirm the output opens, page count is unchanged, text remains selectable where expected, and the size comparison is correct.

## Branch safety

All implementation changes are on `feat/true-pdf-compression`. The `main` branch has not been modified or merged.
