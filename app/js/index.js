'use strict';

var ipc = require('ipc');
var remote = require('remote');
var Tray = remote.require('tray');
var Menu = remote.require('menu');
var path = require('path');

var soundButtons = document.querySelectorAll('.button-sound');
var closeEl = document.querySelector('.close');
var settingsEl = document.querySelector('.settings');

var trayIcon = null;
var trayMenu = null;

for (var i = 0; i < soundButtons.length; i++) {
    var soundButton = soundButtons[i];
    var soundName = soundButton.attributes['data-sound'].value;

    prepareButton(soundButton, soundName);
}



function prepareButton(buttonEl, soundName) {
  //  buttonEl.querySelector('span').style.backgroundImage = 'url("img/icons/' + soundName + '.png")';

    var audio = new Audio(__dirname + '/wav/' + soundName + '.mp3');
    buttonEl.addEventListener('click', function () {
        
      if (audio.paused) {
        audio.play();
    }else{
        audio.pause();
        audio.currentTime = 0
    }
       
    });
}



closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});

settingsEl.addEventListener('click', function () {
    ipc.send('open-settings-window');
});

// // tray //   //

if (process.platform === 'darwin') {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}
else {
    trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.png'));
}

var trayMenuTemplate = [
    {
        label: 'Song Player',
        enabled: false
    },
    {
        label: 'Help/About',
        click: function () {
            ipc.send('open-settings-window');
        }
    },
    {
        label: 'Quit',
        click: function () {
            ipc.send('close-main-window');
        }
    }
];
trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);