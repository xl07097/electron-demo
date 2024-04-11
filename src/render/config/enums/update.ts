export enum UpdateStatus {
	NOCHECKUPDATE = 0, // 还未检测更新
	DOWNLOADINGUPDATE = 1, // 正在下载更新
	NOUPDATE = 2, // 不用更新，
	DOWNLOADEDUPDATE = 3, // 更新下载完成
}
