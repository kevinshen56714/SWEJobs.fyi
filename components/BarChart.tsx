// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const BarChart = ({ data }) => {
  const allKeys = new Set()
  const chartData = Object.keys(data).map((date) => {
    Object.keys(data[date]).forEach((skill) => {
      if (data[date][skill] !== 0) allKeys.add(skill)
    })
    return { date, ...data[date] }
  })
  return (
    <ResponsiveBar
      data={chartData}
      keys={Array.from(allKeys) as string[]}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'paired' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'date',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      // layout="horizontal"
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="skill count vs date bar chart"
      barAriaLabel={function (e) {
        return e.id + ': ' + e.formattedValue + ' in date: ' + e.indexValue
      }}
    />
  )
}
