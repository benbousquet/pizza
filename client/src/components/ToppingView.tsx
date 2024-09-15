import ToppingInput from "./ToppingInput";
import ToppingList from "./ToppingList";

export default function ToppingView() {
    return (
        <div className="border p-4 space-y-4 lg:px-16">
            <ToppingInput />
            <ToppingList />
        </div>
    )
}