import { RESULT_SUCCESS } from "./index"

export default {
  install: {
    get: () => {
      return {
        ...RESULT_SUCCESS,
        "value": {
          "wave": "OFDM",
          "trans_mode": "pass",
          "version": "V1.0.0.0",
          "compile_time": "2021-02-20",
          "install_time": "2021-03-20"
        },
      }
    }
  },
  firmwarelog: {
    get: () => ({
      ...RESULT_SUCCESS,
      "value": {
        "filename": "cgi-bin/nbmesh.log"
      },
    })
  },
  upload: {
    get() {
      return {
        ...RESULT_SUCCESS,
        "value": {
          "filename": "https://www.voidtools.com/Everything-1.4.1.1009.x64-Setup.exe"
        },
      }
    },
    set() {
      return {
        ...RESULT_SUCCESS
      }
    }
  }
}