import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] || "assets/icons/doodle");
const svgRoot = path.join(root, "svg");
const pngRoot = path.join(root, "png");

const slugify = (value) => value
  .normalize("NFKD")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const categories = (await readdir(svgRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const icons = [];

for (const category of categories) {
  const files = (await readdir(path.join(svgRoot, category)))
    .filter((file) => file.toLowerCase().endsWith(".svg"))
    .sort((a, b) => a.localeCompare(b));

  for (const file of files) {
    const name = path.basename(file, path.extname(file));
    const pngFile = `${name}.png`;
    const pngPath = path.join(pngRoot, category, pngFile);
    let hasPng = false;
    try {
      hasPng = (await stat(pngPath)).isFile();
    } catch {
      hasPng = false;
    }

    icons.push({
      id: `${slugify(category)}/${slugify(name)}`,
      category,
      name,
      svg: `svg/${category}/${file}`,
      png: hasPng ? `png/${category}/${pngFile}` : null,
    });
  }
}

const manifest = {
  name: "IMPACT Doodle Icon Library",
  sourceArchive: "doodle icons (1).zip",
  licenseStatus: "not-included-in-source-archive",
  usageStatus: "local-design-exploration-until-rights-confirmed",
  formats: ["svg", "png", "figma"],
  total: icons.length,
  categories: categories.map((category) => ({
    name: category,
    id: slugify(category),
    count: icons.filter((icon) => icon.category === category).length,
  })),
  icons,
};

await writeFile(
  path.join(root, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(`Wrote ${icons.length} icons across ${categories.length} categories.`);
