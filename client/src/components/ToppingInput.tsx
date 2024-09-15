import { useState } from "react";

export default function ToppingInput() {
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-bold">Add new topping</h3>
      <div className="flex flex-row items-end space-x-8">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Topping Name</span>
          </div>
          <input
            name="New Topping Name"
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <button onClick={() => {
          // MAKE API REQUEST
          setName("");
        }} className="btn btn-success text-white">Add Topping</button>
      </div>
    </div>
  );
}
