require('update-electron-app')({
  logger: require('electron-log')
})

const {app, BrowserWindow} = require('electron')

let mainWindow = null;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    // minWidth: 800,
    // minHeight: 600,
    // frame:false,
    // backgroundColor: '#000000',
    // transparent: true,
    // darkTheme: true,
    webPreferences:{
      nodeIntegration: true
    }
  })
  // mainWindow.loadURL('http://localhost:9000')
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', function () {
    mainWindow = null
  })

  require('devtron').install()

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
