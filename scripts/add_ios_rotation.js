#!/usr/bin/env node
var fs = require('fs');

var dir = process.argv[6].substring(1);
var preferencesIOS = '<key>UISupportedInterfaceOrientations</key>\n' +
'<array>\n' +
'<string>UIInterfaceOrientationPortrait</string>\n' +
'<string>UIInterfaceOrientationLandscapeLeft</string>\n' +
'<string>UIInterfaceOrientationPortraitUpsideDown</string>\n' +
'<string>UIInterfaceOrientationLandscapeRight</string>\n' +
'</array>\n' +
'<key>UISupportedInterfaceOrientations~ipad</key>\n' +
'<array>\n' +
'<string>UIInterfaceOrientationPortrait</string>\n' +
'<string>UIInterfaceOrientationLandscapeLeft</string>\n' +
'<string>UIInterfaceOrientationPortraitUpsideDown</string>\n' +
'<string>UIInterfaceOrientationLandscapeRight</string>\n' +
'</array>';
var file = 'platforms/ios/'+dir+'/'+dir+'-Info.plist';

fs.readFile(file, function(err, data) {
  if (data) {
    data = data.toString().replace('<dict>', '<dict>' + preferencesIOS);
    fs.writeFile(file, data, function(err) {
      console.log('[File written]');
    });
  } else {
    console.log('[Error reading file]');
  }
});
