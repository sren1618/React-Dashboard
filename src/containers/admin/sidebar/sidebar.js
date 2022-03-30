import {Link, useLocation} from 'react-router-dom'
import  './sidebar.scss'
import sidebarMenu from '../../../config/sidebarMenu';
import {useState} from 'react';

let menuState = {}
const Sidebar = () => {

  let location = useLocation();

  const [menu, setMenu] = useState( () => {
    sidebarMenu.map( (menu) => { menuState[menu.key] = {
      style:'collapse',
      isSubmenu: menu.submenu
    }})
    const [subPath, path ] = location.pathname.split("/").reverse()
    if(path !== 'admin'){
      return {...menuState, [path]: {...menuState[path], style:'collapse show'} }
    }else {
      return {...menuState}
    }
  })

  const handleMenuClick = (item) => {
    if(menu.hasOwnProperty(item)){
      if(menu[item].isSubmenu){
        setMenu({
          ...menuState,
          [item]: menu[item].style ==='collapse'?{...menuState[item], style:'collapse show'}:{...menuState[item], style:'collapse'}})
      }else{
        setMenu(menuState)
      }
    }
  }

  const createSidebarMenu = (sidebarMenu) => {
    return sidebarMenu.map((item) => {
      if(!item.children){
        return (
          <Link to={item.path}  key={item.key}>
            <button className="btn btn-primary" type="button"
                    onClick={() => {handleMenuClick(item.key)}}>
              {item.title}
            </button>
          </Link>
        )
      }else{
        return (
          <div key={item.key} >
            <button className="btn btn-primary" type="button"
                    onClick={() => {handleMenuClick(item.key)}}>
              {item.title}
            </button>
            <div className={`submenu ${menu[item.key]['style']}`} id={item.key}>
              { createSidebarMenu(item.children) }
            </div>
          </div>
        )
      }
    })
  }

  return (
    <div className='sidebar'>
      {createSidebarMenu(sidebarMenu)}
    </div>
  );
}

export default Sidebar;
