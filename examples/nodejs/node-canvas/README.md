## Example script how to create offline .mind target files
This implementation is using puppeteer instead of node-canvas.
It spins a vite dev server as as defined in the original `vite.config.dev.js`, launches a headless browser and does all the clicking you would normally do in the original `examples/compile.html` to create a target .mind file.