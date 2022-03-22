import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './containers/login/login';
import Admin from './containers/admin/admin';
import GlobalAlert from './containers/globalAlert/globalAlert';

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/admin' element={ <Admin/> }/>
      </Routes>
      <GlobalAlert/>
    </div>
  );
}

export default App;
