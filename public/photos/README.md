# Landing photos

Place landing photos in this directory and reference them from the app as `/photos/<file-name>`.

Expected production asset:

- `hero.jpg` — the couple photo used by the photo header.

Binary image assets are intentionally not committed by this change. Until `hero.jpg` is added, the app falls back to the existing `/wedding-photo.jpg` asset at runtime.

The torn-paper edge asset should live at `public/torn-edge.png`, is referenced by the app as `/torn-edge.png`, and is applied directly as the photo CSS mask.
