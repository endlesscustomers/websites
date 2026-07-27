#!/usr/bin/env bash
# serve.command
# Double-click this file to preview the site with all links working.
# It starts a local web server that serves this folder, so absolute links
# like /how-we-help/coaching-program/pricing resolve correctly.
# To stop the server: close this Terminal window, or press Control-C.

# Capture the site folder (this file's folder) BEFORE changing directory.
SITE="$(cd "$(dirname "$0")" && pwd)"
PORT=8000

# Run from a neutral folder. macOS can block reading the current directory
# when it lives in Documents (especially with iCloud sync), which crashes
# the server at startup. Serving with an explicit --directory avoids that.
cd "$HOME" 2>/dev/null || cd /

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Endless Customers — local preview"
echo "  Serving:  $SITE"
echo "  At:       http://localhost:$PORT/"
echo ""
echo "  Coaching overview:"
echo "  http://localhost:$PORT/how-we-help/coaching-program/"
echo ""
echo "  Leave this window open while you preview."
echo "  Stop the server with Control-C or by closing this window."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Open the coaching overview in your default browser after a short delay
( sleep 1.5; open "http://localhost:$PORT/how-we-help/coaching-program/" ) &

# Serve the site folder explicitly (works even when the cwd is restricted)
python3 -m http.server "$PORT" --directory "$SITE"
