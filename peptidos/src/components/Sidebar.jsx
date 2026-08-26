function Sidebar({ activePage, onNavigate }) {

  const menu = [
    {
      id: "inicio",
      icon: "⌂",
      label: "Inicio",
    },
    {
      id: "peso",
      icon: "⚖️",
      label: "Peso",
    },
    {
      id: "tratamiento",
      icon: "💉",
      label: "Tratamiento",
    },
    {
      id: "comida",
      icon: "🍽️",
      label: "Comida",
    },
    {
      id: "bienestar",
      icon: "😊",
      label: "Bienestar",
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

        {menu.map((item) => {

          const disabled =
            !["inicio", "peso"].includes(item.id);

          return (
            <button
              key={item.id}
              disabled={disabled}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
                activePage === item.id
                  ? "bg-emerald-50 text-emerald-700"
                  : disabled
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >

              <span className="text-lg">
                {item.icon}
              </span>

              {item.label}

            </button>
          );

        })}

      </nav>

      <div className="absolute bottom-7 left-5 right-5">

        <div className="rounded-2xl bg-slate-900 p-5 text-white">

          <p className="text-xs text-slate-400">
            Tu progreso
          </p>

          <p className="mt-2 text-2xl font-bold">
            -3.8 kg
          </p>

          <p className="mt-1 text-xs text-slate-400">
            desde el inicio
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;