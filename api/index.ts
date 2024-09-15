import { Hono } from "hono";

export type Topping = {
  id: number;
  name: string;
};

type Pizza = {
  id: number;
  name: string;
  toppings: Topping[];
};

let toppingList: Topping[] = [
  { id: 1, name: "mushrooms" },
  { id: 2, name: "corn" },
  { id: 3, name: "ranch" },
  { id: 4, name: "cheese" },
];

let pizzaList: Pizza[] = [
  { id: 1, name: "cheese", toppings: [toppingList[3]] },
  { id: 2, name: "garden", toppings: [...toppingList] },
  {
    id: 3,
    name: "korean corn",
    toppings: [toppingList[1], toppingList[2], toppingList[3]],
  },
];

function isPizza(pizza: any): boolean {
  if (!pizza) return false;

  return pizza.id && pizza.name && pizza.toppings;
}

function isTopping(topping: any): boolean {
  if (!topping) return false;

  return topping.id && topping.name;
}

function addPizza(newPizza: Pizza): boolean {
  const idx = pizzaList.findIndex((pizza) => newPizza.name === pizza.name);
  if (idx !== -1) return false;
  pizzaList = [...pizzaList, newPizza];
  return true;
}

function addTopping(newTopping: Topping): boolean {
  const idx = toppingList.findIndex(
    (topping) => newTopping.name === topping.name
  );
  if (idx !== -1) return false;
  toppingList = [...toppingList, newTopping];
  return true;
}

function updatePizza(newPizza: Pizza): boolean {
  const idx = pizzaList.findIndex((pizza) => newPizza.id === pizza.id);
  if (idx === -1) return false;
  pizzaList[idx] = newPizza;
  return true;
}

function updateTopping(newTopping: Topping) {
  const idx = toppingList.findIndex((topping) => newTopping.id === topping.id);
  if (idx === -1) return false;
  toppingList[idx] = newTopping;
  // update all pizzas
  pizzaList.forEach((pizza, idx) => {
    const toppingIdx = pizza.toppings.findIndex(
      (tp) => tp.id === newTopping.id
    );
    if (toppingIdx !== -1) {
      pizzaList[idx].toppings[toppingIdx] = newTopping;
    }
  });
  return true;
}

function deletePizza(id: number) {
  const newPizzaList = pizzaList.filter((pizza) => pizza.id !== id);
  pizzaList = newPizzaList;
}

function deleteTopping(id: number) {
  const newToppingList = toppingList.filter((topping) => topping.id !== id);
  toppingList = newToppingList;
  pizzaList.forEach((pizza, idx) => {
    pizzaList[idx].toppings = pizza.toppings.filter(
      (topping) => topping.id !== id
    );
  });
}

const app = new Hono().basePath("/api");

app.get("/ping", (c) => c.json({ msg: "pong" }));

app.get("/pizza", (c) => c.json(pizzaList));
app.get("/topping", (c) => c.json(toppingList));

app.post("/reset", (c) => {
  toppingList = [
    { id: 1, name: "mushrooms" },
    { id: 2, name: "corn" },
    { id: 3, name: "ranch" },
    { id: 4, name: "cheese" },
  ];

  pizzaList = [
    { id: 1, name: "cheese", toppings: [toppingList[3]] },
    { id: 2, name: "garden", toppings: [...toppingList] },
    {
      id: 3,
      name: "korean corn",
      toppings: [toppingList[1], toppingList[2], toppingList[3]],
    },
  ];

  return c.json({ message: "Reset all data" }, 201);
});

app.post("/pizza", async (c) => {
  const body = await c.req.json();
  if (!isPizza(body)) return c.json({ message: "Invalid body" }, 400);
  const newPizza: Pizza = body;
  if (!addPizza(newPizza)) {
    return c.json({ message: "Pizza already exists" }, 400);
  }
  return c.json({ message: "Added pizza" }, 201);
});

app.post("/topping", async (c) => {
  const body = await c.req.json();
  if (!isTopping(body)) return c.json({ message: "Invalid body" }, 400);
  const newTopping: Topping = body;
  if (!addTopping(newTopping)) {
    return c.json({ message: "Topping already exists" }, 400);
  }
  return c.json({ message: "Added topping" }, 201);
});

app.patch("/pizza", async (c) => {
  const body = await c.req.json();
  if (!isPizza(body)) return c.json({ message: "Invalid body" }, 400);
  const newPizza: Pizza = body;
  if (!updatePizza(newPizza)) {
    return c.json({ message: "Pizza does not exist" }, 400);
  }
  return c.json({ message: "Modified pizza" }, 201);
});

app.patch("/topping", async (c) => {
  const body = await c.req.json();
  if (!isTopping(body)) return c.json({ message: "Invalid body" }, 400);
  const newTopping: Topping = body;
  if (!updateTopping(newTopping)) {
    return c.json({ message: "Topping does not exist" }, 400);
  }
  return c.json({ message: "Modified topping" }, 201);
});

app.delete("/pizza", async (c) => {
  const body = await c.req.json();
  if (!body.id) return c.json({ message: "Invalid body" }, 400);
  deletePizza(body.id);
  return c.json({ message: "Deleted pizza" }, 201);
});

app.delete("/topping", async (c) => {
  const body = await c.req.json();
  if (!body.id) return c.json({ message: "Invalid body" }, 400);
  deleteTopping(body.id);
  return c.json({ message: "Deleted topping" }, 201);
});

export default app;
