import './salesCharts.scss'
import SalesBarChart from '../../components/salesBarChart/salesBarChart';
import SalesLineChart from '../../components/salesLineChart/salesLineChart';


const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
]

const SalesCharts = () => {
  return (
    <div className='charts'>
      <SalesBarChart data={data} />
      <SalesLineChart />
    </div>
  );
}

export default SalesCharts;
