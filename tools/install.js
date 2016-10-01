// -----------------------------------------------------------
// version 0.0.1
// -----------------------------------------------------------
"use strict";

var debugging = false;

var fs = require('fs');
var cp = require('child_process');
var path = require('path');

var webSharedPath = '../web/src/x-shared/';
var nativescriptSharedPath = '../nativescript/app/x-shared/';
var sharedAppPath = '../x-shared/';

console.log("Configuring...");

// remove previous symlinks if they exist
try {
  if (fs.existsSync(resolve(nativescriptSharedPath))) {
    fs.unlinkSync(resolve(nativescriptSharedPath));
  }

  if (fs.existsSync(resolve(webSharedPath))) {
    fs.unlinkSync(resolve(webSharedPath));
  }
} catch (err) {
}

// We need to create a symlink
try {
  createSymLink();
} catch (err) {
  if (debugging) {
    console.log("Symlink error: ", err);
  }
}

displayFinalHelp();

if (!fs.existsSync(resolve(nativescriptSharedPath))) {
  console.log("We were unable to create a symlink  - from -");
  console.log("  ", resolve(sharedAppPath), "    - to - ");
  console.log("  ", resolve(nativescriptSharedPath));
  console.log("If you don't create this symlink, you will have to manually copy the code each time you change it.");
}

if (!fs.existsSync(resolve(webSharedPath))) {
  console.log("We were unable to create a symlink  - from -");
  console.log("  ", resolve(sharedAppPath), "    - to - ");
  console.log("  ", resolve(webSharedPath));
  console.log("If you don't create this symlink, you will have to manually copy the code each time you change it.");
}

return 0;


/**
 * Create Symlink
 */
function createSymLink() {
  if (debugging) {
    console.log("Attempting to Symlink", sharedAppPath, nativescriptSharedPath);
  }
  fs.symlinkSync(resolve(sharedAppPath), resolve(nativescriptSharedPath), 'junction');

  if (debugging) {
    console.log("Attempting to Symlink", sharedAppPath, webSharedPath);
  }
  fs.symlinkSync(resolve(sharedAppPath), resolve(webSharedPath), 'junction');
}

/**
 * Display final help screen!
 */
function displayFinalHelp() {
  console.log("------------------------ Angular Cross Platform Starter is Ready. ----------------------------");
  console.log("");
  console.log("Run your web app with:");
  console.log("  npm start");
  console.log("");
  console.log("Run your Mobile app via NativeScript with:");
  console.log("  iOS:     npm run start.ios");
  console.log("  Android: npm run start.android");
  console.log("");
  console.log("-----------------------------------------------------------------------------------------");
  console.log("");
}

function splitPath(v) {
  var x;
  if (v.indexOf('/') !== -1) {
    x = v.split('/');
  } else {
    x = v.split("\\");
  }
  return x;
}

function resolve(v) {
  var cwdPath = splitPath(process.argv[1]);
  // Kill the Script name
  cwdPath.length = cwdPath.length - 1;

  var resolvePath = splitPath(v);

  // Eliminate a trailing slash/backslash
  if (cwdPath[cwdPath.length - 1] === "") { cwdPath.pop(); }

  if (v[0] === '/' || v[0] === "\\") { cwdPath = []; }
  for (var i = 0; i < resolvePath.length; i++) {
    if (resolvePath[i] === '.' || resolvePath[i] === "") { continue; }
    if (resolvePath[i] === '..') { cwdPath.pop(); }
    else { cwdPath.push(resolvePath[i]); }
  }
  if (process.platform === 'win32') {
    var winResult = cwdPath.join("\\");
    if (winResult[winResult.length - 1] === "\\") { winResult = winResult.substring(0, winResult.length - 1); }
    return winResult;
  } else {
    var result = cwdPath.join('/');
    if (result[0] !== '/') { result = '/' + result; }
    if (result[result.length - 1] === '/') { result = result.substring(0, result.length - 1); }
    return result;
  }
}
