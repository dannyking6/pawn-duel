#!/usr/bin/env bash
# Serve this game locally. Games need HTTP; file:// won't work.
PORT="${1:-8000}"
python3 -m http.server "$PORT" --bind 0.0.0.0
