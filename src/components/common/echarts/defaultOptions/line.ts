const common = {
  tooltip: {
    trigger: 'axis',
    position: 'top',
    snap: true,
    axisPointer: {
      animation: false
      // type: 'cross'
    },
    animation: false
  },
  series: [
    {
      data: [],
      type: 'line',
      showSymbol: false,
      lineStyle: {
        color: '#3d95c8'
      },
      areaStyle: {
        color: '#d5e4f3'
      }
    }
  ],
  animation: false
}

const base_option = {
  ...common,
  xAxis: {
    type: 'category',
    data: [1, 2, 3, 4, 5, 6]
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
      align: 'center'
    }
  }
}

const time_option = {
  ...common,
  xAxis: {
    type: 'category',
    //
    boundaryGap: false,
    data: Array(61)
      .fill(0)
      .map((item, index) => index),
    inverse: true,
    axisLabel: {
      interval: 59
    },
    splitLine: {
      show: true
    },
    nameLocation: 'start'
    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  }
}

export default {
  base_option,
  time_option
}
