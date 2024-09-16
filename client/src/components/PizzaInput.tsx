import { useContext, useEffect, useState } from "react";
import { Topping } from "./ToppingList";
import PizzaToppingList from "./PizzaToppingList";
import { Pizza } from "./PizzaList";
import { PizzaContext } from "./context";

export default function PizzaInput() {
  const [_pizzas, setPizzas] = useContext(PizzaContext)!;
  const [name, setName] = useState("");
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    // make API call
    async function fetchData() {
      const res = await fetch("/api/topping");
      const json = await res.json();
      setToppings(json);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col border p-4 space-y-4 lg:px-16">
      <h3 className="text-3xl font-bold">Add new pizza</h3>
      <div className="flex flex-col space-y-6">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pizza Name</span>
          </div>
          <input
            name="Pizza Name"
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </div>
      <PizzaToppingList
        toppings={toppings}
        selectedToppings={selectedToppings}
        setToppings={setToppings}
        setSelectedToppings={setSelectedToppings}
      />
      <button
        disabled={name === "" || selectedToppings.length === 0}
        onClick={async () => {
          const newPizza: Pizza = {
            id: Math.floor(Math.random() * 1000000),
            name,
            toppings: selectedToppings,
          };
          // Make API call
          await fetch("/api/pizza", {
            method: "POST",
            body: JSON.stringify(newPizza),
          });
          setSelectedToppings([]);
          setName("");
          let res = await fetch("/api/topping");
          let json = await res.json();
          setToppings(json);

          res = await fetch("/api/pizza");
          json = await res.json();
          setPizzas(json);
        }}
        className="btn btn-success w-28 text-white"
      >
        Add Pizza
      </button>
    </div>
  );
}
