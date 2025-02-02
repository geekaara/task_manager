// app/page.tsx
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Manager</h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          <CreateTaskForm />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          <TaskList />
        </section>
      </div>
    </main>
  );
}
