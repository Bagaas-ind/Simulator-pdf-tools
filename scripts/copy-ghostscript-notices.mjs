import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "node_modules", "@wasm-zoo", "ghostscript");
const destination = path.join(root, "public", "licenses", "ghostscript");

await mkdir(destination, { recursive: true });
await cp(
  path.join(source, "LICENSE-Ghostscript.txt"),
  path.join(destination, "LICENSE-Ghostscript.txt")
);
await cp(
  path.join(source, "THIRD-PARTY-LICENSES"),
  path.join(destination, "THIRD-PARTY-LICENSES"),
  { recursive: true }
);
console.log("Ghostscript and bundled third-party notices copied to public/licenses/ghostscript.");
