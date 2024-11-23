import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar bg-slate-200 shadow-lg">
            <div className="navbar-start">
                <Link to={"/"} className="btn btn-ghost text-xl">
                    daisyUI
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a>Item 1</a></li>
                <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end gap-5">
                <Link to={"/login"} className="btn">
                    Bejelentkezés
                </Link>
                <Link to={"/register"} className="btn">
                    Regisztráció
                </Link>
            </div>
        </div>
    )
}

export default Navbar