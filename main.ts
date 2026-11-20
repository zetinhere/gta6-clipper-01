// gta6-clipper-01 entry (Node 22, standard library only).
//
// The entry is the YouTube video itself: this program only carries VIDEO.json
// from the repository root to /output, where the house reads it and fetches
// the video's views through the YouTube Data API. Nothing this program
// writes about the video is scored.
//
// VIDEO.json holds {"url": "https://www.youtube.com/shorts/<id>"} — the
// address of the public Short cut from Rockstar's GTA VI Trailer 2 in this
// session (the Leonida water chase that ends with a plane buzzing Jason's
// bike), with make.fun's pitch as on-screen text in the clip and the
// bounty's line plus the play code in the video's description.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The placeholder the kit ships with: copied through as-is so the entry
// can be checked locally before the video is uploaded; the gate refuses
// it, as it should, until VIDEO.json names a real video.
const PLACEHOLDER_URL = 'https://www.youtube.com/shorts/<id>';

// Built with new RegExp on a plain string, not a regex literal: Node's
// built-in TypeScript stripping has choked on regex literals holding an
// escaped slash before, and this pattern is full of them.
const YOUTUBE_URL = new RegExp(
  '^https://(www\\.|m\\.)?(youtube\\.com/(shorts/|watch\\?v=)|youtu\\.be/)[A-Za-z0-9_-]{11}([?&#].*)?$',
);

const raw = readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8');
// The gate reads VIDEO.json as an object of at most 16384 bytes.
if (raw.length > 16384) {
  console.error(`VIDEO.json is ${raw.length} bytes, over the gate's 16384 byte cap`);
  process.exit(1);
}
const parsed: unknown = JSON.parse(raw);
if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  console.error('VIDEO.json must be a JSON object with a url field');
  process.exit(1);
}
const url = (parsed as { url?: unknown }).url;
if (typeof url !== 'string') {
  console.error('VIDEO.json must hold a url string');
  process.exit(1);
}
if (url !== PLACEHOLDER_URL && !YOUTUBE_URL.test(url)) {
  console.error(`VIDEO.json url is not a YouTube video address: ${url}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
