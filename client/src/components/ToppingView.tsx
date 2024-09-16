import { useState } from "react";
import ToppingInput from "./ToppingInput";
import ToppingList, { Topping } from "./ToppingList";
import { ToppingContext } from "./context";

export default function ToppingView() {
  const [toppingList, setToppingList] = useState<Topping[]>([]);
  return (
    <ToppingContext.Provider value={[toppingList, setToppingList]}>
      <div className="border p-4 space-y-4 lg:px-16">
        <ToppingInput />
        <ToppingList
        />
      </div>
    </ToppingContext.Provider>
  );
}
