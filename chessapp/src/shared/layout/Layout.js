import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/navigation/Header';

const Layout = props => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  )
}

export default Layout;