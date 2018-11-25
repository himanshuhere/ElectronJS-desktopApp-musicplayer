

'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;

app.on('ready', function() {
   

    mainWindow = new BrowserWindow({
        frame: false,
        height: 630,
        resizable: false,
        width: 370
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    
});


ipc.on('close-main-window', function () {
    app.quit();
});




// //  response to open setting window



ipc.on('open-settings-window', function ()		// taking req orf renderer
 {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 300,
        resizable: false,
        width: 300
    });

    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});


// // //  handling setting window closing req by setting js

ipc.on('close-settings-window', function () {
    if (settingsWindow) {	 			// check if already open or not
        settingsWindow.close();				// if not open
    }
});




//	//	  set global shortcut method

// 	// 	







