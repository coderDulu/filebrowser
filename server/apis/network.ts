import { RESULT_SUCCESS, RESULT_ERROR } from './index'

interface NodeConfig {
  configNode: string
  configID: string
  configFreq: string
  configPower: string
  configKCP: string
  configDestination: string
  codeRate: string
}

interface NodeConfigGet {
  node: string
}

const nodeConfigObj: NodeConfig = {
  configNode: '171',
  configID: 'NBMESH_2',
  configFreq: '1500',
  configPower: '23',
  configKCP: 'off',
  configDestination: '170',
  codeRate: '100'
}

const nodeMap = new Map()

export default {
  topology: {
    get: () => ({
      ...RESULT_SUCCESS,
      value: {
        node: ['170', '171', '172', '173'],
        links: [
          ['170', '171'],
          ['170', '172'],
          ['172', '173'],
          ['171', '172']
        ]
      }
    })
  },
  nodeconfig: {
    get: (value: NodeConfigGet) => {
      try {
        nodeConfigObj.configNode = value.node
        let sendVal
        if (nodeMap.has(value.node)) {
          // 存在返回
          sendVal = nodeMap.get(value.node)
        } else {
          // 不存在，初始化
          nodeMap.set(value.node, nodeConfigObj)
          sendVal = nodeConfigObj
        }
        return {
          ...RESULT_SUCCESS,
          value: sendVal
        }
      } catch (error) {
        return RESULT_ERROR
      }
    },
    set: (newValue: Partial<NodeConfig> & NodeConfigGet) => {
      try {
        const { node, ...newVal } = newValue
        let oldVal

        if (nodeMap.has(node)) {
          // 存在
          oldVal = nodeMap.get(node)
        } else {
          // 不存在即初始化
          nodeConfigObj.configNode = node
          oldVal = nodeConfigObj
        }
        nodeMap.set(node, Object.assign(oldVal, newVal))
        return RESULT_SUCCESS
      } catch (error) {
        console.log(error)
        return RESULT_ERROR
      }
    }
  }
}

// network页面的ws接口
export const wsInterface = {
  ping: {
    start: () => {
      const delay = Math.floor(Math.random() * 100) + 'ms'
      const sendData = {
        value: {
          ip: '172',
          delay
        }
      }
      return {
        repeat: true,
        sendData
      }
    },
    stop: () => {
      const sendData = {
        message: 'success',
        result: '00',
        value: {
          ip: '172',
          max: '23ms',
          avg: '11ms',
          min: '8ms'
        }
      }

      return {
        sendData
      }
    }
  },
  tp: {
    start: () => {
      const sendData = {
        value: {
          ip: '172',
          jitter: '4',
          loss: '0.00%',
          tp: '11.57KB/s'
        }
      }
      return {
        repeat: true,
        sendData
      }
    },
    stop: () => {
      return {
        sendData: RESULT_SUCCESS
      }
    }
  },
  factory: {
    get: () => {
      const sendData = {
        ...RESULT_SUCCESS,
        value: {
          uuid: '123456',
          firmware: '0101',
          hardware: '0202',
          startfreq: '1300',
          stopfreq: '1500',
          currentfreq: '1400',
          currentcfo: '0',
          currentatten: '0',
          currentpower: '33',
          currentpoweratten: '0'
        }
      }
      return {
        sendData
      }
    }
  },
  evmTest: {
    start: () => {
      return {
        sendData: {
          type: 'evmTest',
          result: '00'
        }
      }
    },
    stop: () => ({
      sendData: {
        type: 'evmTest',
        result: '00'
      }
    })
  },
  serialTest: {
    start: () => {
      return {
        sendData: {
          type: 'serialTest',
          result: '00'
        }
      }
    },
    stop: () => ({
      sendData: {
        type: 'serialTest',
        result: '00'
      }
    })
  },
  adjPA: {
    start: () => ({
      sendData: {
        type: 'adjPA',
        result: '00'
      }
    }),
    stop: () => ({
      sendData: {
        type: 'adjPA',
        result: '00'
      }
    }),
    save: () => ({
      sendData: {
        type: 'adjPA',
        result: '00'
      }
    })
  },
  rxTest: {
    start: () => ({
      sendData: {
        type: 'rxTest',
        result: '00'
      }
    }),
    stop: () => ({
      sendData: { type: 'rxTest', result: '00' }
    })
  },
  PAtest: {
    start: () => ({
      sendData: {
        type: 'PAtest',
        result: '00'
      }
    }),
    stop: () => ({
      sendData: {
        type: 'PAtest',
        result: '00'
      }
    })
  },
  powerState: {
    get: () => ({
      sendData: {
        type: 'powerState',
        result: '00'
      }
    })
  },
  freqband: {
    set: () => ({ sendData: { type: 'freqband', result: '00' } })
  },
  hardware: {
    set: () => ({ sendData: { type: 'hardware', result: '00' } })
  },
  adjcfo: {
    set: () => ({ sendData: { type: 'adjcfo', result: '00' } })
  },
  topology: {
    get: () => ({
      sendData: {
        ...RESULT_SUCCESS,
        value: {
          node: ['170', '171', '172', '173'],
          links: [
            ['170', '171'],
            ['170', '172'],
            ['172', '173'],
            ['171', '172']
          ]
        }
      }
    })
  }
}
