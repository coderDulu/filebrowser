import { RESULT_SUCCESS, RESULT_ERROR } from './index'
const DEFAULT_PASSWORD = "123456"
let unlock: string

export default {
  unLockDevice: {
    get() {
      return {
        ...RESULT_SUCCESS,
        "value": {
          "unLockDevice": unlock ?? "off"
        },
      }
    },
    set(newValue: { password: string }) {
      const { password } = newValue
      if (DEFAULT_PASSWORD !== password) {
        RESULT_ERROR.message = "密码错误"
        return RESULT_ERROR
      } else {
        unlock = unlock === "on" ? "off" : "on";
        return {
          ...RESULT_SUCCESS,
          "value": {
            "unLockDevice": unlock
          },
        }
      }


    }
  },

}