import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
