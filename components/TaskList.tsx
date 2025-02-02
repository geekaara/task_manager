// components/TaskList.tsx
"use client";

import { trpc } from "@/utils/trpc";
import { useCounterStore } from "@/store/counter";

export function TaskList() {
  const utils = trpc.useContext();

  const { data: tasks, isLoading } = trpc.getTasks.useQuery();
  const toggleTask = trpc.toggleTask.useMutation({
    onSuccess: () => {
      // Updated invalidation syntax
      utils.getTasks.invalidate();
    },
  });

  const count = useCounterStore((state) => state.count);

  if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">Global counter: {count}</div>
      {tasks?.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                toggleTask.mutate({ id: task.id, completed: !task.completed })
              }
              className="h-4 w-4 text-blue-600"
            />
            <div>
              <h3
                className={`text-lg font-medium ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600">{task.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
