import { ResponsiveLine } from '@nivo/line'

const data = [
  {
    id: 'japan',
    color: 'hsl(122, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 64,
      },
      {
        x: 'helicopter',
        y: 272,
      },
      {
        x: 'boat',
        y: 58,
      },
      {
        x: 'train',
        y: 116,
      },
      {
        x: 'subway',
        y: 76,
      },
      {
        x: 'bus',
        y: 167,
      },
      {
        x: 'car',
        y: 187,
      },
      {
        x: 'moto',
        y: 62,
      },
      {
        x: 'bicycle',
        y: 219,
      },
      {
        x: 'horse',
        y: 129,
      },
      {
        x: 'skateboard',
        y: 210,
      },
      {
        x: 'others',
        y: 229,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(78, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 156,
      },
      {
        x: 'helicopter',
        y: 223,
      },
      {
        x: 'boat',
        y: 184,
      },
      {
        x: 'train',
        y: 212,
      },
      {
        x: 'subway',
        y: 123,
      },
      {
        x: 'bus',
        y: 45,
      },
      {
        x: 'car',
        y: 41,
      },
      {
        x: 'moto',
        y: 198,
      },
      {
        x: 'bicycle',
        y: 43,
      },
      {
        x: 'horse',
        y: 111,
      },
      {
        x: 'skateboard',
        y: 211,
      },
      {
        x: 'others',
        y: 28,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(129, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 273,
      },
      {
        x: 'helicopter',
        y: 141,
      },
      {
        x: 'boat',
        y: 197,
      },
      {
        x: 'train',
        y: 279,
      },
      {
        x: 'subway',
        y: 154,
      },
      {
        x: 'bus',
        y: 169,
      },
      {
        x: 'car',
        y: 32,
      },
      {
        x: 'moto',
        y: 14,
      },
      {
        x: 'bicycle',
        y: 42,
      },
      {
        x: 'horse',
        y: 188,
      },
      {
        x: 'skateboard',
        y: 232,
      },
      {
        x: 'others',
        y: 235,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(107, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 2,
      },
      {
        x: 'helicopter',
        y: 188,
      },
      {
        x: 'boat',
        y: 245,
      },
      {
        x: 'train',
        y: 192,
      },
      {
        x: 'subway',
        y: 28,
      },
      {
        x: 'bus',
        y: 19,
      },
      {
        x: 'car',
        y: 103,
      },
      {
        x: 'moto',
        y: 177,
      },
      {
        x: 'bicycle',
        y: 57,
      },
      {
        x: 'horse',
        y: 230,
      },
      {
        x: 'skateboard',
        y: 28,
      },
      {
        x: 'others',
        y: 195,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(227, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 20,
      },
      {
        x: 'helicopter',
        y: 137,
      },
      {
        x: 'boat',
        y: 133,
      },
      {
        x: 'train',
        y: 2,
      },
      {
        x: 'subway',
        y: 194,
      },
      {
        x: 'bus',
        y: 236,
      },
      {
        x: 'car',
        y: 46,
      },
      {
        x: 'moto',
        y: 275,
      },
      {
        x: 'bicycle',
        y: 291,
      },
      {
        x: 'horse',
        y: 62,
      },
      {
        x: 'skateboard',
        y: 41,
      },
      {
        x: 'others',
        y: 72,
      },
    ],
  },
]

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
export const LineChart = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
)
