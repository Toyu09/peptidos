import { useState } from "react";

import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TreatmentModal from "../components/TreatmentModal";

function Treatment({ onNavigate }) {
  const [showModal, setShowModal] =
    useState(false);

  const [records, setRecords] =
    useState([
      {
        id: 1,
        medication: "Semaglutida",
        dose: "0.25 mg",
        ml: 0.5,
        date: "2026-08-05",
        time: "08:30",
        feeling: "Bien",
        note: "Sin molestias.",
      },
      {
        id: 2,
        medication: "Semaglutida",
        dose: "0.25 mg",
        ml: 0.5,
        date: "2026-08-12",
        time: "08:25",
        feeling: "Regular",
        note: "Un poco de náuseas.",
      },
      {
        id: 3,
        medication: "Semaglutida",
        dose: "0.25 mg",
        ml: 0.5,
        date: "2026-08-19",
        time: "08:20",
        feeling: "Bien",
        note: "",
      },
    ]);

  const saveTreatment = (record) => {
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

  const sortedRecords = [...records].sort(
    (a, b) =>
      new Date(`${b.date}T${b.time}`) -
      new Date(`${a.date}T${a.time}`)
  );

  const latest = sortedRecords[0];

  const medication =
    latest?.medication || "Sin registrar";

  const totalApplications =
    records.length;

  const totalMl = records.reduce(
    (total, record) =>
      total + Number(record.ml || 0),
    0
  );

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
        activePage="tratamiento"
        onNavigate={onNavigate}
      />

      <main className="lg:ml-64">

        <Header title="Tratamiento" />

        <div className="mx-auto max-w-7xl p-5 pb-28 md:p-10">

          <section className="mb-8">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <p className="text-sm font-medium text-emerald-600">
                  Seguimiento
                </p>

                <h1 className="mt-1 text-3xl font-bold">
                  Mi tratamiento
                </h1>

                <p className="mt-2 text-slate-500">
                  Registra tus aplicaciones y cómo te has sentido.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(true)
                }
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                + Registrar aplicación
              </button>

            </div>

          </section>

          <section className="grid gap-4 md:grid-cols-3">

            <StatCard
              title="Medicamento"
              value={medication}
              subtitle="Último registrado"
              icon="💊"
            />

            <StatCard
              title="Aplicaciones"
              value={totalApplications}
              subtitle="Registradas"
              icon="💉"
            />

            <StatCard
              title="Total aplicado"
              value={`${totalMl.toFixed(2)} mL`}
              subtitle="Acumulado registrado"
              icon="🧪"
            />

          </section>

          <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold">
                  Historial de aplicaciones
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Registro de tus aplicaciones.
                </p>

              </div>

            </div>

            <div className="mt-6 space-y-4">

              {sortedRecords.length === 0 && (
                <div className="rounded-2xl bg-slate-50 p-8 text-center">

                  <p className="text-3xl">
                    💉
                  </p>

                  <p className="mt-3 font-semibold">
                    No tienes aplicaciones registradas
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Registra tu primera aplicación.
                  </p>

                </div>
              )}

              {sortedRecords.map((record) => (

                <div
                  key={record.id}
                  className="rounded-2xl bg-slate-50 p-5"
                >

                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl">
                        💉
                      </div>

                      <div>

                        <h3 className="font-bold">
                          {record.medication}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {record.dose || "Dosis no especificada"}
                          {" · "}
                          {record.ml} mL
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          record.feeling === "Bien"
                            ? "bg-emerald-100 text-emerald-700"
                            : record.feeling === "Regular"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {record.feeling}
                      </span>

                      <button
                        onClick={() =>
                          deleteRecord(record.id)
                        }
                        className="rounded-lg px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                      >
                        Eliminar
                      </button>

                    </div>

                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-4">

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">

                      <span>
                        📅 {formatDate(record.date)}
                      </span>

                      <span>
                        🕐 {record.time}
                      </span>

                    </div>

                    {record.note && (
                      <p className="mt-3 rounded-xl bg-white p-3 text-sm text-slate-500">
                        {record.note}
                      </p>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </section>

          <section className="mt-6 rounded-3xl border border-amber-100 bg-amber-50 p-5">

            <div className="flex gap-3">

              <span className="text-xl">
                ℹ️
              </span>

              <div>

                <h3 className="font-semibold text-amber-900">
                  Registro personal
                </h3>

                <p className="mt-1 text-sm text-amber-800">
                  Esta sección está diseñada para registrar información de seguimiento. Las dosis y frecuencia del tratamiento deben seguir las indicaciones del profesional de salud que lo haya formulado.
                </p>

              </div>

            </div>

          </section>

        </div>

      </main>

      <MobileNav
        activePage="tratamiento"
        onNavigate={onNavigate}
      />

      {showModal && (
        <TreatmentModal
          onClose={() =>
            setShowModal(false)
          }
          onSave={saveTreatment}
        />
      )}

    </div>
  );
}

export default Treatment;