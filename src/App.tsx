import "./App.css";

import Navbar from "./components/Navbar";

import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        {<Outlet />}
      </main>
      <footer>
        <p>&copy; 2022 Wild Code School</p>
      </footer>
    </div>
  );
}

export default App;
