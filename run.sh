#!/bin/sh

xset -dpms
xset s off
xset s noblank

unclutter &
chromium-browser http://127.0.0.1 --window-size=800,480 --start-fullscreen --kiosk --incognito --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null
