#!/usr/bin/env python3
"""Generate placeholder JPG images for the two portfolio sites.

These are intentionally simple, branded placeholders so the layouts look
polished before real photography is dropped in. Re-run with `python3
tools/gen_placeholders.py` after editing if you want to regenerate them.
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def font(size, bold=True):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def center_text(d, box, text, fnt, fill):
    x0, y0, x1, y1 = box
    bb = d.textbbox((0, 0), text, font=fnt)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    d.text((x0 + (x1 - x0 - tw) / 2 - bb[0],
            y0 + (y1 - y0 - th) / 2 - bb[1]), text, font=fnt, fill=fill)


def vgradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", size)
    px = base.load()
    for y in range(h):
        t = y / max(1, h - 1)
        px_row = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = px_row
    return base


def portrait(size, palette, label, color=True):
    """A stylised editorial 'portrait' placeholder: figure + headwrap/bow."""
    w, h = size
    bg = vgradient(size, palette["bg_top"], palette["bg_bot"])
    d = ImageDraw.Draw(bg, "RGBA")
    cx = w // 2
    skin = palette["skin"]
    hair = palette["hair"]
    cloth = palette["cloth"]
    bow = palette["bow"]

    # shoulders / clothing
    d.ellipse([cx - w * 0.34, h * 0.62, cx + w * 0.34, h * 1.25], fill=cloth)
    # neck
    d.rectangle([cx - w * 0.07, h * 0.5, cx + w * 0.07, h * 0.66], fill=skin)
    # head
    d.ellipse([cx - w * 0.17, h * 0.28, cx + w * 0.17, h * 0.6], fill=skin)
    # hair / headwrap
    d.pieslice([cx - w * 0.19, h * 0.22, cx + w * 0.19, h * 0.5],
               180, 360, fill=hair)
    d.ellipse([cx - w * 0.19, h * 0.24, cx + w * 0.19, h * 0.42], fill=hair)
    # bow on top of head (the key element that should pop in color)
    by = h * 0.2
    d.polygon([(cx - w * 0.16, by), (cx - w * 0.02, by + h * 0.04),
               (cx - w * 0.02, by - h * 0.04)], fill=bow)
    d.polygon([(cx + w * 0.16, by), (cx + w * 0.02, by + h * 0.04),
               (cx + w * 0.02, by - h * 0.04)], fill=bow)
    d.ellipse([cx - w * 0.035, by - h * 0.025, cx + w * 0.035, by + h * 0.025],
              fill=bow)
    img = bg
    if not color:
        img = img.convert("L").convert("RGB")
    d2 = ImageDraw.Draw(img)
    center_text(d2, (0, int(h * 0.88), w, h), label, font(int(h * 0.045)),
                (255, 255, 255))
    return img


def card(size, top, bottom, label, mono=False):
    img = vgradient(size, top, bottom)
    if mono:
        img = img.convert("L").convert("RGB")
    d = ImageDraw.Draw(img, "RGBA")
    w, h = size
    d.rounded_rectangle([w * 0.06, h * 0.06, w * 0.94, h * 0.94],
                        radius=int(min(w, h) * 0.05),
                        outline=(255, 255, 255, 90), width=3)
    center_text(d, (0, 0, w, h), label, font(int(min(w, h) * 0.12)),
                (255, 255, 255))
    return img


def save(img, relpath):
    path = os.path.join(ROOT, relpath)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=86)
    print("wrote", relpath)


# ---------------- Fashion site palettes ----------------
FASHION = {
    "bg_top": (236, 230, 224), "bg_bot": (208, 196, 186),
    "skin": (227, 191, 165), "hair": (60, 50, 46),
    "cloth": (150, 120, 140), "bow": (214, 122, 150),
}

# Hero (same subject, color + grayscale)
save(portrait((1040, 1320), FASHION, "HERO  PORTRAIT", color=True),
     "fashion/images/hero-color.jpg")
save(portrait((1040, 1320), FASHION, "HERO  PORTRAIT", color=False),
     "fashion/images/hero-bw.jpg")

# About cards (mostly mono with warm tone)
for i, lbl in enumerate(["LOOK 01", "LOOK 02", "LOOK 03", "LOOK 04"], 1):
    save(card((720, 900), (225, 218, 212), (180, 168, 160), lbl, mono=True),
         f"fashion/images/about-{i}.jpg")

# Creations / gallery
for i, lbl in enumerate(["CREATION 01", "CREATION 02", "CREATION 03",
                         "CREATION 04"], 1):
    save(card((900, 1100), (222, 214, 208), (170, 158, 150), lbl, mono=True),
         f"fashion/images/creation-{i}.jpg")

# Circular statement portrait (mono with accent allowed)
save(portrait((1000, 1000), FASHION, "ART  DIRECTION", color=False),
     "fashion/images/circle-portrait.jpg")
# Footer portrait
save(portrait((1000, 1200), FASHION, "DESIGNER", color=False),
     "fashion/images/footer-portrait.jpg")

# ---------------- Music site palettes ----------------
def cinematic(size, label, accent=(40, 70, 58)):
    img = vgradient(size, (18, 26, 22), (6, 10, 8))
    d = ImageDraw.Draw(img, "RGBA")
    w, h = size
    cx = w // 2
    # silhouette figure in nature
    d.ellipse([cx - w * 0.12, h * 0.3, cx + w * 0.12, h * 0.55],
              fill=(10, 14, 12))
    d.rounded_rectangle([cx - w * 0.16, h * 0.5, cx + w * 0.16, h * 1.1],
                        radius=int(w * 0.08), fill=(10, 14, 12))
    # misty light
    d.ellipse([cx - w * 0.5, -h * 0.2, cx + w * 0.5, h * 0.5],
              fill=(accent[0], accent[1], accent[2], 60))
    center_text(d, (0, int(h * 0.9), w, h), label, font(int(h * 0.035)),
                (200, 210, 200))
    return img


save(cinematic((2000, 1300), "HERO  /  ARTIST IN NATURE"),
     "music/images/hero.jpg")
for i, lbl in enumerate(["ALBUM 01", "ALBUM 02", "ALBUM 03"], 1):
    save(cinematic((900, 900), lbl, accent=(60, 50, 40)),
         f"music/images/album-{i}.jpg")
for i, lbl in enumerate(["GALLERY 01", "GALLERY 02", "GALLERY 03",
                         "GALLERY 04", "GALLERY 05", "GALLERY 06"], 1):
    save(cinematic((1000, 1200), lbl), f"music/images/gallery-{i}.jpg")
save(cinematic((1600, 900), "VIDEO  STILL"), "music/images/video-poster.jpg")

print("done")
