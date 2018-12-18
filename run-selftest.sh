#!/bin/bash

chokidar *.js -c "clear && npx babel-node selftest.js"
