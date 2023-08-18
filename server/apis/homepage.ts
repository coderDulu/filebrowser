
import { RESULT_SUCCESS } from './index'

const homepage: any = {
  // 获取设备运行状态信息
  dev_state: {
    get: () => ({
      ...RESULT_SUCCESS,
      value: {
        "mem_avail": "11.3GB",
        "cpu_used": "24.12",
        "voltage": "12.7",
        "temperature": "44"
      }
    }),
  },
  // 获取固件版本信息
  firmware: {
    get: () => ({
      ...RESULT_SUCCESS,
      "value": {
        "wave": "OFDM",
        "trans_mode": "pass",
        "version": "V1.0.0.0",
        "compile_time": "2021-02-20"
      },
    })
  },
  // 获取网络状态信息
  network: {
    get: () => ({
      ...RESULT_SUCCESS,
      "value": {
        "net": "on",
        "id": "1",
        "node_num": "5",
        "address": "192.168.2.172"
      },
    })
  },
  // 获取通信链路状态信息
  link_state: {
    get: () => ({
      ...RESULT_SUCCESS,
      "value": {
        "freq": "1400",
        "span": "5MHz",
        "rssi": "-89",
        "modulate": "QPSK",
        "code_rate": "1/2"
      },
    })
  }
}


export default homepage