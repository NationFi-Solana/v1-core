'use client';
import { ColorType, createChart } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';

// type TLineData = { time: '2018-12-12'; value: 24.11 };
type TLineData = { time: string; value: number }[];
export const LineChart = (props: {
  data: TLineData;
  dataTwo: TLineData;
  colors: any;
}) => {
  const [xy, setXY] = useState<number[]>([]);
  const [price1, setPrice1] = useState<number | undefined>();
  const [price2, setPrice2] = useState<number | undefined>();

  const {
    data,
    dataTwo,
    colors: {
      backgroundColor = '#0b1928',
      lineColor = 'white',
      textColor = '#585a74',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef) return;
    if (!chartContainerRef.current) return;
    const handleResize = () => {
      if (!chartContainerRef) return;
      if (!chartContainerRef.current) return;
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    // Get the current users primary locale
    const currentLocale = window.navigator.languages[0];
    const myPriceFormatter = Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: 'USD',
    }).format;
    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
        fontFamily: `'Figtree', sans-serif`,
        fontSize: 14,
      },
      width: chartContainerRef.current.clientWidth,
      height: 320,
      grid: {
        vertLines: { color: '#585a74', style: 3 },
        horzLines: { color: '#585a74', style: 3 },
      },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {},
      },
      leftPriceScale: {
        visible: true,
        borderVisible: false,
      },
      localization: {
        priceFormatter: myPriceFormatter,
      },
      rightPriceScale: {
        visible: false,
      },
    });

    chart.timeScale().fitContent();

    const newSeries = chart.addLineSeries({
      color: '#07b5d5',
    });
    const secondSeries = chart.addLineSeries({
      color: '#de4646',
    });
    newSeries.setData(data);
    secondSeries.setData(dataTwo);
    window.addEventListener('resize', handleResize);
    chart.subscribeCrosshairMove((param) => {
      if (param) {
        if (param.sourceEvent) {
          const { localX, localY } = param.sourceEvent;
          setXY([localX, localY]);
          const data = param.seriesData.get(newSeries);
          const dataTwo = param.seriesData.get(secondSeries);
          if (data) {
            if ((data as any).value) {
              const price = (data as any).value;
              setPrice1(price);
            }
          }

          if (dataTwo) {
            if ((dataTwo as any).value) {
              const price2 = (dataTwo as any).value;
              setPrice2(price2);
            }
          }
        } else {
          setXY([0, 0]);
        }
      } else {
        setXY([0, 0]);
      }
    });
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
    dataTwo,
  ]);

  return (
    <div className="relative">
      <div
        className={` bg-bgTwo absolute z-50 ml-12 p-2 rounded-md  text-secondaryOne ${
          xy[0] === 0 ? 'hidden' : ''
        }`}
        style={{ top: `-50px`, left: `${xy[0]}px` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center mr-7">
            <div className={`w-3 h-3    rounded-full mr-2`}></div>
            <h1>{}</h1>
          </div>
          <h1>20%</h1>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center mr-7">
            <div className={`w-3 h-3  rounded-full mr-2`}></div>
          </div>
        </div>
      </div>
      <div className="font-fig w-full margin-0 " ref={chartContainerRef} />
    </div>
  );
};
