#!/bin/sh

# This script helps as workaround to fix a bug related to the NativeScript synchronizatoin.
# It cleans some files and directories in order images, icons, fonts and other changes can work again.

rm -rf hooks
rm -rf platforms
rm -rf node_modules
rm webpack.config.js
rm package-lock.json

npm i

npm typescript@3.4.5
