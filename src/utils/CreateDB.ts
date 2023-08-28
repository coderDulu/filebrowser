import { Database, RunResult, verbose } from "sqlite3";

const sqlite3 = verbose();

class CreateDB {
  _db: Database;

  constructor(path: string) {
    // 创建数据库连接
    this._db = new sqlite3.Database(path);

    this._db.on("close", () => {
      console.log("Database closed");
    });
  }

  /**
   *  @return {Database} db
   */
  get db(): Database {
    return this._db;
  }

  /**
   * @param {Database} new_db
   */
  set db(new_db: Database) {
    this._db = new_db;
  }

  // 关闭数据库连接
  close() {
    this._db.close();
  }

  /**
   * sql运行公共函数
   * @param {string} sql
   * @param {any} params
   * @returns {Promise<RunResult>}
   */
  run(sql: string, params: any = []): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) reject(err);
        resolve(this);
      });
    });
  }
}

export default CreateDB;
