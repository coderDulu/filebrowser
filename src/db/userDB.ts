import CreateDB from "../utils/CreateDB";
import type { RunResult } from "sqlite3";

class UserDB extends CreateDB {

  constructor(path: string) {
    super(path);
    this._createUserTable();
  }

  /**
   * 创建用户表
   * @returns {Promise<RunResult>}
   */
  _createUserTable(): Promise<RunResult> {
    // 创建用户表
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            create_time TEXT NOT NULL
        )
    `;
    return this.run(sql);
  }

  /**
   * 新增用户
   * @param {string} username
   * @param {string} password
   * @returns {Promise<RunResult>}
   */
  addUser(username: string, password: string): Promise<RunResult> {
    const sql = `INSERT INTO users(username, password) VALUES(?,?)`;
    return this.run(sql, [username, password]);
  }

  /**
   * 删除用户
   * @param {string} username
   * @returns {Promise<RunResult>}
   */
  deleteUser(username: string): Promise<RunResult> {
    const sql = `DELETE FROM users WHERE username = ?`;
    return this.run(sql, username);
  }

  /**
   * 更新用户密码
   * @param {string} username
   * @param {string} password
   * @returns Promise<RunResult>
   */
  updateUserPassword(username: string, password: string) {
    const sql = `UPDATE users SET username = ?, password = ?`;
    return this.run(sql, [username, password]);
  }
}

export default UserDB;
