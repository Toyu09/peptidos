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

  const sortedRecords =
    [...weightRecords].sort(
      (a, b) =>
        new Date(`${b.date}T${b.time}`) -
        new Date(`${a.date}T${a.time}`)
    );

  const currentWeight =
    sortedRecords[0]?.weight || 0;

  const initialWeight =
    weightRecords.length > 0
      ? weightRecords[0].weight
      : currentWeight;

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
              Miércoles, 26 de agosto
            </p>

            <h1 className="mt-1 text-3xl font-bold md:text-4xl">
              Hola 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Lleva el control de tu evolución.
            </p>

          </section>

          {/* STATS */}

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
              title="Registros"
              value={weightRecords.length}
              subtitle="Mediciones guardadas"
              icon="📊"
            />

          </section>

          {/* CHART */}

          <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold">
                  Evolución de peso
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Tus últimas mediciones
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
              records={sortedRecords}
            />

          </section>

          {/* TREATMENT */}

          <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-slate-400">
                  Tratamiento
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Aún no registrado
                </h2>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
                Próximamente
              </span>

            </div>

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