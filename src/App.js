import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Login from './containers/login/login';
import Admin from './containers/admin/admin';
import GlobalAlert from './containers/globalAlert/globalAlert';
import Products from './containers/products/products';

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/admin' element={ <Admin/> }>
          <Route path='home' element={<Products/>}/>
          <Route path='prod' element={<Products/>}>
            <Route path='categories' element={<Products/>}/>
            <Route path='products' element={<Products/>}/>
          </Route>
          <Route path='user' element={<Products/>}/>
          <Route path='role' element={<Products/>}/>
          <Route path='charts' element={<Products/>}>
            <Route path='1' element={<Products/>}/>
            <Route path='2' element={<Products/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Navigate to={'/'} />}/>
      </Routes>
      <GlobalAlert/>
    </div>
  );
}

export default App;
