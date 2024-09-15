import PizzaInput from "./PizzaInput";
import PizzaList from "./PizzaList";

export default function PizzaView() {
    return (
        <div className="space-y-2">
            <PizzaInput />
            <PizzaList />
        </div>
    )
}