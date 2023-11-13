/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import * as d3 from 'd3'
import './BarChart.css'
import { useAppContext } from '../../Context/AppContextProvider'

const BarChart = () => {
  const margin = 80
  const width = 1100 - 2 * margin
  const height = 500 - 2 * margin
  const { queryResultData } = useAppContext()
  console.log(queryResultData)

  useEffect(() => {
    if (queryResultData != null) {
      const yValues = queryResultData.map((data) => data.treeQuantity)
      const maxY = Math.max(...yValues)

      const svg = d3.select('#chart-svg') // Use a specific id for the SVG container

      const chart = svg.append('g').attr('transform', `translate(${margin}, ${margin})`)

      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(queryResultData.map((s) => s.inventoryYear))
        .padding(0.3)

      const yScale = d3.scaleLinear().range([height, 0]).domain([0, maxY])
      console.log(height)

      chart.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale))

      chart.append('g').call(d3.axisLeft(yScale))

      const barGroups = chart.selectAll().data(queryResultData).enter().append('g')

      barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.inventoryYear))
        .attr('y', (g) => yScale(g.treeQuantity))
        .attr('height', (g) => height - yScale(g.treeQuantity))
        .attr('width', xScale.bandwidth())

      barGroups
        .append('text')
        .attr('class', 'bar-label')
        .attr('x', (g) => xScale(g.inventoryYear) + xScale.bandwidth() / 2)
        .attr('y', (g) => yScale(g.treeQuantity) - 5) // Adjust the y-position as needed
        .attr('text-anchor', 'middle')
        .text((g) => g.treeQuantity)
        // ... (rest of your code)

      barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.inventoryYear))
        .attr('y', (g) => yScale(g.treeQuantity))
        .attr('height', (g) => height - yScale(g.treeQuantity))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function (actual, i) {
          d3.selectAll('.value')
            .attr('opacity', 0)

          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.inventoryYear) - 5)
            .attr('width', xScale.bandwidth() + 10)

          const y = yScale(actual.treeQuantity)
        })
        .on('mouseleave', function () {
          d3.selectAll('.value')
            .attr('opacity', 1)

          d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.inventoryYear))
            .attr('width', xScale.bandwidth())

          chart.selectAll('#limit').remove()
          chart.selectAll('.divergence').remove()
        })

      svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Year')

      svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Number of trees')

      svg.append('text')
        .attr('class', 'source')
        .attr('x', width - margin / 2)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'start')
        .text('Src. Forest Inventory Analysis')

      // Ensure to clean up the D3 elements when the component unmounts
      return () => {
        svg.selectAll('*').remove()
      }
    }
  }, [queryResultData]) // Empty dependency array to run the effect only once

  return (
    <>
      {queryResultData != null && (
        <div className='chart'>
          <div id='layout'>
            <div id='container'>
              <svg id='chart-svg' width={width + 2 * margin} height={height + 2 * margin} />
            </div>
          </div>
        </div>)}

      {queryResultData == null && (
        <div className='chart'>
          <div id='layout'>
            <div id='container'>
              <svg id='chart-svg' width={width + 2 * margin} height={height + 2 * margin}>
                <text x={width / 2 + margin} y={margin} textAnchor='middle' fontSize='16' fill='black'>
                  No data to show for your selection, please select filters and press the Run Query button
                </text>
              </svg>
            </div>
          </div>
        </div>)}
    </>

  )
}

export default BarChart
