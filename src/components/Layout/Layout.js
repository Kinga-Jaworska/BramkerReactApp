import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <>      
    <MainNavigation />
      <main>{props.children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
