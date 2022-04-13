import {VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryTheme} from 'victory';

const SalesBarChart = (props) => {
  return (
    <div>
      <h1>Sales Per Quarter</h1>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => (`$${x / 1000}k`)} />
        <VictoryBar data={props.data} x="quarter" y="earnings"/>
      </VictoryChart>
    </div>
  );
}

export default SalesBarChart;
