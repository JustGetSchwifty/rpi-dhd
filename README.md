Advanced script compilation for Raspberry Pi official display (800x480). This project is a DHD (dial home device) inspired by Stargate Command application that dials the startgate.

It's written in HTML, CSS and Javascript. It uses XHR calls and backend is in PHP.

You need to have `exec()` function in PHP enabled for full functionality. Project presumes this setup:
 * PIN 29 - top chevron light
 * PIN 28 - top right chevron light
 * PIN 27 - top left chevron light
 * PIN 26 - middle right chevron light
 * PIN 30 - middle left  chevron light
 * PIN 11 - bottom right chevron light
 * PIN 10 - bottom right chevron light
 * PINs 6, 5, 4, 25, 24, 23, 22 and 21 are light strips between chevrons in order from left bottom, through top to right bottom
 
 I use one common ground pin and separate cables for each MOSFET that controls 12V current for each chevron light / light strip.
 
 
 You also need to check, that `activeWorld.txt` has write rights for PHP process (`chmod 777`).
 
 
 This project comes with absolutely no warranties and will probably never be updated. This is a czech scout project for Stargate themed summer camp. 
 
 ---
 
 https://youtu.be/HbhX_xF2MLQ - demonstration of DHD interface
 
 https://youtu.be/yN4xiiyrT70 - demonstration of GPIO interface on "work bench"
