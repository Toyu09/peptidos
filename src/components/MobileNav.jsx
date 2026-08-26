function MobileNav({ activePage, onNavigate }) {
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
      label: "Comida",
      enabled: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white px-2 py-2 lg:hidden">

      <div className="flex justify-around">

        {menu.map((item) => (
          <button
            key={item.id}
            disabled={!item.enabled}
            onClick={() =>
              item.enabled && onNavigate(item.id)
            }
            className={`flex flex-col items-center gap-1 px-2 py-2 text-xs ${
              activePage === item.id
                ? "text-emerald-600"
                : item.enabled
                ? "text-slate-400"
                : "text-slate-300"
            }`}
          >

            <span className="text-lg">
              {item.icon}
            </span>

            {item.label}

          </button>
        ))}

      </div>

    </nav>
  );
}

export default MobileNav;