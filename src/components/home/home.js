import MainPic from './home.jpeg'

const Home = () => {
  return (
    <>
    <div style={{height: '85vh', display:'flex', padding: '1rem'}}>
      <img src={MainPic} alt="" style={{height: '100%'}}/>
    </div>
    </>
  );
}

export default Home;
