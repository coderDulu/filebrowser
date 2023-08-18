import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts'
import { addResizeObserver } from './resize'
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  PieChart,
  HeatmapChart,
  GraphChart
} from 'echarts/charts';
import { TitleComponent, GraphicComponent } from 'echarts/components'
import {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
  VisualMapComponent,
  ToolboxComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PieChart,
  LegendComponent,
  VisualMapComponent,
  HeatmapChart,
  GraphChart,
  GraphicComponent,
  ToolboxComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent
]);

/**
 * 
 * @param id 元素id
 * @param option 
 * @returns echartsInstance
 */
export function createEcharts(id: string, option: EChartsOption) {
  const chartDom = document.getElementById(id)

  if (chartDom) {
    const myChart = echarts.init(chartDom)

    if (option) {
      myChart.setOption(option)
      // 监听元素变化 重置实例图表
      chartDom.parentElement && addResizeObserver(chartDom.parentElement, myChart.resize)
    }
    return myChart;
  }
  return null
}