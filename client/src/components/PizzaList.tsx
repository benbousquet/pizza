import { useContext, useEffect, useState } from "react";
import { Topping } from "./ToppingList";
import PizzaToppingList from "./PizzaToppingList";
import { PizzaContext } from "./context";

export type Pizza = {
  id: number;
  name: string;
  toppings: Topping[];
};

export default function PizzaList() {
  const [pizzas, setPizzas] = useContext(PizzaContext)!;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/pizza");
      const json = await res.json();
      setPizzas(json);
    }
    fetchData();
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
function UpdateInput({
  name,
  setName,
  setIsEditting,
  getUpdatedPizza,
}: {
  name: string;
  setName: (newVal: string) => void;
  setIsEditting: (newVal: boolean) => void;
  getUpdatedPizza: () => Pizza;
}) {
  const [_pizzas, setPizzas] = useContext(PizzaContext)!;
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
        onClick={async () => {
          await fetch("/api/pizza", {
            method: "PATCH",
            body: JSON.stringify(getUpdatedPizza()),
          });
          const res = await fetch("/api/pizza");
          const json = await res.json();
          setPizzas(json);
          setIsEditting(false);
        }}
      >
        Save
      </button>
    </div>
  );
}

function ListItem({ pizza }: { pizza: Pizza }) {
  const [_pizzas, setPizzas] = useContext(PizzaContext)!;
  const [name, setName] = useState(pizza.name);
  const [isEditting, setIsEditting] = useState(false);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>(
    pizza.toppings
  );

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/topping");
      const json: Topping[] = await res.json();
      // XOR toppings and selected toppings
      const newToppings = json.filter((currTopping) => {
        const idx = selectedToppings.findIndex((curr) => {
          return curr.id === currTopping.id;
        });
        return idx === -1;
      });
      setToppings(newToppings);
    }
    fetchData();
  }, []);

  function getUpdatePizza(): Pizza {
    let newPizza = pizza;
    newPizza.name = name;
    newPizza.toppings = selectedToppings;
    return newPizza;
  }

  return (
    <div key={pizza.id} className="flex flex-col border p-1">
      <div className="flex flex-row items-center justify-between">
        {!isEditting ? (
          <p className="text-xl font-semibold ml-2">{pizza.name}</p>
        ) : (
          <UpdateInput
            name={name}
            setName={setName}
            setIsEditting={setIsEditting}
            getUpdatedPizza={getUpdatePizza}
          />
        )}
        <div className="space-x-2">
          <button
            onClick={async () => {
              await fetch("/api/pizza", {
                method: "DELETE",
                body: JSON.stringify({ id: pizza.id }),
              });

              const res = await fetch("/api/pizza");
              const json = await res.json();
              setPizzas(json);
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
