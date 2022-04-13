import {VictoryPie} from 'victory';
const sampleData =
  [
    { x: "QLD", y: 35 },
    { x: "NSW", y: 40 },
    { x: "SA", y: 55 },
    { x: "VIC", y: 55 },
    { x: "NT", y: 55 },
    { x: "TA", y: 55 },
    { x: "ACT", y: 55 },
    { x: "NZ", y: 55 },
    { x: "Oversea", y: 55 },
  ]

const VisitorsPieChart = () => {
  return (
    <div>
      VisitorsChart
      <VictoryPie
        colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
        data={sampleData}
      />
    </div>
  );
}

export default VisitorsPieChart;
