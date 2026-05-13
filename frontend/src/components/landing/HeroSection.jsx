import { useState } from "react";
import { SearchBar } from "./SearchBar.jsx";

const modes = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "commercial", label: "Commercial" },
];

export function HeroSection() {
  const [mode, setMode] = useState("buy");
  const [query, setQuery] = useState("");

  function handleSearch(term) {
    const q = term.trim();
    if (!q) return;
    window.dispatchEvent(new CustomEvent("nestdirect:search", { detail: { query: q, mode } }));
  }

  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Find a home, minus the noise</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-neutral-600 sm:text-base">
          Search by area or project. Same flow for buy, rent, or commercial—nothing fancy, just clear.
        </p>

        <div className="mx-auto mt-8 max-w-xl space-y-4 text-left">
          <div className="flex justify-center gap-1 rounded-lg border border-neutral-200 bg-neutral-50 p-1">
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                  mode === m.id ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-4">
            <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </section>
  );
}
