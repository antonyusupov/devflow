import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskManager from "./components/TaskMnanger";
import { useState } from "react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <button
        className="fixed top-4 right-4 z-60 cursor-pointer rounded-lg bg-slate-800 p-3 text-white shadow-lg lg:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? "X" : "☰"}
      </button>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <aside
        className={` ${isMenuOpen ? "block" : "hidden"} fixed top-0 left-0 z-50 lg:static lg:block`}
      >
        <Sidebar onClick={() => setIsMenuOpen(false)} />
      </aside>

      <main className="min-w-0 flex-1 p-4 lg:p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Header name="John Doe" role="Frontend Developer" />
        <TaskManager />
      </main>
    </div>
  );
}

export default App;
