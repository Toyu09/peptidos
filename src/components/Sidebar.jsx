function Sidebar({ activePage, onNavigate }) {
  const menu = [
    {
      id: "inicio",
      icon: "⌂",
      label: "Inicio",
      enabled: true,
    },
    {
      id: "peso",
      icon: "⚖️",
      label: "Peso",
      enabled: true,
    },
    {
      id: "tratamiento",
      icon: "💉",
      label: "Tratamiento",
      enabled: true,
    },
    {
      id: "comida",
      icon: "🍽️",
      label: "Alimentación",
      enabled: false,
    },
    {
      id: "bienestar",
      icon: "😊",
      label: "Bienestar",
      enabled: false,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white px-5 py-7 lg:block">

      <div className="mb-12 flex items-center gap-3 px-2">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-bold text-white">
          P
        </div>

        <div>
          <h1 className="font-bold">
            PeptiTrack
          </h1>

          <p className="text-xs text-slate-400">
            Tu evolución
          </p>
        </div>

      </div>

      <nav className="space-y-2">

        {menu.map((item) => (
          <button
            key={item.id}
            disabled={!item.enabled}
            onClick={() =>
              item.enabled && onNavigate(item.id)
            }
            className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
              activePage === item.id
                ? "bg-emerald-50 text-emerald-700"
                : item.enabled
                ? "text-slate-500 hover:bg-slate-50"
                : "cursor-not-allowed text-slate-300"
            }`}
          >

            <span className="text-lg">
              {item.icon}
            </span>

            {item.label}

            {!item.enabled && (
              <span className="ml-auto text-[9px] uppercase">
                Pronto
              </span>
            )}

          </button>
        ))}

      </nav>

      <div className="absolute bottom-7 left-5 right-5">

        <div className="rounded-2xl bg-slate-900 p-5 text-white">

          <p className="text-xs text-slate-400">
            Tu progreso
          </p>

          <p className="mt-2 text-2xl font-bold">
            En seguimiento
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Registra tus datos diariamente.
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;