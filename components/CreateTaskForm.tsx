// components/CreateTaskForm.tsx
"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useCounterStore } from "@/store/counter";

export function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const utils = trpc.useContext();
  const { increment } = useCounterStore();

  const createTask = trpc.createTask.useMutation({
    onSuccess: () => {
      utils.getTasks.invalidate();
      setTitle("");
      setDescription("");
      increment(); // Increment counter on task creation
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTask.mutate({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={createTask.isLoading}
      >
        {createTask.isLoading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
