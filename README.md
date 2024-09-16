# DevEx App Rating Chrome Extension

## Overview

This is a barebones extension that takes a rating from the user about the current website their on (1-5 stars), and submits it to a PostgreSQL database.

## Basic architecture

- Chrome extension frontend (this repo)
- Node.js API backend (https://github.com/devex-institute/app-rating-backend)
- Deployed to Railway.app
- Database via Tembo.io

## Local install of extension

To test the Chrome extension locally, you manually install the extension locally:

1. Clone this repo to your local machine
2. Open Chrome and navigate to chrome://extensions/
3. Enable `Developer mode` (toggle is at the top-right corner)
4. Clickk `Load unpacked` and select the folder where your files are located
5. The extension should now appear in Chrome’s extension bar, or in the extension overflow
6. Open any website, click the extension, and you should see the UI for the star rating and reason input
