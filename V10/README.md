# Verrion Systems V10 · V8 with the floor photographs brought to life, quietly

Built on 29 October 2026 at Dawid's request to "bring some more life into the photos but keep it sufficiently toned down to preserve the professional feel". Codex is working on V9 separately. V10 does not build on V9 and does not touch it.

**Status: proposed for release.** The release pull request points the Pages workflow at `V10/site`. Dawid's merge of it is the approval, and V8 stays live until then. V10 starts from `V8/site` as released on 22 October 2026, and `V8/site` is retained unchanged as the previous source.

V10 changes no wording, layout or records. The only addition is a short clip over three of the floor photographs.

## Run it

```bash
cd V10/site && npm ci && npm run build:pages && npm test
node ~/.claude/skills/scroll-craft/scripts/serve.mjs --root root-dist --port 4560
```

Open <http://localhost:4560/>. The browser checks in `V10/site/lab/checks/` expect this port. A local, untracked `.claude/launch.json` has a `v10-site` entry for the same server.

## What V10 does

The three photographs in the sections that scroll normally each get a five-second clip of the same scene:

| Section | Photograph | What moves |
|---|---|---|
| Affected material waits. | The paused packaging line | Almost nothing. The line stays stopped, the orange status light at the back pulses, and the coat at the right edge shifts slightly. |
| The action leaves the record… | The line lead at the laptop | He types, glances at the screen and keeps his slight smile. A green indicator light blinks behind him. |
| A closer look at the procedure. | Two colleagues and a tablet | She explains with one small hand gesture, and he listens. The tablet and its screen stay as they are. |

How it behaves:

- A clip starts loading only when its photograph is within half a screen of view (`preload="none"`; 205–500 KB each). Once loaded, it takes the photograph's place on its first frame, still and usually before the photograph is on screen.
- It plays **once**, when the photograph is mostly in view (60%). Over its last 0.8 s the motion slows to a stop, and the clip **rests on its last frame**. It never hands back to the photograph while anyone is looking, so there is no cut or cross-fade at the end.
- Once the photograph has left the screen, the clip rewinds to its first frame out of sight. It plays again when the photograph comes back into view.
- Each clip is cut to exactly the 16:9 frame the page shows. Its tone is matched to the photograph, and it gets the same CSS tone as the photograph, including the held line's muted colour.
- Each clip lasts five seconds and then stops, so no motion runs for longer than five seconds (WCAG 2.2.2).
- No sound, no controls. The clip is hidden from screen readers, and the photograph keeps its alt text.
- **Reduced motion:** no clip loads or plays. Turning reduced motion on mid-clip stops the clip at once and shows the photograph.
- **Save-Data:** no clip loads.
- **Print:** unchanged. The column photographs are already hidden on paper.

Left still on purpose:

- **The hero.** It is a photograph with the operator cut out and layered over it, with its own scroll depth. Moving the photo underneath would separate her from it.
- **The investigation photograph.** It lights up as the evidence threads draw. A second kind of motion there would compete with the explanation.
- **The closing photograph.** It is about 3:1 and is cropped differently on each screen (4:3 on phones), so no single clip would match its frame.

## How the clips were made

- **Source:** each clip was generated from its photograph's 16:9 crop, which was used as both the first and the last frame. The prompt asked for a locked-off camera, small natural movement and no new people, objects or text. The clips are 720p, 5 s and silent.
- **Ending (revised 29 October 2026):** the first version faded back to the photograph when the clip ended. Generated video doesn't return exactly to the photograph: in the two-colleagues clip her hand ends somewhere else, and every clip renders fine detail differently. So the fade showed two pictures at once, and Dawid found it noticeable. Each clip has been rebuilt:
  - source frames 0–99 play as generated;
  - frames 99–109 are stretched over 20 frames with an ease-out, blended between neighbouring frames, so the motion starts that stretch at normal speed and ends at rest;
  - that gives 120 frames, exactly 5.0 s;
  - each clip's colour is lifted 2–5% per channel, so its first frame matches the photograph's average tone.
- **Web encoding:** H.264 (`yuv420p`, CRF 26, `faststart`) with ffmpeg.
- **Files:** the published clips are `src/assets/{held,capa,sop}-floor.mp4`. The working files stay in `V10/site/lab/motion/`, which is git-ignored: the source crops, raw clips, frame checks, the easing script and an internal note on how the clips were made.

The clips are generated, like the photographs they come from. As with the photographs, do not describe them as real staff, customers or a real facility, and keep their provenance internal.

## Code changes from V8

- `index.html`: a `<video class="band__motion" data-motion=…>` after each of the three `<picture>` elements. A V8 comment's file name was also updated.
- `src/v10.css` (was `v8.css`): the clip layer and its fade. It shares the photographs' filters and is hidden under reduced motion.
- `src/v10.js` (was `v8.js`): the "photo motion" block. One IntersectionObserver loads each clip half a screen early. A second one plays it once when the photo is in view, and rewinds and re-arms it off screen.
- `scripts/artifact-policy.mjs`: the three `.mp4` files join the fixed asset list.
- `src/main.js`, `package.json`, `tests/release.test.mjs`: V8 → V10 names.
- `lab/checks/*`: port 4550 → 4560, plus the new `motion.mjs`.

## Verification (29 October 2026)

- `npm run build:pages` and `npm test`: clean artifact (30 approved assets), 11 of 11 tests pass.
- **Photo motion** (`motion.mjs`, new) passes at 1440 × 900, 390 × 844 and 844 × 390. For each of the three photographs:
  - nothing loads at the top of the page;
  - just below the screen, the clip has loaded and shows its first frame, still;
  - the clip plays in view, and its box matches the photograph's exactly;
  - it rests on its last frame, without handing back to the photograph or replaying in place;
  - it rewinds out of sight, replays after the photograph leaves and returns, and stops off screen.
- The same check confirms no clip loads or plays with reduced motion or Save-Data, and that turning reduced motion on mid-clip stops the clip. No console errors.
- **Production package** (`prod.mjs`): legal pages and legacy links unchanged, 0 console errors, 0 external requests.
- **Keyboard and phone menu** (`functional.mjs`): no failures, no console errors.
- **Phone sweep** (`phone-sweep.mjs`): 99 of 99 sizes pass, the same as V8.
- Looked at in the browser mid-clip: same framing and tone as the still.
- After the ending was revised, the build, tests, photo motion, production package and keyboard checks were all rerun and pass. In the browser, each clip's first frame now matches its photograph's average tone within 1–3 levels (it was 4–6 levels darker). The phone sweep was not rerun because nothing in the layout changed.

Not verified: Safari or iOS (autoplay of muted inline video is expected to work there, but was not tried), a real phone, or a screen reader.

## Release

The release pull request changes `.github/workflows/deploy-pages.yml` from `V8/site` to `V10/site`, updates the root `README.md` and marks `V8/site/README.md` superseded. The V10 site itself is unchanged from the preview merged in VerrionSystems/website#10.

After the merge:

1. Check that the Pages run succeeded for the merge commit.
2. On the live site, check that each of the three column photographs plays its clip once and rests on its last frame. Check this on desktop and on a phone, in portrait and landscape.
3. Check the legacy links and the link preview.

A real iPhone in Safari and a real Android phone are the checks this build could not make.
