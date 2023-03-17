const {BrowserWindow, app} = require('electron');

/**
 * Creates application window
 * 
 * @return {undefined}
 */
const createWindow = () => {
    const win = new BrowserWindow({
        width:1200,
        height:1200,
        resizable:false
    });
    win.loadFile("index.html");
}

/**
 * Calls function when app has loaded
 * 
 * @return {undefined}
 */
app.whenReady().then(() => {
    createWindow();
});