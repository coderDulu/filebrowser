import { db_path } from './config';
import UserDB from './userDB';

// 创建数据库操作：user类
const userDB = new UserDB(db_path);

export default {
    userDB
}