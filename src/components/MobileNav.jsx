function MobileNav({ activePage, onNavigate }) {

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
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white px-2 py-2 lg:hidden">

      <div className="flex justify-around">

        {menu.map((item) => {

          const disabled =
            !["inicio", "peso"].includes(item.id);

          return (
            <button
              key={item.id}
              disabled={disabled}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 text-xs ${
                activePage === item.id
                  ? "text-emerald-600"
                  : disabled
                  ? "text-slate-300"
                  : "text-slate-400"
              }`}
            >

              <span className="text-lg">
                {item.icon}
              </span>

              {item.label}

            </button>
          );

        })}

      </div>

    </nav>
  );
}

export default MobileNav;