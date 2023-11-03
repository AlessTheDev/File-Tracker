import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <Link className="element" to={"/Files"}>
                    <h1>Files</h1>
                    <div className='line'><div></div></div>
                </Link>
                <Link className="element" to={"/Categories"}>
                    <h1>Categories</h1>
                    <div className='line'><div></div></div>
                </Link>
            </div>
        </>
    )
}

export default Navbar