import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Login from './containers/login/login';
import Admin from './containers/admin/admin';
import GlobalAlert from './containers/globalAlert/globalAlert';

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/admin' element={ <Admin/> }>
          <Route path='home' element={<Login/>}/>
            <Route path='prod/category' element={<Login/>}/>
              <Route path='prod/products' element={<Login/>}/>
                <Route path='user' element={<Login/>}/>
                  <Route path='role' element={<Login/>}/>


        </Route>

        <Route path='*' element={<Navigate to={'/'} />}/>
      </Routes>
      <GlobalAlert/>
    </div>
  );
}

export default App;
