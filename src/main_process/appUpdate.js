const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
var log = require('electron-log')
const path = require('path')

log.transports.console.level = false
log.transports.console.level = 'silly'
// =================================================================================================================
// 更新升级，注意这个autoUpdater不是electron中的autoUpdater
// 更新地址
const updateURL = 'http://localhost:9090/update/'
// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function handleUpdate() {
    //= =================================================================================================================
    const message = {
        error: '检查更新出错',
        checking: '正在检查更新……',
        updateAva: '检测到新版本，正在下载……',
        updateNotAva: '现在使用的就是最新版本，不用更新'
    }
    // 设置是否自动下载，默认是true,当点击检测到新版本时，会自动下载安装包，所以设置为false
    autoUpdater.autoDownload = false
    // https://github.com/electron-userland/electron-builder/issues/1254
    if (process.env.NODE_ENV === 'development') {
        autoUpdater.updateConfigPath = path.join(__dirname, '../build/win-unpacked/resources/app-update.yml')
    } else {
        autoUpdater.updateConfigPath = path.join(__dirname, 'resources/app-update.yml')
    }
    // autoUpdater.setFeedURL(updateURL)
    autoUpdater.on('error', function () {
        mainWindow.webContents.send("error", message.error)
    })
    autoUpdater.on('checking-for-update', function () {
        mainWindow.webContents.send("update", message.checking)
    })
    autoUpdater.on('update-available', function (info) {
        mainWindow.webContents.send("available", message.updateAva)
    })
    autoUpdater.on('update-not-available', function (info) {
        mainWindow.webContents.send("not-available", message.updateNotAva)
    })

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        log.warn('触发下载。。。')
        console.log(progressObj)
        log.warn(progressObj)
        mainWindow.webContents.send('downloadProgress', progressObj)
    })
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.once('isUpdateNow', (e, arg) => {
            log.warn('开始更新')
            autoUpdater.quitAndInstall()
            mainWindow.destroy()
            // callback()
        })
        mainWindow.webContents.send('isUpdateNow', 'isUpdateNow')
    })

    ipcMain.on('checkForUpdate', () => {
        // 执行自动更新检查
        log.warn('执行自动更新检查')
        //清除每次更新下载的文件，否则无法进行更新
        // let updaterCacheDirName = 'note-updater'
        // const updatePendingPath = path.join(autoUpdater.app.baseCachePath, updaterCacheDirName, 'pending')
        // log.warn(updatePendingPath)
        // rm(updatePendingPath, function (err) {
        //   log.warn(autoUpdater.app.baseCachePath)
        // })

        log.warn(__dirname)
        autoUpdater.checkForUpdates()
        mainWindow.webContents.send('checkForUpdate', 'checkForUpdate')
    })

    ipcMain.on('downloadUpdate', () => {
        // 下载
        log.warn('执行下载')
        autoUpdater.downloadUpdate()
        mainWindow.webContents.send('downloadUpdate', 'downloadUpdate')
    })
}

handleUpdate();