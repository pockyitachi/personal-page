# Portfolio — Two Interactive Concepts

Built from the design brief in the linked spec. Because the original Feishu
document was access-protected, this repo implements the two website briefs the
spec contained, as static, framework-free sites with **placeholder images you
can swap out**.

| Concept | Folder | Signature interaction |
| --- | --- | --- |
| **ATELIER** — editorial fashion portfolio | [`fashion/`](fashion/) | Hero portrait is grayscale until your cursor *paints* colour onto it (soft radial brush reveal). |
| **SIVERT HØYEM** — cinematic music artist | [`music/`](music/) | Fullscreen image hero, parallax drift on scroll, slow cinematic reveals, lazy video embed. |

The root [`index.html`](index.html) is a landing page that links to both.

## Tech

- Plain **HTML + CSS + vanilla JavaScript**. No frameworks, no build step.
- Semantic markup, responsive (desktop / tablet / mobile), `prefers-reduced-motion` respected.
- Each site is fully self-contained in its folder (`index.html`, `style.css`, `script.js`, `images/`).

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Push this branch and open **Settings → Pages**.
2. Set **Source** to *Deploy from a branch*, pick this branch, folder `/ (root)`.
3. The site publishes at `https://<username>.github.io/personal-page/`.

A `.nojekyll` file is included so all folders are served as-is.

## Replacing the placeholder images

Every image is a generated placeholder JPG. Drop your real photos into the
`images/` folders using the **same filenames** and the layouts pick them up
automatically:

**`fashion/images/`** — `hero-bw.jpg`, `hero-color.jpg` (same subject; the brush
reveal stacks them), `about-1..4.jpg`, `creation-1..4.jpg`, `circle-portrait.jpg`,
`footer-portrait.jpg`.

> For the hero brush reveal, `hero-bw.jpg` and `hero-color.jpg` should be the
> **same photo** — one grayscale, one colour, identical framing — ideally a
> PNG/transparent cut-out so the figure floats over the giant background word.

**`music/images/`** — `hero.jpg` (large cinematic portrait), `album-1..3.jpg`,
`gallery-1..6.jpg`, `video-poster.jpg`.

In `music/index.html`, set the real video on the `data-embed` attribute of
`#videoFrame`.

To regenerate the placeholders: `python3 tools/gen_placeholders.py` (needs Pillow).
