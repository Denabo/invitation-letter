# Landing photos

Place landing photos in this directory and reference them from the app as `/photos/<file-name>`.

Expected production asset:

- `hero.jpg` — the couple photo used by the photo header.

Binary image assets are intentionally not committed by this change. Until `hero.jpg` is added, the app falls back to the existing `/wedding-photo.jpg` asset at runtime.

The torn-paper edge asset should live at `public/torn-edge.svg`, is referenced by the app as `/torn-edge.svg`, and is overlaid across the bottom of the hero photo. Tune its size in `src/index.css` via `--hero-torn-edge-height`, `--hero-torn-edge-overlap`, and `--hero-torn-edge-width`.
