import { useState } from "react";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import WeightChart from "../components/WeightChart";
import WeightModal from "../components/WeightModal";

function Weight({ onNavigate }) {
  const [showModal, setShowModal] =
    useState(false);

  const [records, setRecords] =
    useState([
      {
        id: 1,
        weight: 75,
        date: "2026-08-01",
        time: "08:10",
        note: "Registro inicial",
      },
      {
        id: 2,
        weight: 74.4,
        date: "2026-08-05",
        time: "08:15",
        note: "",
      },
      {
        id: 3,
        weight: 73.8,
        date: "2026-08-09",
        time: "08:20",
        note: "",
      },
      {
        id: 4,
        weight: 73,
        date: "2026-08-13",
        time: "08:05",
        note: "",
      },
      {
        id: 5,
        weight: 72.5,
        date: "2026-08-17",
        time: "08:12",
        note: "",
      },
      {
        id: 6,
        weight: 71.8,
        date: "2026-08-21",
        time: "08:08",
        note: "",
      },
      {
        id: 7,
        weight: 71.2,
        date: "2026-08-26",
        time: "14:32",
        note: "Nueva medición",
      },
    ]);

  const sortedRecords = [...records].sort(
    (a, b) =>
      new Date(`${b.date}T${b.time}`) -
      new Date(`${a.date}T${a.time}`)
  );

  const currentWeight =
    sortedRecords[0]?.weight || 0;

  const initialWeight =
    records.length > 0
      ? records[0].weight
      : currentWeight;

  const totalChange =
    currentWeight - initialWeight;

  const saveWeight = (record) => {
    setRecords((current) => [
      ...current,
      {
        ...record,
        id: Date.now(),
      },
    ]);

    setShowModal(false);
  };

  const deleteRecord = (id) => {
    setRecords((current) =>
      current.filter(
        (record) => record.id !== id
      )
    );
  };

  const formatDate = (date) => {
    return new Date(
      `${date}T12:00:00`
    ).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8]">

      <Sidebar
        activePage="peso"
        onNavigate={onNavigate}
      />

      <main className="lg:ml-64">

        <Header title="Peso" />

        <div className="mx-auto max-w-7xl p-5 pb-28 md:p-10">

          <section className="mb-8">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <p className="text-sm font-medium text-emerald-600">
                  Seguimiento
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                  Mi peso
                </h1>

                <p className="mt-2 text-slate-500">
                  Registra tu peso cada vez que quieras.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(true)
                }
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                + Registrar peso
              </button>

            </div>

          </section>

          <section className="grid gap-4 md:grid-cols-3">

            <StatCard
              title="Peso actual"
              value={`${currentWeight.toFixed(1)} kg`}
              subtitle="Última medición"
              icon="⚖️"
            />

            <StatCard
              title="Peso inicial"
              value={`${initialWeight.toFixed(1)} kg`}
              subtitle="Primera referencia"
              icon="📌"
            />

            <StatCard
              title="Cambio total"
              value={`${totalChange > 0 ? "+" : ""}${totalChange.toFixed(1)} kg`}
              subtitle={`${records.length} mediciones`}
              icon="📉"
            />

          </section>

          <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="font-semibold">
              Evolución
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Cada punto representa una medición.
            </p>

            <WeightChart
              records={records}
            />

          </section>

          <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

            <h2 className="font-semibold">
              Historial
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Puedes registrar varias mediciones el mismo día.
            </p>

            <div className="mt-6 space-y-3">

              {sortedRecords.map((record) => (

                <div
                  key={record.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                      ⚖️
                    </div>

                    <div>

                      <p className="font-semibold">
                        {record.weight.toFixed(1)} kg
                      </p>

                      <p className="text-xs text-slate-400">
                        {formatDate(record.date)}
                        {" · "}
                        {record.time}
                      </p>

                      {record.note && (
                        <p className="mt-1 text-xs text-slate-500">
                          {record.note}
                        </p>
                      )}

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      deleteRecord(record.id)
                    }
                    className="rounded-lg px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                  >
                    Eliminar
                  </button>

                </div>

              ))}

            </div>

          </section>

        </div>

      </main>

      <MobileNav
        activePage="peso"
        onNavigate={onNavigate}
      />

      {showModal && (
        <WeightModal
          onClose={() =>
            setShowModal(false)
          }
          onSave={saveWeight}
        />
      )}

    </div>
  );
}

export default Weight;