import MainPic from './home.jpeg'

const Home = () => {
  return (
    <div style={{height: '85vh', display:'flex'}}>
      <img src={MainPic} alt="" style={{height: '100%'}}/>
      <div>Task List</div>
    </div>

  );
}

export default Home;
