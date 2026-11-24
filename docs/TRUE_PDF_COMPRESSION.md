# True PDF Compression: Implementation Plan

## Current behavior

The current `compressPdf()` implementation in `lib/pdf.ts` loads and saves the document with object streams while clearing selected metadata. It does not recompress embedded images or otherwise perform image downsampling. The compression page already compares the input and output sizes and keeps the original file when the result is not smaller.

## Goals

- Perform actual PDF optimization in the browser; do not upload document bytes to a server.
- Preserve selectable/searchable text, vector graphics, page dimensions, and page order in the default compression mode.
- Show the input size, output size, and actual percentage saved.
- Never replace the original download with a larger output.
- Clearly warn when a stronger mode may rasterize pages or remove interactive PDF features.

## Engine and licensing gate

Ghostscript WebAssembly is a technically credible candidate for image recompression and PDF rewriting. Existing browser integrations expose quality presets and run processing locally, but the Ghostscript distribution is AGPL-3.0 (or requires a commercial license). MuPDF.js also has AGPL-3.0/commercial licensing.

This repository currently has no `LICENSE` file and its README labels the license as "Not Specified". Therefore, do not add or bundle Ghostscript/MuPDF WASM until the repository owner explicitly chooses and documents a compatible project license, or a suitable commercial license is obtained. Do not treat a public GitHub repository as automatically AGPL or MIT licensed.

Candidate references:
- Ghostscript WASM browser integration: https://github.com/laurentmmeyer/ghostscript-pdf-compress.wasm
- Ghoulscript (Ghostscript WASM wrapper; AGPL-3.0): https://github.com/privy-open-source/ghoulscript
- MuPDF.js license and browser support: https://github.com/ArtifexSoftware/mupdf.js

## Proposed staged implementation

1. **License decision (blocking):** choose the repository's license and add the corresponding `LICENSE` file before adding any copyleft engine. Review the full license obligations, including source availability for the deployed web application.
2. **Engine spike:** on this feature branch, test a candidate engine against representative PDFs: text-only, scanned/image-heavy, mixed text and images, rotated pages, forms/annotations, and encrypted files. Measure bundle/WASM size, memory use, processing time, browser compatibility, and output fidelity.
3. **Worker integration:** run the engine in a Web Worker where supported so large files do not freeze the UI. Keep WASM assets same-origin and avoid sending file contents to third-party services.
4. **Compression profiles:** expose clear quality choices only after testing. The default profile must preserve text and vector content. A rasterizing profile, if offered, must be labeled as potentially making text unselectable and removing links/forms/accessibility information.
5. **Validation:** reopen every output with an independent PDF parser, compare page count and dimensions, and test text extraction plus annotations/forms where applicable. If output is invalid, larger, or fails validation, do not offer it as the compressed result.
6. **Release:** update the UI and README with measured behavior, limitations, and third-party notices. Open a pull request for review; do not merge automatically.

## Acceptance criteria

- PDF bytes remain on the user's device during processing.
- Text remains selectable in the default profile on the supported test corpus.
- Page count and page dimensions remain unchanged.
- Invalid/encrypted/unsupported inputs fail with a useful message and never overwrite the source.
- The result is downloaded only when it passes validation and is smaller than the original.
- Third-party licenses and notices are included before deployment.
