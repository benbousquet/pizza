import { useState } from "react";
import { PizzaContext } from "./context";
import PizzaInput from "./PizzaInput";
import PizzaList, { Pizza } from "./PizzaList";

export default function PizzaView() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  return (
    <PizzaContext.Provider value={[pizzas, setPizzas]}>
      <div className="space-y-2">
        <PizzaInput />
        <PizzaList />
      </div>
    </PizzaContext.Provider>
  );
}
