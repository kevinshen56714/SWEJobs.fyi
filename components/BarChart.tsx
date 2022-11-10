// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

import { ResponsiveBar } from '@nivo/bar'
import { useRouter } from 'next/router'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const BarChart = (props: {
  data: { [date: string]: { [skill: string]: number } }
  smallView: boolean
  allKeys: string[]
  city: string
}) => {
  const { data, smallView, allKeys, city } = props
  const chartData = Object.keys(data).map((date) => ({
    date: date.split(',')[0], // don't show the year
    ...data[date],
  }))
  // don't render legends when small view and only 1 skill is displayed
  const renderLegend = !smallView || allKeys.length !== 1
  const router = useRouter()

  return (
    <ResponsiveBar
      data={chartData}
      keys={allKeys}
      indexBy="date"
      margin={{ top: 50, right: renderLegend ? 130 : 60, bottom: smallView ? 100 : 70, left: 60 }}
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
        legendOffset: smallView ? 85 : 55,
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
      legends={
        renderLegend
          ? [
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
            ]
          : []
      }
      onClick={(data) => {
        const time = (7 - data.index) * 24 // today:24, yesterday: 48, 2 days ago: 72
        const id = encodeURIComponent(data.id as string)
        router.push(`/jobs/${city}/${time <= 72 ? time : 24}?skills=${id}`)
      }}
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
