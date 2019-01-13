import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


/* IPC Main */
ipcMain.on('async-message', (event: any, arg: string) => {
  console.log(arg) // prints arg passed from render
  event.sender.send('async-reply', 'hey from main process');
})