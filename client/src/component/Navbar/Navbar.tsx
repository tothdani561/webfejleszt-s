import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar bg-slate-200 shadow-lg">
            <div className="navbar-start">
                <Link to={"/"}>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a>Item 1</a></li>
                <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end gap-5">
                <Link to={"/login"}>
                    <a className="btn">Bejelentkezés</a>
                </Link>
                <Link to={"/register"}>
                    <a className="btn">Regisztráció</a>
                </Link>
            </div>
        </div>
    )
}

export default Navbar