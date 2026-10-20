# Westwood Baptist Sermon Identification Guide

For the Westwood Baptist Grokbot (and sermon box RAG).

## Channel: @westwoodoly (~258 videos)

### Preferred: Sermon-Only Clips
- Title pattern: `Sermon - [Series] | [Title] | Westwood Baptist Church`
- Duration: typically 28–40 minutes
- Description: `Sermon Only - [Month Day, Year]` + link to full live service (`https://youtube.com/live/...`)
- Clean, focused transcripts ideal for chunking (store `video_id`, `start_sec=0`, `passage_refs`)

### Full Services / Live Streams
- Title pattern: `[Series] | [Title] | Westwood Baptist Church` (no "Sermon -" prefix)
- Often marked "Was Live", duration ~60–90+ minutes (service ~70 min total)
- Structure: Worship music (lyrics projected) → announcements/updates/prayer → scripture reading → sermon (~25–40 min) → closing
- Sermon starts after music portion; detect via transcript markers

### Dates
- Primary: every Sunday (service at 10:30am)
- Parse from sermon-clip description: "Sermon Only - July 12th, 2026" (service date)
- Publish date usually next day
- Specials: Easter, Christmas, mid-week as needed
- Align clips to full services via shared titles or live URL

### Series & Completeness
- Use channel playlists (e.g. Acts: The Church On The Move - 2026, Storyteller, The Language of Praise, Relentless Love, If The Tomb Is Empty, older series back to 2022/2023)
- Enumerate all series playlists for full coverage of hundreds of messages

### Extraction Rules for Full Videos
- Scan auto-transcript for:
  - Pastor greeting / self-ID ("my name is Daniel/Jared/Rob", "good morning church")
  - "If you have your Bibles, turn to [Book chapter]" or similar
  - Series/week introduction
  - Transition from announcements to teaching
- Store: `video_id`, `start_sec` (sermon onset), `end_sec`, speaker (human labels for the four main pastors), series, date, title, `passage_refs`
- Prefer sermon clips when available; fall back to extracted segments from full services

### Pastors
Four main: Jared, Daniel, Rob, Jack Underwood (and others as labeled).

### Bot Instructions
1. Catalog all "Sermon -" videos first.
2. Cross-reference playlists and dates to ensure every Sunday is covered.
3. For missing/older: process full lives with timestamp detection.
4. Persist structured catalog for RAG (matches v1 plan: chunks with video_id, start_sec, passage_refs).
5. Update regularly for new weekly uploads.

This ensures complete, accurate sermon identification beyond title-only filtering.
