class MyStorage {
  storage;

  prefix;

  constructor(storage = window.sessionStorage, prefix = "note_") {
    this.storage = storage;
    this.prefix = prefix;
  }

  clear() {
    this.storage.clear();
  }

  getItem(key: string) {
    const value: any = this.storage.getItem(`${this.prefix}${key}`);
    try {
      return JSON.parse(value).data;
    } catch (_e) {
      return null;
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(`${this.prefix}${key}`);
  }

  setItem(key: string, value: any) {
    this.storage.setItem(
      `${this.prefix}${key}`,
      JSON.stringify({
        data: value,
        time: Date.now(),
      })
    );
  }
}

export default MyStorage;

export const storage = new MyStorage();

export const baseStorage = new MyStorage(window.localStorage);
