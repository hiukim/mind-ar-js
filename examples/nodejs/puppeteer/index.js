/**
 * A nodejs .mind generator using puppeteer.
 * This allows to skip the 'canvas' npm dependency which has a tendency to fail to install on some systems.
 *
 * This implementation runs a vite dev server, launches puppeteer to mimics the clicks for a file upload and downloads the .mind file.
 * Uploaded file: examples/image-tracking/assets/pictarize-example/pictarize.jpg
 * Downloaded file: targets.mind
 */

import { fileURLToPath } from "url";
import { createServer } from "vite";

import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

console.time('execution time');

/**
 * Vite dev server will serve from here
 */
const viteRootDir = fileURLToPath(new URL("../../../", import.meta.url));

const server = await createServer({
  configFile: path.join(viteRootDir, "vite.config.dev.js"),
  root: viteRootDir,
});
await server.listen();

console.log("- Vite started on port", server.config.server.port);

/**
 * File we're going to upload
 */
const uploadedFile = path.join(viteRootDir, "examples/image-tracking/assets/pictarize-example/pictarize.jpg");

/**
 * Where to download the .mind file
 */
const downloadPath = path.resolve("./");
const mindFile = path.join(downloadPath, "targets.mind");

/**
 * For convenience, delete the .mind file if it already exists
 */
if (fs.existsSync(mindFile)) {
  /**
   * Danger danger. Make sure you're not deleting anything important.
   */
  //fs.unlinkSync(mindFile);
}

const browser = await puppeteer.launch({
  headless: "new",
});
console.log("- Puppeteer started");

/**
 * Navigate to examples/image-tracking/compile.html page
 */
const page = await browser.newPage();
page.goto(
  `http://localhost:${server.config.server.port}/examples/image-tracking/compile.html`
);
console.log("- Page loaded");

/**
 * click on the upload button and upload the file
 */
await page.waitForSelector("input[type=file]");
const input = await page.$("input[type=file]");
await input.uploadFile(uploadedFile);
console.log("- Uploading file", uploadedFile);

const buttonStart = await page.$("#startButton");
await buttonStart.click();

/**
 * Wait for the #progress to display text "progress: 100.00%"
 */
await page.waitForFunction(
  'document.querySelector("#progress").innerText.includes("progress: 100.00%")'
);

console.log(
  "- .mind complete, downloading to",
  path.join(downloadPath, "targets.mind")
);

/**
 * Tell pupeeteer to allow downloads and where to download to
 */
const client = await page.target().createCDPSession();
await client.send("Page.setDownloadBehavior", {
  behavior: "allow",
  downloadPath: downloadPath,
});

/**
 * Click on the download button
 */
const buttonDownload = await page.$("#downloadButton");
await buttonDownload.click();

/**
 * Wait until download is complete
 */
await waitForDownload();

console.log("- Done");

browser.close();
server.close();

console.timeEnd('execution time');
/**
 * For some reason, node does not exit the process without this empty console.log.
 */
console.log("");

/**
 * Check mindFile has finished downloading
 */
async function waitForDownload() {
  if (!fs.existsSync(mindFile)) {
    await new Promise((resolve) => setTimeout(() => resolve(), 1));
    return await waitForDownload();
  }
}
