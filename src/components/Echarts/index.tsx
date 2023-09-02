import ReactECharts from 'echarts-for-react';
import type {
  EChartsInstance,
  EChartsReactProps,
} from 'echarts-for-react/lib/types';
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface IHandle {
  ref: echarts.ECharts;
}

const ReactEChart: React.ForwardRefRenderFunction<
  IHandle,
  EChartsReactProps
> = (props, echartsRef: any) => {
  const { option, ...restProps } = props;
  const ref = useRef<EChartsInstance>(null!);
  useImperativeHandle(echartsRef, () => ({
    ref: ref.current.getEchartsInstance(),
  }));

  return (
    <div ref={echartsRef}>
      <ReactECharts ref={ref} option={option} {...restProps} />
    </div>
  );
};

export default forwardRef(ReactEChart);
