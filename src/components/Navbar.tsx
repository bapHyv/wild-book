import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <Link to="/">
        <h1 className="homePageTitle">Wilders Book</h1>
      </Link>
      <ul>
        <li>
          <Link to={"wilders"}>Wilders</Link>
        </li>
        <li>
          <Link to={"skills"}>Skills</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
