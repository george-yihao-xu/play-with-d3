import React, { useEffect, useRef, useState } from "react";
import { colors } from "../dummyData/colors";
import { Project, projects } from "../dummyData/projects";
import * as d3 from "d3";
import { useProjectContext } from "../context/ProjectContext";

type Chart = d3.Selection<SVGGElement, unknown, null, undefined>;

export const ProjectConstructionTypeChart = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [chart, setChart] = useState<Chart>();
    const { selectedProject, setActiveConstructionType } = useProjectContext();

    const drawChart = () => {
        const width = 500;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        // Remove any existing elements in the SVG
        d3.select(svgRef.current).selectAll("*").remove();

        // Create the SVG element and append a group element for transformations
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        setChart(svg);

        // Count the number of projects for each construction type
        const typeCounts = d3.rollup(projects, (v: Project[]) => v.length, (d: Project) => d.constructionType);

        // Convert the rollup result to an array of objects with type and count properties
        const data = Array.from(typeCounts, ([type, count]) => ({ type, count }));

        // Create a pie chart. we need the calculated value to be the count property of the data object, like start angle and end angle etc.
        const pie = d3.pie<{ type: string, count: number }>().value((d: { count: number }) => d.count);

        // Define the arc generator for the pie chart
        const arc = d3.arc<d3.PieArcDatum<{ type: string, count: number }>>().innerRadius(radius * 0.3).outerRadius(radius)

        // tooltip
        const tooltip = d3.select(tooltipRef.current)
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "1px solid black")
            .style("padding", "2px")
            .style("border-radius", "5px")
            .style("pointer-events", "none")
            .style("transition", "opacity 0.2s");

        // Append the arcs to the SVG
        const arcs = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        // Draw the arcs，and add a title/tooltip to each arc
        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d) => {
                return colors.constructionType[d.data.type as keyof typeof colors.constructionType] || "gray";
            })
            .attr("cursor", "pointer")
            .on("click", (_, d) => {
                setActiveConstructionType(d.data.type);
            })
            .on("mousemove", (event, d) => {
                const [x, y] = d3.pointer(event);  // 获取鼠标相对于SVG的坐标
                tooltip.transition()
                    .duration(100)
                    .style("opacity", .9);
                tooltip.html(`Type: ${d.data.type}<br/>Count: ${d.data.count}`)
                    .style('color', colors.constructionType[d.data.type as keyof typeof colors.constructionType] || "gray")
                    .style("left", `${x + width / 2}px`)
                    .style("top", `${y + height / 2}px`);
            })
            .on("mouseout", () => {
                tooltip.transition()
                    .duration(100)
                    .style("opacity", 0);
            });

        // Add the text labels
        arcs.append("text")
            .attr("transform", (d) => {
                const pos = arc.centroid(d);
                return `translate(${pos[0]}, ${pos[1]})`;
            })
            .text((d) => {
                return d.data.type + " (" + d.data.count + ")";
            })
            .attr("dy", "0.35em")
            .attr('dx', '-0.35em')
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-family", "sans-serif")
            .style("fill", "white");
    }

    useEffect(() => {
        if (projects.length > 0 && svgRef.current) {
            drawChart();
        }
    }, []);


    // highlight
    useEffect(() => {
        const highlightSegment = (constructionType: string | null) => {
            if (!chart) return;

            chart.selectAll(".arc")
                .select("path")
                .transition()
                .duration(200)
                .attr("opacity", d => constructionType ? (d.data.type === constructionType ? 1 : 0.8) : 1)
                .attr("stroke", d => constructionType && d.data.type === constructionType ? "blue" : "none")
                .attr("stroke-width", d => constructionType && d.data.type === constructionType ? 2 : 0);
        }

        highlightSegment(selectedProject?.constructionType || null);
    }, [selectedProject, chart]);


    return <div style={{ position: "relative" }}>
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef} style={{ position: "absolute", pointerEvents: "none" }} />
    </div>;
};

export default ProjectConstructionTypeChart;
