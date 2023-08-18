// dbm -> w
export function dbmToW(dbm: number) {
  const num = Number(dbm)

  let initOptions = [
    {
      label: '30dbm -> 1w',
      value: '30'
    },
    {
      label: '27dbm -> 500mw',
      value: '27'
    },
    {
      label: '24dbm -> 250mw',
      value: '24'
    },
    {
      label: '20dbm -> 100mw',
      value: '20'
    },
    {
      label: '10dbm -> 10mw',
      value: '10'
    },
    {
      label: '0dbm -> 1mw',
      value: '0'
    }
  ]
  const newoptions = createDbmOptions(num).sort((a, b) => Number(b.value) - Number(a.value))
  // console.log(newoptions)
  initOptions = [...newoptions, ...initOptions]
  return initOptions
}

/**
 * dBm 转换成 w
 * @param dBm dbm值
 * @returns 转换后的w值
 */
export function dbmToW2(dBm: number) {
  // 瓦特 = 10 ^ ((dBm - 30) / 10)
  const parseW = Math.pow(10, (dBm - 30) / 10)

  return parseW
}

/**
 * 获取a-select组件的 dbm -> w 的options
 * @param dbm dbm值
 * @returns 返回Options对象数组
 */
export function createDbmToWOptions(dbm: number) {
  const options = []

  let i = dbm
  while (i >= 0) {
    // 3的倍数且大于21 或 10的倍数
    if ((i % 3 === 0 && i > 21) || i % 10 === 0) {
      const parseW = dbmToW2(i)
      const label = `${i}dbm \u2248 ${
        parseW >= 1 ? Math.round(parseW) + 'w' : Number(parseW.toFixed(3)) * 1000 + 'mw'
      }`
      const option = {
        label,
        value: i + ''
      }
      options.push(option)
    }
    i--
  }

  return options
}


function createDbmOptions(num: number) {
  const initOptions: {
    label: string
    value: string
  }[] = []
  const init_dbm = 30 // 30dbm基准

  if (num > init_dbm) {
    for (let i = init_dbm + 1; i <= num; i++) {
      const diff = i - init_dbm // 当前dbm - 30

      // 3的倍数 power * 2 => 33dbm = 2w
      if (diff % 3 === 0 && diff % 10 !== 0) {
        initOptions.push({
          label: `${i}dbm -> ${Math.pow(2, diff / 3)}w`,
          value: `${i}`
        })
      }

      const initTenTimes = 40 // 40dbm -> 10w
      if (i >= initTenTimes) {
        // 求10w的倍数w 43dbm -> 20w
        const tenTimes = Math.floor(i / 10) * 10
        // console.log((tenTimes - 30) * 10)
        const diff_ten = i - tenTimes

        // console.log(`${i} => `,(tenTimes - 30) * 10 * Math.pow(2, diff_ten / 3 - 1))
        if (diff % 10 === 0) {
          initOptions.push({
            label: `${i}dbm -> ${Math.pow(10, (i - init_dbm) / 10)}w`,
            value: `${i}`
          })
        } else if (diff_ten % 3 === 0) {
          // console.log(tenTimes)
          initOptions.push({
            label: `${i}dbm -> ${
              Math.pow(10, (tenTimes - init_dbm) / 10) * Math.pow(2, diff_ten / 3)
            }w`,
            value: `${i}`
          })
        }
      }
    }
  }
  return initOptions
}
