import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './containers/login/login';
import Admin from './containers/admin/admin';

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/admin' element={ <Admin/> }/>
      </Routes>
    </div>
  );
}

export default App;
