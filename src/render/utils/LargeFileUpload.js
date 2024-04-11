export default class LargeFileUpload {
  constructor(file, uploadUrl, options) {
    this.file = file;
    this.uploadUrl = uploadUrl;
    this.options = options;
    this.fileSize = file.size;
    this.chunkSize = options.chunkSize || 10 * 1024 * 1024; // 10MB
    this.rangeEnd = this.chunkSize;
    this.rangeStart = 0;
    this.fileContent = null;
    this.fileReader = new FileReader();
    this.fileReader.onload = this.fileReaderOnLoad.bind(this);
    this.fileReader.onerror = this.fileReaderOnError.bind(this);
    this.fileReader.onabort = this.fileReaderOnAbort.bind(this);
    this.fileReader.readAsArrayBuffer(this.file.slice(this.rangeStart, this.rangeEnd));
  }

  fileReaderOnLoad(e) {
    this.fileContent = e.target.result;
    this.uploadFileContent();
  }

  fileReaderOnError(e) {
    console.log('FileReader error: ', e);
  }

  fileReaderOnAbort(e) {
    console.log('FileReader abort: ', e);
  }

  uploadFileContent() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/octet-stream');
    headers.append('Content-Range', `bytes ${this.rangeStart}-${this.rangeEnd - 1}/${this.fileSize}`);
    const options = {
      method: 'PUT',
      headers,
      body: this.fileContent
    };
    fetch(this.uploadUrl, options)
      .then(response => {
        if (response.status === 201) {
          console.log('File uploaded successfully');
          return;
        }
        if (response.status === 202) {
          this.rangeStart = this.rangeEnd;
          this.rangeEnd = this.rangeStart + this.chunkSize;
          if (this.rangeEnd > this.fileSize) {
            this.rangeEnd = this.fileSize;
          }
          this.fileReader.readAsArrayBuffer(this.file.slice(this.rangeStart, this.rangeEnd));
        }
      })
      .catch(error => {
        console.log('Error while uploading file: ', error);
      });
  }
}
