#!/bin/bash

set -e;

rm -rf ./static;
npx tsc;
find ./static -type f -exec sed -i "s/from \"\(.\+\)\"/from \"\1.js\"/i" {} \;
echo "compiled successfully";