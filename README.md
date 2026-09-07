# Pawn Duel ♟️

A casual chess duel: play quick matches against a friendly AI opponent, sharpen
your openings, and practice your endgame — all in the browser, no account, no
internet needed.

**Genre:** board / chess
**Engine:** ImpactJS (MarketJS template) · **Size:** ~2.4 MB · **Runs 100% offline**

## Controls

| Device | Action |
|---|---|
| All devices | Tap / click a piece to select, tap a highlighted square to move |

## Offline modifications

- Platform SDK replaced by a neutral local driver (`game-driver.js`) — a stub
  `window.PokiSDK` is pre-created so the remote SDK script is never fetched;
  loading, gameplay and commercial-break events resolve instantly.
- Obfuscated site-lock removed (a base64-encoded check redirected to a portal
  page); the game now runs from any host, including localhost.
- Google Analytics beacon (`noga.poki.io`) disabled via its own config flag.
- "Powered by MarketJS" string and placeholder ad image removed.
- Vendor branding (title spritesheet, kitty title spritesheet, `<title>`) replaced
  with the original title **Pawn Duel**.

## Run it

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or just run `./serve.sh`.
