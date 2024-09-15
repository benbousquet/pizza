import { useEffect, useState } from "react";
import { Topping } from "./ToppingList";
import PizzaToppingList from "./PizzaToppingList";

type Pizza = {
  id: number;
  name: string;
  toppings: Topping[];
};

const exampleToppings: Topping[] = [
  { id: 1, name: "mushrooms" },
  { id: 2, name: "corn" },
  { id: 3, name: "ranch" },
  { id: 4, name: "cheese" },
];

const examplePizza: Pizza[] = [
  { id: 1, name: "cheese", toppings: [exampleToppings[3]] },
  { id: 2, name: "garden", toppings: [...exampleToppings] },
  {
    id: 3,
    name: "korean corn",
    toppings: [exampleToppings[1], exampleToppings[2], exampleToppings[3]],
  },
];

export default function PizzaList() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    // MAKE API CALL
    setPizzas(examplePizza);
  }, []);

  return (
    <div className="border p-4 space-y-4 lg:px-16">
      <h3 className="text-3xl font-bold">Pizzas</h3>
      <div className="space-y-2">
        {pizzas.map((pizza) => (
          <ListItem pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

function ListItem({ pizza }: { pizza: Pizza }) {
  const [isEditting, setIsEditting] = useState(false);
  const [name, setName] = useState(pizza.name);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>(
    pizza.toppings
  );

  useEffect(() => {
    // MAKE API CALL
    const res = exampleToppings;
    // XOR toppings and selected toppings
    const newToppings = res.filter((currTopping) => {
      const idx = selectedToppings.findIndex((curr) => {
        return curr.id === currTopping.id;
      });
      return idx === -1;
    });
    setToppings(newToppings);
  }, []);

  function UpdateInput() {
    return (
      <div className="flex flex-row space-x-2">
        <input
          name="Pizza Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
        ></input>
        <button
          className="btn btn-success text-white"
          onClick={() => {
            //!! MAKE API CALL HERE
            setIsEditting(false);
          }}
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div key={pizza.id} className="flex flex-col border p-1">
      <div className="flex flex-row items-center justify-between">
        {!isEditting ? (
          <p className="text-xl font-semibold ml-2">{pizza.name}</p>
        ) : (
          <UpdateInput />
        )}
        <div className="space-x-2">
          <button
            onClick={() => {
              // MAKE API CALL HERE
            }}
            className="btn btn-error"
          >
            Delete
          </button>
          <button
            onClick={() => setIsEditting(true)}
            disabled={isEditting}
            className="btn btn-accent"
          >
            Update
          </button>
        </div>
      </div>
      {!isEditting ? (
        <div className="m-1 space-x-2 flex flex-row flex-1">
          {pizza.toppings.map((topping) => (
            <div className="badge badge-neutral badge-outline cursor-pointer">
              {topping.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 space-y-4">
          <PizzaToppingList
            toppings={toppings}
            selectedToppings={selectedToppings}
            setToppings={setToppings}
            setSelectedToppings={setSelectedToppings}
          />
        </div>
      )}
    </div>
  );
}
