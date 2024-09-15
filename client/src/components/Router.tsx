import { useState } from "react";
import PizzaView from "./PizzaView";
import ToppingView from "./ToppingView";

enum ViewState {
  None,
  Pizza,
  Topping,
}

export default function Router() {
  const [view, setView] = useState<ViewState>(ViewState.None);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Pizza Exercise</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <button
                className="btn"
                onClick={() => setView(ViewState.Topping)}
              >
                Owner View
              </button>
            </li>
            <li>
              <button className="btn" onClick={() => setView(ViewState.Pizza)}>
                Chef View
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="lg:max-w-5xl mx-auto">
        <h2 className="text-4xl">
            {view === ViewState.Topping && "Owner View"}
            {view === ViewState.Pizza && "Chef View"}
            {view === ViewState.None && "Please select a View above"}
        </h2>
        {view === ViewState.Pizza && <PizzaView />}
        {view === ViewState.Topping && <ToppingView />}
      </div>
    </>
  );
}
