import React from "react";

const StepCard = ({ step, onDelete }) => (
  <li className="border p-3 rounded relative">
    <h3 className="font-semibold">{step.title}</h3>
    <img src={step.image} alt="" className="w-full h-40 object-cover my-2 rounded" />
    <p>{step.description}</p>
    <button
      className="absolute top-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded"
      onClick={() => onDelete(step.id)}
    >
      Delete
    </button>
  </li>
);

export default StepCard;
