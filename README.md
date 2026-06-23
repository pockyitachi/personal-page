# Linqiang Guo — Personal Homepage

Personal site for **Linqiang Guo**, a Software Engineering PhD researcher at
Concordia University (AI-driven mobile automation, LLM agents, multimodal VLM
pipelines). Built as a static, framework-free site (HTML + CSS + vanilla JS).

The root [`index.html`](index.html) is the main homepage, generated from the
résumé in [`assets/files/`](assets/files/). It includes:

- **Hero** with role, summary, and CV download
- **About** + **Education** timeline
- **Skills** (languages, AI/ML frameworks, backend & platforms)
- **Publications** (AAAI 2026, ICSE 2025, COLM 2025 Workshop, and more)
- **Experience** timeline (SPEAR Lab, Concordia TA, Walmart Global Tech, CPECC)
- **Projects** and **Contact**
- Light/dark theme toggle (remembers your choice), responsive, smooth scroll reveals

## Design experiments

Two earlier interactive concept builds also live in the repo and are linked from
the footer:

| Concept | Folder | Signature interaction |
| --- | --- | --- |
| **ATELIER** — fashion editorial | [`fashion/`](fashion/) | Hero portrait is grayscale until the cursor *paints* colour onto it. |
| **SIVERT HØYEM** — cinematic artist | [`music/`](music/) | Fullscreen parallax hero, slow cinematic reveals, lazy video embed. |

## Run locally

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. **Settings → Pages → Source:** *Deploy from a branch*, branch `main`, folder `/ (root)`.
2. Publishes at `https://pockyitachi.github.io/personal-page/`.
3. For a root URL (`https://pockyitachi.github.io`), rename the repo to
   `pockyitachi.github.io`.

A `.nojekyll` file is included so all folders are served as-is.

## Updating content

- Replace the portrait at [`assets/img/portrait.svg`](assets/img/portrait.svg)
  with a real photo (keep the filename, or update the `<img>` in `index.html`).
- Swap the résumé at `assets/files/Linqiang_Guo_Resume_2026.pdf`.
- All text content lives directly in `index.html`.
