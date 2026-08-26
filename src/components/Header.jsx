function Header({ title }) {

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white/90 px-5 backdrop-blur md:px-10">

      <div>

        <p className="text-xs text-slate-400">
          Mi progreso
        </p>

        <h2 className="text-lg font-semibold">
          {title}
        </h2>

      </div>

      <div className="flex items-center gap-3">

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          🔔
        </button>

        <div className="hidden items-center gap-3 sm:flex">

          <div className="text-right">

            <p className="text-sm font-semibold">
              Usuario
            </p>

            <p className="text-xs text-slate-400">
              Mi cuenta
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
            U
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;