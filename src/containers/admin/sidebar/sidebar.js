import { Link } from 'react-router-dom'
import  './sidebar.scss'
import sidebarMenu from '../../../config/sidebarMenu';
import {useEffect, useState} from 'react';


const Sidebar = () => {

  let menuState = {}
  sidebarMenu.map( (menu) => {    menuState[menu.key] = 'collapse'   })

  const [menu, setMenu] = useState(menuState)

  const handleMenuClick = (item) => {
    if(menu.hasOwnProperty(item)){
      setMenu({...menuState, [item]: menu[item] ==='collapse'?'collapse show':'collapse'})
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
            <button  className="btn btn-primary" type="button"
                    onClick={() => {handleMenuClick(item.key)}}>
              {item.title}
            </button>
            <div className={`submenu ${menu[item.key]}`} id={item.key}>
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
