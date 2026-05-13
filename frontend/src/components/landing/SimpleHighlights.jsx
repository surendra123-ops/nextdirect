export function SimpleHighlights() {
  return (
    <section className="border-b border-neutral-200 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-lg font-semibold text-neutral-900">What you get</h2>
        <ul className="mt-6 space-y-3 text-left text-sm text-neutral-700">
          <li className="flex gap-3">
            <span className="text-emerald-600">—</span>
            <span>Talk to owners directly. No brokerage story on every call.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600">—</span>
            <span>One place for shortlists, visits, and basic paperwork notes.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-600">—</span>
            <span>Built as a demo MERN stack—you can swap in maps, chat, and payments later.</span>
          </li>
        </ul>
        <p className="mt-8 text-sm italic text-neutral-500">“We booked two visits in a day. Felt normal, not salesy.”</p>
      </div>
    </section>
  );
}
