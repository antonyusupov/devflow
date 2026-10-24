import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import StatCard from "./StatCard";

function TaskManager() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskPriority, setTaskPriority] = useState("medium");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);
  let filteredTasks;
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  if (filter === "all") {
    filteredTasks = tasks;
  } else if (filter === "completed") {
    filteredTasks = completedTasks;
  } else if (filter === "pending") {
    filteredTasks = pendingTasks;
  }

  const priorityFilteredTasks = filteredTasks.filter((task) => {
    if (priorityFilter === "all") {
      return true;
    }

    return (task.priority ?? "medium") === priorityFilter;
  });
  const searchResults = priorityFilteredTasks.filter((task) =>
    task.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const editTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  return (
    <section className="mt-8 rounded-xl bg-slate-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">My Tasks</h2>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard title="Completed" value={completedTasks.length} />
        <StatCard title="Pending" value={pendingTasks.length} />
      </div>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          className="ml-3 rounded-lg bg-violet-600 px-5 py-3 hover:bg-violet-700"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="ml-3 rounded-lg bg-violet-600 px-5 py-3 hover:bg-violet-700"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className="ml-3 rounded-lg bg-violet-600 px-5 py-3 hover:bg-violet-700"
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>
      <div>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <input
          type="text"
          placeholder="Enter a task..."
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          className="min-w-0 flex-1 rounded-lg bg-slate-800 p-3 text-white"
          value={input}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={() => {
            if (input.trim() === "") {
              setError("Task title cannot be empty!");
              return;
            }
            if (
              tasks.some(
                (task) =>
                  task.title.toLowerCase() === input.trim().toLowerCase(),
              )
            ) {
              setError("This task already exists!");
              return;
            }
            setTasks((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                title: input.trim(),
                completed: false,
                priority: taskPriority,
              },
            ]);
            setInput("");
            setTaskPriority("medium");
            setError("");
          }}
          className="ml-3 shrink-0 rounded-lg bg-violet-600 px-5 py-3 whitespace-nowrap hover:bg-violet-700"
        >
          Add Task
        </button>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="mt-5 space-y-3">
        {searchResults.map((task, index) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-lg bg-slate-800 p-4 transition-colors hover:bg-slate-700"
          >
            <div className="flex w-full items-center gap-3 p-1">
              {editingId === task.id ? (
                <div className="flex w-full flex-col">
                  <p className="mb-1">Editing task</p>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => {
                      {
                        setEditTitle(e.target.value);
                        setEditError("");
                      }
                    }}
                    className="w-full rounded-lg border border-violet-500 bg-slate-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingId(null);
                      }}
                      className="m-1 cursor-pointer rounded-md bg-gray-600 p-1 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (editTitle.trim() === "") {
                          setEditError("Task title cannot be empty!");
                          return;
                        }

                        if (
                          tasks.some(
                            (task) =>
                              task.title.toLowerCase() ===
                                editTitle.trim().toLowerCase() &&
                              task.id !== editingId,
                          )
                        ) {
                          setEditError(
                            "A task with this title already exists!",
                          );
                          return;
                        }

                        editTask(editingId, editTitle.trim());
                        setEditingId(null);
                        setEditError("");
                      }}
                      className="cursor-pointer rounded-md bg-violet-600 px-3 py-2 text-white transition-colors duration-200 hover:bg-violet-800"
                    >
                      Save
                    </button>
                    {editError && (
                      <p className="mt-2 text-sm text-red-400">{editError}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between gap-8">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="h-5 w-5 cursor-pointer accent-violet-600"
                    onChange={() => {
                      setTasks((prev) =>
                        prev.map((item) =>
                          item.id === task.id
                            ? { ...item, completed: !item.completed }
                            : item,
                        ),
                      );
                    }}
                  />
                  <span
                    className={
                      task.completed
                        ? "text-slate-500 line-through"
                        : "text-white"
                    }
                  >
                    {task.title}
                  </span>
                  <span
                    className={`${
                      task.priority === "high"
                        ? "bg-red-500/10 text-red-500"
                        : (task.priority ?? "medium") === "medium"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-green-500/10 text-green-500"
                    } rounded-md px-2 capitalize`}
                  >
                    {task.priority ?? "medium"}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditTitle(task.title);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setTasks((prev) =>
                        prev.filter((item) => item.id !== task.id),
                      );
                    }}
                    className="rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TaskManager;
