const currentNodeColor = 'green'; // 当前节点颜色

// 初始化六个灰色节点
const initData = Array(6).fill(0).map((_, index) => {
  return {
    name: index + 1 + "",
  }
})

const n = 6
const cx = 0
const cy = 0
const circleArr = Array(n).fill(0).map(function (_, index) {
  const angle = ((2 * Math.PI) / n) * index;
  return {
    name: index + 1,
    label: {
      show: true
    },
    x: cx + Math.cos(angle),
    y: cy + Math.sin(angle)
  }
})


export default {
  title: {
    // text: '网络拓扑图'
  },
  grid: {
    // width: "100%",
    // height: "100%",
  },

  legend: [
    {
      orient: 'vertical',
      top: 0,
      right: 0,
      // data: [
      //   { name: '其他节点', icon: 'circle' },
      //   { name: '当前节点', itemStyle: { color: currentNodeColor }, icon: 'circle' }
      // ]
    }
  ],
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'force',
      draggable: true,
      symbolSize: 50,
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['arrow', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      data: [],

      links: [],
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0,
      },
      force: {
        initLayout: 'circular',
        repulsion: 1000,
        edgeLength: [100, 400],
        layoutAnimation: true,
      },
      // edges: item.edges.map(function (e) {
      //   return {
      //     source: e[0] + '',
      //     target: e[1] + ''
      //   };
      // })
    },
  ],
  animation: false
};


