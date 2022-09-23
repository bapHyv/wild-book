import { useEffect, useState } from "react";

import axios from "axios";
import { IWilderProps } from "../interfaces/interfaces";
import Wilder from "../components/Wilder";
import Form from "../components/Form";

import { Link } from "react-router-dom";

const Wilders = () => {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);

  const fetchWilders = async () => {
    const wilders = await axios.get("http://localhost:5000/api/wilder");
    setWilders(wilders.data);
  };

  useEffect(() => {
    fetchWilders();
  }, []);

  return (
    <main className="container">
      <h2>Wilders</h2>
      <section className="card-row">
        {wilders &&
          wilders.map((e, i) => (
            <Link key={e.name + i.toString()} to={`${e.id}`}>
              <Wilder
                name={e.name}
                id={e.id}
                description={e.description}
                skills={e.skills}
              />
            </Link>
          ))}
      </section>
      <Form fetchWilders={fetchWilders} />
    </main>
  );
};

export default Wilders;
