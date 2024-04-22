import CryptoJS from "crypto-js";
//DES加密

export const encryptByDES = function encryptByDES(
  message: string,
  key = "NOTESIGN"
): string {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};

//DES解密
export const decryptByDES = function decryptByDES(
  ciphertext: string,
  key = "NOTESIGN"
): string {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.DES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(ciphertext) } as any,
    keyHex,
    {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
};
