import { mkdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

await mkdir("release", { recursive: true });
const archive = path.resolve("release/yihonal-trading-yegara.zip");
// Python's standard library includes hidden files and puts index.html at the root.
execFileSync("python3", ["-c", `
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import sys, stat
root = Path('out')
with ZipFile(sys.argv[1], 'w', ZIP_DEFLATED) as archive:
    for file in sorted(root.rglob('*')):
        if file.is_file():
            archive.write(file, file.relative_to(root).as_posix())
            archive.getinfo(file.relative_to(root).as_posix()).external_attr = (stat.S_IFREG | 0o644) << 16
`, archive], { stdio: "inherit" });
console.log(`Yegara upload archive: ${archive}`);
