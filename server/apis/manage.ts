import { RESULT_SUCCESS } from './index'

export default {
  uuid: {
    get: () => ({
      ...RESULT_SUCCESS,
      "value": {
        "uuid": "35B56F1E7E8E934E35B56F1E7E8E934E",
        "activated": "1"
      },
    }),
    set: () => ({
      ...RESULT_SUCCESS
    })
  },
  config: {
    get: () => ({
      ...RESULT_SUCCESS,
      "value": {
        "filename": "https://www.voidtools.com/Everything-1.4.1.1009.x64-Setup.exe"
      },
    })
  },
  password: {
    set: () => ({
      ...RESULT_SUCCESS
    })
  } 
}