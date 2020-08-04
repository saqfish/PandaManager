
[![badge](https://github.com/saqfish/PandaManager/blob/master/chrome_store/ChromeWebStore_Badge_v2_206x58.png?raw=true)](https://chrome.google.com/webstore/detail/pandamanger/adbflijdhcmghdgjhahgoljbamcdpmka)

This repository is the latest verson of the extension. The chrome store might be a version behind due to google's review process taking too long.

## Building

`npm run build`

You will find an `extension` directory in the root directory. Then follow directions for loading into Chrome.

## Loading into Chrome

Download the current version from the [releases page](https://github.com/saqfish/PandaManager/releases). The archive should be named `extension.zip`.

Go to `chrome://extensions` in Chrome and turn on developer mode. Then load the extracted archive.

## Project structure

- `src`: This folder is the main container of all the code inside your application.
  - `main`: root directory for the main Panda Manager code.
  - `options`: root directory for the main Settings code.
  - `popup`: root directory for the main Popup code.
  - `docs`: root directory for the main documentation code.
  - `background`: root directory for the main background extension code.
  - `misc`: miscellaneous directory.
    - `img`: image asses loaded by webpack
    - `util.js`: general reusable shared code
- And all the other root react-native folders (webpack etc).

All root folders have this structure:

- root : root directory
  - `index.js`: entry code
  - `constants.js`: common values
  - `template.html`: template html file with root
  - `util.js`: reusable shared code
  - `components`: components


