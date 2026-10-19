#!/usr/bin/env bash
set -u

cd "$(dirname "$0")"
PORT="${PORT:-4173}"

if ! command -v python3 >/dev/null 2>&1; then
  printf '%s\n' "Python 3 was not found."
  printf '%s\n' "Open index.html directly in a browser instead."
  exit 1
fi

printf '%s\n' "Starting the demo at http://127.0.0.1:${PORT}"
python3 -m http.server "${PORT}" --bind 127.0.0.1 &
SERVER_PID=$!

trap 'kill "${SERVER_PID}" 2>/dev/null || true' EXIT INT TERM
sleep 1

if command -v open >/dev/null 2>&1; then
  open "http://127.0.0.1:${PORT}"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "http://127.0.0.1:${PORT}"
else
  printf '%s\n' "Open http://127.0.0.1:${PORT} in your browser."
fi

printf '%s\n' "Press Ctrl+C to stop the local server."
wait "${SERVER_PID}"
