import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const PieChart = (props: { data: { [skill: string]: number }; smallView: boolean }) => {
  const { data, smallView } = props

  const chartData = Object.keys(data).map((skill) => ({
    id: skill,
    label: skill,
    value: data[skill],
  }))
  const chartFillData = Object.keys(data).map((skill) => {
    let fillPattern = ''
    // determine fill pattern by the sum of the ascii number of the characters in the skill
    const asciiSum = skill.split('').reduce((partialSum, a) => partialSum + a.charCodeAt(0), 0)
    const remainder = asciiSum % 3
    if (remainder === 1) fillPattern = 'lines'
    else if (remainder === 2) fillPattern = 'dots'
    return {
      match: {
        id: skill,
      },
      id: fillPattern,
    }
  })

  return (
    <ResponsivePie
      data={chartData}
      margin={{
        top: smallView ? 0 : 10,
        right: smallView ? 100 : 120,
        bottom: smallView ? 0 : 10,
        left: smallView ? 100 : 120,
      }}
      sortByValue={true}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      theme={{ fontSize: smallView ? 12 : 14 }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={chartFillData}
      // legends={[
      //   {
      //     anchor: 'bottom',
      //     direction: 'row',
      //     justify: false,
      //     translateX: 0,
      //     translateY: 56,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: '#999',
      //     itemDirection: 'left-to-right',
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: 'circle',
      //     effects: [
      //       {
      //         on: 'hover',
      //         style: {
      //           itemTextColor: '#000',
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  )
}
