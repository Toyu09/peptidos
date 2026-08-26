import { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    onLogin();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7f8] px-5">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-bold text-white">
            P
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            PeptiTrack
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Tu evolución, bajo control.
          </p>

        </div>

        <div className="rounded-3xl border bg-white p-7 shadow-sm">

          <h2 className="text-xl font-bold">
            Bienvenido 👋
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Ingresa tu nombre para comenzar.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >

            <label className="text-sm font-medium text-slate-700">
              Nombre
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Ej. Brayan"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Entrar
            </button>

          </form>

        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          PeptiTrack · MVP
        </p>

      </div>

    </div>
  );
}

export default Login;