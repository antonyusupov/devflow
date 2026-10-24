import { LayoutDashboard, ListTodo, Settings } from "lucide-react";

function Sidebar({ onClick }) {
  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-900 p-6">
      <h1 className="mb-10 text-2xl font-bold text-violet-400">DevFlow.</h1>

      <nav className="space-y-3 text-slate-300">
        <div className="flex items-center gap-3 rounded-lg bg-violet-600 p-3 text-white">
          <LayoutDashboard size={20} />
          <button onClick={onClick}>Dashboard</button>
        </div>

        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <ListTodo size={20} />
          <button onClick={onClick}>My Tasks</button>
        </div>

        <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-slate-800">
          <Settings size={20} />
          <button onClick={onClick}>Settings</button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
