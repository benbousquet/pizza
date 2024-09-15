import app from ".";

test("GET /ping", async () => {
  const req = new Request("localhost:3000/api/ping", {
    method: "GET",
  });
  const res = await app.request(req);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({
    msg: "pong",
  });
});

test("POST /reset", async () => {
  const req = new Request("localhost:3000/api/reset", {
    method: "POST",
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Reset all data" });
});

test("Invalid POST /topping", async () => {
  const req = new Request("localhost:3000/api/topping", {
    method: "POST",
    body: JSON.stringify({ message: "Hello" }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(400);
  expect(await res.json()).toEqual({ message: "Invalid body" });
});

test("Invalid POST /pizza", async () => {
  const req = new Request("localhost:3000/api/pizza", {
    method: "POST",
    body: JSON.stringify({ message: "Hello" }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(400);
  expect(await res.json()).toEqual({ message: "Invalid body" });
});

test("POST /topping", async () => {
  const req = new Request("localhost:3000/api/topping", {
    method: "POST",
    body: JSON.stringify({ id: 12, name: "bacon" }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Added topping" });
});

test("POST /pizza", async () => {
  const req = new Request("localhost:3000/api/pizza", {
    method: "POST",
    body: JSON.stringify({
      id: 23,
      name: "mega meat",
      toppings: [
        { id: 12, name: "bacon" },
        { id: 4, name: "cheese" },
      ],
    }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Added pizza" });
});

test("PATCH /topping", async () => {
  const req = new Request("localhost:3000/api/topping", {
    method: "PATCH",
    body: JSON.stringify({
      id: 4,
      name: "mozz cheese",
    }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Modified topping" });
});

test("PATCH /topping", async () => {
  const req = new Request("localhost:3000/api/topping", {
    method: "PATCH",
    body: JSON.stringify({
      id: 4,
      name: "mozz cheese",
    }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Modified topping" });
});

test("PATCH /pizza", async () => {
  const req = new Request("localhost:3000/api/pizza", {
    method: "PATCH",
    body: JSON.stringify({
      id: 1,
      name: "mozz cheese",
      toppings: [
        {
          id: 4,
          name: "mozz cheese",
        },
        {
          id: 2,
          name: "corn",
        },
      ],
    }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Modified pizza" });
});

test("DELETE /topping", async () => {
  const req = new Request("localhost:3000/api/topping", {
    method: "DELETE",
    body: JSON.stringify({
      id: 4,
    }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Deleted topping" });
});

test("DELETE /pizza", async () => {
  const req = new Request("localhost:3000/api/pizza", {
    method: "DELETE",
    body: JSON.stringify({
      id: 1,
    }),
  });
  const res = await app.request(req);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ message: "Deleted pizza" });
});

test("GET /pizza", async () => {
  const req = new Request("localhost:3000/api/pizza", {
    method: "GET",
  });
  const res = await app.request(req);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual([
    {
      id: 2,
      name: "garden",
      toppings: [
        {
          id: 1,
          name: "mushrooms",
        },
        {
          id: 2,
          name: "corn",
        },
        {
          id: 3,
          name: "ranch",
        },
      ],
    },
    {
      id: 3,
      name: "korean corn",
      toppings: [
        {
          id: 2,
          name: "corn",
        },
        {
          id: 3,
          name: "ranch",
        },
      ],
    },
    {
      id: 23,
      name: "mega meat",
      toppings: [
        {
          id: 12,
          name: "bacon",
        },
      ],
    },
  ]);
});

test("GET /topping", async () => {
  const req = new Request("localhost:3000/api/topping", {
    method: "GET",
  });
  const res = await app.request(req);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual([
    { id: 1, name: "mushrooms" },
    { id: 2, name: "corn" },
    { id: 3, name: "ranch" },
    { id: 12, name: "bacon" },
  ]);
});
