import { Topping } from "./ToppingList";

export default function PizzaToppingList({
  toppings,
  selectedToppings,
  setToppings,
  setSelectedToppings,
}: {
  toppings: Topping[];
  selectedToppings: Topping[];
  setToppings: (toppings: Topping[]) => void;
  setSelectedToppings: (toppings: Topping[]) => void;
}) {
  return (
    <>
      <h4 className="text-xl font-semibold">Available Toppings</h4>
      <div className="space-x-2 flex flex-row flex-1">
        {toppings.map((currTopping) => (
          <div
            onClick={() => {
              const newToppings = toppings.filter((topping) => {
                return topping.id !== currTopping.id;
              });
              setToppings(newToppings);
              setSelectedToppings([...selectedToppings, currTopping]);
            }}
            className="badge badge-neutral badge-outline cursor-pointer"
          >
            {currTopping.name}
          </div>
        ))}
        {toppings.length === 0 && <p>None</p>}
      </div>
      <h4 className="text-xl font-semibold">Selected Toppings</h4>
      <div className="space-x-2 flex flex-row flex-1">
        {selectedToppings.map((currTopping) => (
          <div
            onClick={() => {
              const newSelectedToppings = selectedToppings.filter((topping) => {
                return topping.id !== currTopping.id;
              });
              setSelectedToppings(newSelectedToppings);
              setToppings([...toppings, currTopping]);
            }}
            className="badge badge-neutral cursor-pointer"
          >
            {currTopping.name}
          </div>
        ))}
        {selectedToppings.length === 0 && <p>None</p>}
      </div>
    </>
  );
}

