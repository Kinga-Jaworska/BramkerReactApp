import './Navbar.css'

const Navbar = props =>
{
    return(
        <div class='navbar'>
            {props.children}
        </div>
    )

}

export default Navbar