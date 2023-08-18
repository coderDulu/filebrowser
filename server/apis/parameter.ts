import { RESULT_SUCCESS } from './index'

interface Value {
  freq: string
  power: string
  id: string
  kcp: string
  destination: string
  codeRate: string
  serialMode: string
  serialRate: string
  ethernet: string
  localIP: string
  autoRoute: string
  routeData: string[]
  lowDelay: string
}

let default_value: Value = {
  freq: '1400',
  power: '20',
  id: '1',
  kcp: 'on',
  destination: '255',
  codeRate: '100',
  serialMode: 'data',
  serialRate: '115200',
  ethernet: 'on',
  localIP: '192.168.2.172',
  autoRoute: 'off',
  routeData: [
    '{"dest":"2","next":"2","hop":"2"}',
    '{"dest":"173","next":"173","hop":"1"}',
    '{"dest":"3","next":"3","hop":"3"}'
  ],
  lowDelay: 'on'
}

export default {
  node: {
    get: () => ({
      ...RESULT_SUCCESS,
      value: {
        node: ['170', '171', '172', '173']
      }
    })
  },
  base: {
    get: () => ({ ...RESULT_SUCCESS, value: default_value }),
    set: (newValue: Value) => {
      // default_value = Object.assign(default_value, newValue)
      return RESULT_SUCCESS
    },
    save: (newValue: Value) => {
      default_value = Object.assign(default_value, newValue)
      return RESULT_SUCCESS
    }
  },
  threshold: {
    get: () => ({
      ...RESULT_SUCCESS,
      value: {
        threshold: '20'
      }
    }),
    set: () => ({
      ...RESULT_SUCCESS
    })
  }
}
