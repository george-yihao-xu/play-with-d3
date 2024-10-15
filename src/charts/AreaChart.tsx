import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Project } from '../dummyData/projects';
import COLORS from '../dummyData/colors';

interface AreaChartProps {
  projects: Project[];
}

type DataPt = {
  date: number;
  total: number;
  [key: string]: number;
}

const AreaChart: React.FC<AreaChartProps> = ({ projects }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Process data
    const processedData = processData(projects);
    const constructionTypes = Array.from(new Set(projects.map(p => p.constructionType)));

    // Set chart dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleLinear()
      .domain(d3.extent(processedData, d => d.date) as [number, number])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(processedData, d => d.total) as number])
      .range([height, 0]);

    // Create stack generator
    const stack = d3.stack()
      .keys(constructionTypes)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(processedData);

    // Create area generator
    const area = d3.area<d3.SeriesPoint<DataPt>>()
      .x(d => x(d.data.date))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))

    // Draw stacked areas
    svg.selectAll("path")
      .data(stackedData)
      .join("path")
      .attr("fill", (d) => COLORS.constructionType[d.key as keyof typeof COLORS.constructionType])
      .attr("d", area as unknown as string);

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add legend
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
      .style('fill', (d) => COLORS.constructionType[d as keyof typeof COLORS.constructionType]);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(d => d);

  }, [projects]);

  return <svg ref={svgRef}></svg>;
};

// Helper fn to fill missing years
const fillMissingYears = (gsfChanges: Project['gsfChanges']) => {
  const filledChanges = [...gsfChanges].sort((a, b) => a.date - b.date);
  const result: Project['gsfChanges'] = [];
  const startYear = 2021;
  const endYear = 2023;

  if (gsfChanges.length === 0) {
    return result;
  }

  // if missing the first year
  if (filledChanges[0].date > startYear) {
    result.push({ date: startYear, value: 0 });
  }

  for (let year = startYear; year <= endYear; year++) {
    const change = filledChanges.find(c => c.date === year);
    if (change) {
      result.push(change);
    } else {
      result.push({ date: year, value: result[result.length - 1].value });
    }
  }

  console.log('--filled project', result);

  return result;
}

// Helper function to process data
function processData(projects: Project[]) {
  const _projects = projects.map(project => {
    return {
      ...project,
      gsfChanges: fillMissingYears(project.gsfChanges),
    };
  });

  console.log('--processed project', _projects);

  const yearSet = new Set<number>();
  _projects.forEach(project => {
    project.gsfChanges.forEach(change => yearSet.add(change.date));
  });
  const years = Array.from(yearSet).sort((a, b) => a - b);

  // make sure all years are included
  const fullYears = [];
  for (let year = years[0]; year <= years[years.length - 1]; year++) {
    fullYears.push(year);
  }

  const result = fullYears.map(year => {
    const dataPoint: { date: number; total: number; [key: string]: number } = { date: year, total: 0 };
    
    let total = 0;

    // iterate over each project
    _projects.forEach(proj => {
      const changes = proj.gsfChanges.filter(c => c.date === year);
      changes.forEach(change => {
        if (dataPoint[proj.constructionType] === undefined) {
          dataPoint[proj.constructionType] = 0;
        }
        dataPoint[proj.constructionType] += change.value;
        total += change.value;
      });
    });

    dataPoint.total = total;

    return dataPoint;
  });

  console.log('--result', result);

  return result;
}

export default AreaChart;
