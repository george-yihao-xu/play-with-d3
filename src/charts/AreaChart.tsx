import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import COLORS from '../dummyData/colors';
import { GSFData } from '../dummyData/projects';

interface AreaChartProps {
  gsfData: GSFData;
}

const AreaChart: React.FC<AreaChartProps> = ({ gsfData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // 清除之前的图表
    d3.select(svgRef.current).selectAll('*').remove();

    const constructionTypes = Object.keys(gsfData);
    const years = gsfData[constructionTypes[0]].length;

    // 设置图表尺寸
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // 创建 SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 创建比例尺
    const x = d3.scaleLinear()
      .domain([0, years - 1])
      .range([0, width]);

    // 计算堆叠后的最大值
    const stackedData = d3.stack().keys(constructionTypes)(
      d3.range(years).map(i => {
        const obj: { [key: string]: number } = { year: i };
        constructionTypes.forEach(type => {
          obj[type] = gsfData[type][i];
        });
        return obj;
      })
    );
    const yMax = d3.max(stackedData[stackedData.length - 1], d => d[1]) || 0;

    const y = d3.scaleLinear()
      .domain([0, yMax * 1.1]) // 增加 10% 的空间
      .range([height, 0]);

    // 创建面积生成器
    const area = d3.area<d3.SeriesPoint<{ [key: string]: number }>>()
      .x((d, i) => x(i))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    // 绘制堆叠面积
    svg.selectAll("path")
      .data(stackedData)
      .join("path")
      .attr("fill", (d) => COLORS.spaceType[d.key as keyof typeof COLORS.spaceType])
      .attr("d", area);

    // 添加 x 轴
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat((d, i) => `Year ${i + 1}`));

    // 添加 y 轴
    svg.append('g')
      .call(d3.axisLeft(y));

    // 添加图例
    const legend = svg.selectAll('.legend')
      .data(constructionTypes)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('stroke', 'white')
      .style('fill', (d) => COLORS.spaceType[d as keyof typeof COLORS.spaceType]);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(d => d);

  }, [gsfData]);

  return <svg ref={svgRef}></svg>;
};

export default AreaChart;
