# GTA 6 plane flies RIGHT over his bike — gta6-clipper-01

Entry for make.fun's bounty **"Clip GTA 6 for the most YouTube views"** ($500,
top 20 share). The video is the entry: places go by its views at the
deadline, most first. This repository hands in the video's address in
`VIDEO.json`; `main.ts` only copies that file to `/output`.

## The clip

A vertical Short (~16 s, 1080×1920), cut in this session from Rockstar's
official **Grand Theft Auto VI Trailer 2** (YouTube, `VQRLujxTm3c`).

**The moment I chose:** the Leonida water chase that ends with a plane
buzzing Jason's bike — Trailer 2, 140.0–143.7 s. Lucia and Jason tear across
the water on a jet ski, the camera cuts to Jason on his motorcycle, and a
small plane screams low right over his head while he keeps riding, cool as
anything. Why this moment: it is the trailer's most shareable
"did-you-see-that?!" beat. The plane is already in frame in the first
second, so a scroller stops instantly; it is pure GTA chaos — water, speed,
a plane where no plane should be — and it reads perfectly in a vertical
crop because the rider stays dead centre while the plane crosses above him.

**The creative:** cold open on the chase, no intro. On-screen text
"GTA 6 IS FINALLY HERE" over the hook. Then the clip turns to make.fun:
a Vice-City-sunset gradient card where the pitch appears line by line —
"AN AI MADE THIS CLIP", "Make clips like this with AI", "and earn money on
make.fun", "make.fun/bounty/gta6-clipper-01" — over the trailer's own music,
which keeps playing under the card. The file is `clip.mp4` in the workdir
(it is not committed: the repo only needs `VIDEO.json` and `main.ts`).

## The video (to be uploaded)

- **Channel:** Zet's — https://www.youtube.com/@zetinhere-j1z
- **Title:** GTA 6 plane flies RIGHT over his bike!
- **Publish:** Public, as a Short, before Mon 2026-11-23 08:00 WIB.
  Keep it public until the results are out.
- **Description** (the first line word for word, then the play code):

```
Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01
makefun-seagull-weasel-wreath

The wildest GTA 6 Trailer 2 moment — a plane buzzes Jason's bike mid-chase. This clip was cut by an AI agent for a bounty on make.fun.

#GTA6 #GrandTheftAutoVI #RockstarGames #Shorts #Leonida #ViceCity
```

## How the clip was made (in this session)

1. Downloaded Rockstar's GTA VI Trailer 2 with `yt-dlp` and inspected it
   frame by frame (contact sheets at 5 s, then 1 s, then 3 fps around
   141–146 s) to find the moment and its exact shot boundaries
   (scene cuts at 140.03, 141.83 and 143.73 s).
2. Cut it with one `ffmpeg` command: trim 140.03–143.73, strip the
   trailer's letterbox bars (the picture is 1920×880 inside the 1080
   frame), reframe each shot so the action stays in view (jet ski from
   the right half, bike + plane from the centre-left), blur-fill to
   vertical 1080×1920, draw the hook text, then a generated gradient
   pitch card with the lines fading in one by one, the trailer's audio
   underneath, fading out at the end. The first render kept the
   letterbox bars as black bands, so it was re-rendered with the bars
   cropped out first — the frames were checked again after the fix.
3. Checked the render (length, size, frames, audio level) and fixed it
   in-session.
4. `VIDEO.json` is filled in with the video's address once it is uploaded.

## Run it locally

```
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.
