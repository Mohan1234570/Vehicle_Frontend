import './SideBar.css';
import React from 'react'
import { IoIosHome, IoIosCar } from "react-icons/io";
import 
{ BsGrid1X2Fill, BsFillArchiveFill}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom';


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                 VehiclesApp
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <IoIosHome className='icon'/> Home
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/all-scenarios">
                    <BsFillArchiveFill className='icon'/> All Scenario's
                </Link>
            </li>
            
            <li className='sidebar-list-item'>
                <Link to="/add-vehicle">
                    <IoIosCar className='icon'/> Add Vehicle
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/add-scenario">
                    <BsGrid1X2Fill className='icon'/> Add Scenario
                </Link>
            </li>
            
        </ul>
    </aside>
  )
}

export default Sidebar
