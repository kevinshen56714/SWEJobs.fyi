// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const BarChart = (props: {
  data: { [date: string]: { [skill: string]: number } }
  smallView: boolean
  allKeys: string[]
}) => {
  const { data, smallView, allKeys } = props
  const chartData = Object.keys(data).map((date) => ({ date, ...data[date] }))

  return (
    <ResponsiveBar
      data={chartData}
      keys={allKeys}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
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
        tickRotation: smallView ? -45 : 0,
        legend: 'Date',
        legendPosition: 'middle',
        legendOffset: 55,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Job Count',
        legendPosition: 'middle',
        legendOffset: -50,
      }}
      // layout="horizontal"
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      // initialHiddenIds={[]}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'right',
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
          toggleSerie: true,
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
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 14,
            },
          },
          legend: {
            text: {
              fontSize: 14,
            },
          },
        },
      }}
    />
  )
}
