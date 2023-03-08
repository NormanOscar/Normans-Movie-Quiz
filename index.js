const {BrowserWindow, app, Menu} = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width:1200,
        height:1200,
        icon: '/img/movie_quiz_icon.png',
        resizable:false
    });
    win.loadFile("index.html");
}


app.whenReady().then(() => {
    createWindow();
});