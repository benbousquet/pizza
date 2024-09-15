import { useEffect, useState } from "react";

export type Topping = {
  id: number;
  name: string;
};

const exampleData: Topping[] = [
  { id: 1, name: "mushrooms" },
  { id: 2, name: "corn" },
  { id: 3, name: "ranch" },
  { id: 4, name: "cheese" },
];
export default function ToppingList() {
  const [toppingList, setToppingList] = useState<Topping[]>([]);

  useEffect(() => {
    // make API call
    setToppingList(exampleData);
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold">All toppings</h3>
      <div className="flex flex-col space-y-2">
        {toppingList.map((topping) => {
          return <ListItem topping={topping} />;
        })}
      </div>
    </div>
  );
}

function ListItem({ topping }: { topping: Topping }) {
  const [isEditting, setIsEditting] = useState(false);
  const [name, setName] = useState(topping.name);

  function UpdateInput() {
    return (
      <div className="flex flex-row space-x-2">
        <input
          name="Topping Name"
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
    <div
      key={topping.id}
      className="flex flex-row border items-center justify-between p-1"
    >
      {!isEditting ? (
        <p className="text-xl font-semibold ml-2">{topping.name}</p>
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
  );
}
