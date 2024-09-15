import { useEffect, useState } from "react";
import { Topping } from "./ToppingList";
import PizzaToppingList from "./PizzaToppingList";

const exampleData: Topping[] = [
  { id: 1, name: "mushrooms" },
  { id: 2, name: "corn" },
  { id: 3, name: "ranch" },
  { id: 4, name: "cheese" },
];

export default function PizzaInput() {
  const [name, setName] = useState("");
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);

  useEffect(() => {
    // MAKE CALL
    setToppings(exampleData);
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
        onClick={() => {
          // Make API call
          setSelectedToppings([]);
          setName("");
          setToppings(exampleData);
        }}
        className="btn btn-success w-28 text-white"
      >
        Add Pizza
      </button>
    </div>
  );
}
