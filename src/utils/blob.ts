import CryptoJs from 'crypto-js'

export function saveTextToFile(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain' })
  downloadFile(blob, filename)
}

/**
 * 下载文件（将blob对象转换成URL）
 * @param blob blob对象
 * @param filename 文件名
 */
export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
}

/**
 * 获取文件的md5
 * @param file File文件数据
 * @returns md5字符串
 */
export function getFileMD5(file: any) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const fileData: any = e?.target?.result
      const fileWordArray = CryptoJs.lib.WordArray.create(fileData)

      const md5 = fileData ? CryptoJs.MD5(fileWordArray).toString().toString() : ''

      resolve(md5)
    }

    reader.onerror = (err) => {
      reject(err.target?.result)
    }

    reader.readAsArrayBuffer(file)
  })
}

/**
 * AES128数据加密
 * @param value 需要加密的数据
 * @returns 加密后的数据
 */
export function encryptOfAES(value: string) {
  const key = 'hxd66688hxd66688'
  const keyBytes = CryptoJs.enc.Utf8.parse(key)
  const ivBytes = CryptoJs.enc.Utf8.parse(key)

  const encrypted = CryptoJs.AES.encrypt(value, keyBytes, {
    iv: ivBytes,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.ZeroPadding
  }).toString()

  return encrypted
}

