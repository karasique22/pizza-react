import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Skeleton from "../components/Skeleton/Skeleton";

const Pizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://6537fe50a543859d1bb11d97.mockapi.io/pizzas/?id=${id}`
        );
        setPizza(data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  if (!pizza) {
    return <Skeleton />;
  }

  return (
    <div>
      <img
        src={pizza.imageUrl}
        alt="Pizza"
      />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default Pizza;
