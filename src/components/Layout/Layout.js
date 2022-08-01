import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="all-wraper">
      <MainNavigation />
      <div className="main">{props.children}</div>      
      <Footer />
    </div>
  );
};

export default Layout;
