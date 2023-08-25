import fs from "fs";
import path from "path";
import mime from "mime-types";

interface InfoType {
  name: string;
  path: string;
  size: number;
  extension: string;
  modified: string;
  type: string | false;
  isFolder: boolean;
  items?: InfoType[];
  childNumber?: number;
}

const fileType = {
  File: "file",
  Folder: "folder",
  Unknown: "unknown",
  Error: "err",
};

class FileSystem {
  /**
   * 获取文件内容
   * @param {string} filepath 文件路径
   * @returns {Promise<InfoType>} data 文件内容
   */
  readFile(filepath: string): Promise<InfoType> {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, "utf-8", async (err, data) => {
        if (err) reject("read file error" + err.message);
        const info = await this.getInfo(filepath);
        const fileInfo = {
          ...info,
          content: data,
        };
        resolve(fileInfo);
      });
    });
  }

  /**
   * 获取文件夹内容
   * @param {string} folderPath 文件夹路径
   * @returns {Promise<InfoType>} files 文件夹子目录
   */
  readFolder(folderPath: string): Promise<InfoType> {
    return new Promise(async (resolve, reject) => {
      const isExit = fs.statSync(folderPath);
      if (isExit) {
        // 获取当前文件夹信息
        const folderInfo = await this.getInfo(folderPath);

        fs.readdir(folderPath, "utf-8", async (err, files = []) => {
          try {
            if (err) reject(err);

            // 获取子文件信息列表
            const itemInfos: InfoType[] = [];
            for (const item of files) {
              const mergePath = path.join(folderPath, item);
              const info = await this.getInfo(mergePath);
              itemInfos.push(info);
            }

            // 文件夹信息
            const info: InfoType = {
              ...folderInfo,
              items: itemInfos,
              // childNumber: files.length,
            };
            resolve(info);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        reject("not found folderPath：" + folderPath);
      }
    });
  }

  /**
   * 获取文件/文件夹相关信息
   * @param {string} filepath
   * @returns
   */
  async getInfo(filepath: string): Promise<InfoType> {
    try {
      const stats = fs.statSync(filepath);
      if (stats) {
        // 名称
        const name = path.basename(filepath);
        // 后缀
        const extension = path.extname(filepath);
        // 大小
        const size = stats.size;
        // 创建时间
        const modified = stats.mtime.toLocaleString();
        // 文件类型
        // const { mime } = await fileTypeFromFile(filepath);
        const mimeType = mime.lookup(filepath); // 使用mime库来获取文件的MIME类型
        // 是否是文件夹
        const isFolder = this.getType(filepath) === "folder";

        const info: InfoType = {
          name,
          path: filepath,
          size,
          extension,
          modified,
          type: mimeType,
          isFolder,
        };
        if (isFolder) {
          const children = fs.readdirSync(filepath);
          info.childNumber = children.length;
        }

        return info;
      } else {
        return Promise.reject(new Error("not found path"));
      }
    } catch (error) {
      return Promise.reject(new Error("get info error"));
    }
  }

  /**
   * 获取路径信息
   * @param {string} path 需要读取的路径
   * @returns 返回路径信息
   */
  read(path: string): Promise<InfoType> {
    return new Promise(async (resolve, reject) => {
      try {
        // 使用fs.stat()方法获取文件/文件夹的状态
        const stats = this.getType(path);
        switch (stats) {
          case fileType.File:
            const data = await this.readFile(path);
            resolve(data);
          case fileType.Folder:
            const files = await this.readFolder(path);
            resolve(files);
          case fileType.Unknown:
            reject(new Error("not found file type"));
          case fileType.Error:
            reject(new Error("not found path"));
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   *
   * @param {string} path 获取文件类型
   * @returns {string}
   */
  getType(path: string): string {
    try {
      const stats = fs.statSync(path);
      if (stats.isFile()) {
        return fileType.File;
      } else if (stats.isDirectory()) {
        return fileType.Folder;
      } else {
        return fileType.Unknown;
      }
    } catch (error) {
      return fileType.Error;
    }
  }
}

export default FileSystem;