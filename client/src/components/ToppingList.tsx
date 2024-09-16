import { useContext, useEffect, useState } from "react";
import { ToppingContext } from "./context";

export type Topping = {
  id: number;
  name: string;
};

export default function ToppingList() {
  const [toppingList, setToppingList] = useContext(ToppingContext)!;

  useEffect(() => {
    // make API call
    async function fetchData() {
      const res = await fetch("/api/topping");
      const json = await res.json();
      setToppingList(json);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">All toppings</h3>
      <div className="flex flex-col space-y-2">
        {toppingList.map((topping) => {
          return <ListItem topping={topping} key={topping.id} />;
        })}
      </div>
    </div>
  );
}

function UpdateInput({
  name,
  topping,
  setToppingList,
  setIsEditting,
  setName,
}: {
  name: string;
  topping: Topping;
  setToppingList: (toppings: Topping[]) => void;
  setIsEditting: (newVal: boolean) => void;
  setName: (newName: string) => void;
}) {
  return (
    <div className="flex flex-row space-x-2">
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        className="input input-bordered"
      ></input>
      <button
        className="btn btn-success text-white"
        onClick={async () => {
          let newToppings = topping;
          newToppings.name = name;

          await fetch("/api/topping", {
            method: "PATCH",
            body: JSON.stringify(newToppings),
          });

          const res = await fetch("/api/topping");
          const json = await res.json();
          setToppingList(json);

          setIsEditting(false);
        }}
      >
        Save
      </button>
    </div>
  );
}

function ListItem({ topping }: { topping: Topping }) {
  const [_toppingList, setToppingList] = useContext(ToppingContext)!;

  const [isEditting, setIsEditting] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(topping.name);
  }, []);

  return (
    <div
      key={topping.id}
      className="flex flex-row border items-center justify-between p-1"
    >
      {!isEditting ? (
        <p className="text-xl font-semibold ml-2">{topping.name}</p>
      ) : (
        <UpdateInput
          name={name}
          topping={topping}
          setToppingList={setToppingList}
          setIsEditting={setIsEditting}
          setName={setName}
        />
      )}
      <div className="space-x-2">
        <button
          onClick={async () => {
            await fetch("/api/topping", {
              method: "DELETE",
              body: JSON.stringify({
                id: topping.id,
              }),
            });

            const res = await fetch("/api/topping");
            const json = await res.json();
            setToppingList(json);
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
  );
}
