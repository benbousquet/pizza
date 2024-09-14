
import { useState } from "react"
import PizzaView from "./pizzaView";
import ToppingView from "./ToppingView";

enum ViewState {
    None,
    Pizza,
    Topping
}

export default function Router() {
    const [view, setView] = useState<ViewState>(ViewState.None);

    return (
        <>
            <div>
                <button className="btn" onClick={() => setView(ViewState.Topping)}>Owner View</button>
                <button className="btn" onClick={() => setView(ViewState.Pizza)}>Chef View</button>
            </div>
            {view === ViewState.Pizza && <PizzaView />}
            {view === ViewState.Topping && <ToppingView />}
        </>
    )
}