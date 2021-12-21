import React from 'react';
import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/navigation/MainNavigation';

const Layout = props => {
  return (
    <React.Fragment>
      <MainNavigation />  
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  )
}

export default Layout;