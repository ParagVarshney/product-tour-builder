import React, { useState } from "react";
import { motion } from "framer-motion";
import initialSteps from "./intialSteps";
import StepCard from "./stepCard";

function Product() {
  const [steps, setSteps] = useState(initialSteps);
  const [current, setCurrent] = useState(0);
  const [editorView, setEditorView] = useState(false);
  const [newStep, setNewStep] = useState({ title: "", image: "", description: "" });

  const handleNext = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleAddStep = () => {
    if (!newStep.title || !newStep.image || !newStep.description) return;
    setSteps([...steps, { ...newStep, id: Date.now() }]);
    setNewStep({ title: "", image: "", description: "" });
  };

  const handleDeleteStep = (id) => {
    const updated = steps.filter((step) => step.id !== id);
    setSteps(updated);
    // Ensure current index doesn't go out of bounds
    if (current >= updated.length) {
      setCurrent(Math.max(0, updated.length - 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Interactive Product Tour Builder</h1>

        <div className="flex justify-center mb-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
            onClick={() => setEditorView(false)}
          >
            Start Demo
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded"
            onClick={() => setEditorView(true)}
          >
            Editor View
          </button>
        </div>

        {!editorView ? (
          <motion.div
            key={steps[current]?.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{steps[current]?.title}</h2>
            <img
              src={steps[current]?.image}
              alt="step"
              className="w-full h-60 object-cover mb-4 rounded"
            />
            <p className="mb-4">{steps[current]?.description}</p>

            <div className="flex gap-2">
              {current > 0 && (
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
              )}
              {current < steps.length - 1 && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Step</h2>

            <input
              className="w-full p-2 mb-2 border rounded"
              placeholder="Title"
              value={newStep.title}
              onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              placeholder="Image URL"
              value={newStep.image}
              onChange={(e) => setNewStep({ ...newStep, image: e.target.value })}
            />
            <textarea
              className="w-full p-2 mb-2 border rounded"
              placeholder="Description"
              value={newStep.description}
              onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
            />
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleAddStep}
            >
              Add Step
            </button>

            <h2 className="text-xl font-semibold mt-6 mb-2">Live Preview</h2>
           <ul className="space-y-4">
              {steps.map((step) => (
                <StepCard key={step.id} step={step} onDelete={handleDeleteStep} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
