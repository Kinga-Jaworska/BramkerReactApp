import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div class="navbar">
      <div className="nav-img">{props.children}</div>
    </div>
  );
};

export default Navbar;
