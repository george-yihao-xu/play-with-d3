import React, { useEffect, useRef } from "react";
import { colors } from "../dummyData/colors";
import { Project, projects } from "../dummyData/projects";
import * as d3 from "d3";

export const ProjectConstructionTypeChart = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    const drawChart = () => {
        const width = 500;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        // Remove any existing elements in the SVG
        d3.select(svgRef.current).select("*").remove();

        // Create the SVG element and append a group element for transformations
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Define a color scale for the construction types
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Count the number of projects for each construction type
        const typeCounts = d3.rollup(projects, (v: Project[]) => v.length, (d: Project) => d.constructionType);

        // Convert the rollup result to an array of objects with type and count properties
        const data = Array.from(typeCounts, ([type, count]) => ({ type, count }));

        // Create a pie chart. we need the calculated value to be the count property of the data object, like start angle and end angle etc.
        const pie = d3.pie<{ type: string, count: number }>().value((d: { count: number }) => d.count);

        // Define the arc generator for the pie chart
        const arc = d3.arc<d3.PieArcDatum<{ type: string, count: number }>>().innerRadius(radius * 0.3).outerRadius(radius)

        // Append the arcs to the SVG
        const arcs = svg.selectAll(".arc").data(pie(data)).enter().append("g")

        // Draw the arcs
        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d) => color(d.data.type))
    }

    useEffect(() => {
        if (projects.length > 0 && svgRef.current) {
            drawChart();
        }
    }, [projects]);

    return <svg ref={svgRef}></svg>;
};

export default ProjectConstructionTypeChart;
