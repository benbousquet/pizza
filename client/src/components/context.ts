import { createContext } from "react";
import { Topping } from "./ToppingList";
import { Pizza } from "./PizzaList";

const ToppingContext = createContext<[toppingList: Topping[], setToppingList: (toppings: Topping[]) => void] | null>(null);
const PizzaContext = createContext<[pizzas: Pizza[], setPizzas: (pizzas: Pizza[]) => void] | null>(null);
export {ToppingContext, PizzaContext};