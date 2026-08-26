import { useState } from "react";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import WeightChart from "../components/WeightChart";
import WeightModal from "../components/WeightModal";

function Dashboard({ onNavigate }) {
  const [showWeightModal, setShowWeightModal] =
    useState(false);

  const [weightRecords, setWeightRecords] =
    useState([
      {
        id: 1,
        weight: 75,
        date: "2026-08-01",
        time: "08:10",
      },
      {
        id: 2,
        weight: 74.4,
        date: "2026-08-05",
        time: "08:15",
      },
      {
        id: 3,
        weight: 73.8,
        date: "2026-08-09",
        time: "08:20",
      },
      {
        id: 4,
        weight: 73,
        date: "2026-08-13",
        time: "08:05",
      },
      {
        id: 5,
        weight: 72.5,
        date: "2026-08-17",
        time: "08:12",
      },
      {
        id: 6,
        weight: 71.8,
        date: "2026-08-21",
        time: "08:08",
      },
      {
        id: 7,
        weight: 71.2,
        date: "2026-08-26",
        time: "14:32",
      },
    ]);

  const sortedRecords = [...weightRecords].sort(
    (a, b) =>
      new Date(`${b.date}T${b.time}`) -
      new Date(`${a.date}T${a.time}`)
  );

  const currentWeight =
    sortedRecords[0]?.weight || 0;

  const initialWeight =
    weightRecords[0]?.weight ||
    currentWeight;

  const totalChange =
    currentWeight - initialWeight;

  const saveWeight = (record) => {
    setWeightRecords((current) => [
      ...current,
      {
        ...record,
        id: Date.now(),
      },
    ]);

    setShowWeightModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8]">

      <Sidebar
        activePage="inicio"
        onNavigate={onNavigate}
      />

      <main className="lg:ml-64">

        <Header title="Dashboard" />

        <div className="mx-auto max-w-7xl p-5 pb-28 md:p-10">

          <section className="mb-8">

            <p className="text-sm font-medium text-emerald-600">
              Mi seguimiento
            </p>

            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              Hola 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Aquí tienes un resumen de tu evolución.
            </p>

          </section>

          <section className="grid gap-4 md:grid-cols-3">

            <StatCard
              title="Peso actual"
              value={`${currentWeight.toFixed(1)} kg`}
              subtitle="Última medición"
              icon="⚖️"
            />

            <StatCard
              title="Cambio total"
              value={`${totalChange > 0 ? "+" : ""}${totalChange.toFixed(1)} kg`}
              subtitle="Desde el inicio"
              icon="📉"
            />

            <StatCard
              title="Tratamiento"
              value="Activo"
              subtitle="Seguimiento"
              icon="💉"
            />

          </section>

          <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold">
                  Evolución de peso
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Tus últimas mediciones.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowWeightModal(true)
                }
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
              >
                + Registrar
              </button>

            </div>

            <WeightChart
              records={weightRecords}
            />

          </section>

          <section className="mt-6 grid gap-6 md:grid-cols-2">

            <button
              onClick={() =>
                onNavigate("tratamiento")
              }
              className="rounded-3xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                💉
              </div>

              <h2 className="mt-5 font-bold">
                Tratamiento
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Registra medicamentos, ML, dosis y cómo te has sentido.
              </p>

              <p className="mt-4 text-sm font-semibold text-emerald-600">
                Ver tratamiento →
              </p>

            </button>

            <button
              onClick={() =>
                onNavigate("peso")
              }
              className="rounded-3xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-xl">
                ⚖️
              </div>

              <h2 className="mt-5 font-bold">
                Control de peso
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Registra tu peso tantas veces como quieras.
              </p>

              <p className="mt-4 text-sm font-semibold text-emerald-600">
                Ver historial →
              </p>

            </button>

          </section>

        </div>

      </main>

      <MobileNav
        activePage="inicio"
        onNavigate={onNavigate}
      />

      {showWeightModal && (
        <WeightModal
          onClose={() =>
            setShowWeightModal(false)
          }
          onSave={saveWeight}
        />
      )}

    </div>
  );
}

export default Dashboard;