import { useState } from "react";

function TreatmentModal({ onClose, onSave }) {
  const now = new Date();

  const today = now
    .toISOString()
    .split("T")[0];

  const currentTime = now
    .toTimeString()
    .slice(0, 5);

  const [medication, setMedication] =
    useState("");

  const [dose, setDose] =
    useState("");

  const [ml, setMl] =
    useState("");

  const [date, setDate] =
    useState(today);

  const [time, setTime] =
    useState(currentTime);

  const [feeling, setFeeling] =
    useState("Bien");

  const [note, setNote] =
    useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!medication.trim()) {
      alert("Escribe el medicamento.");
      return;
    }

    if (!ml || Number(ml) <= 0) {
      alert("Ingresa los ML aplicados.");
      return;
    }

    onSave({
      medication,
      dose,
      ml: Number(ml),
      date,
      time,
      feeling,
      note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/40 p-0 sm:items-center sm:p-5">

      <form
        onSubmit={handleSubmit}
        className="my-auto w-full max-w-lg rounded-t-3xl bg-white p-6 sm:rounded-3xl"
      >

        <div className="mb-6 flex items-start justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Registrar aplicación
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Registra los detalles de tu tratamiento.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl"
          >
            ×
          </button>

        </div>

        <div className="space-y-5">

          <div>

            <label className="text-sm font-medium">
              Medicamento
            </label>

            <input
              type="text"
              value={medication}
              onChange={(event) =>
                setMedication(event.target.value)
              }
              placeholder="Ej. Semaglutida"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm font-medium">
                Dosis
              </label>

              <input
                type="text"
                value={dose}
                onChange={(event) =>
                  setDose(event.target.value)
                }
                placeholder="Ej. 0.25 mg"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
              />

            </div>

            <div>

              <label className="text-sm font-medium">
                Cantidad aplicada
              </label>

              <div className="mt-2 flex items-center gap-2">

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={ml}
                  onChange={(event) =>
                    setMl(event.target.value)
                  }
                  placeholder="0.50"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />

                <span className="text-sm text-slate-500">
                  mL
                </span>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm font-medium">
                Fecha
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500"
              />

            </div>

            <div>

              <label className="text-sm font-medium">
                Hora
              </label>

              <input
                type="time"
                value={time}
                onChange={(event) =>
                  setTime(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500"
              />

            </div>

          </div>

          <div>

            <label className="text-sm font-medium">
              ¿Cómo te sentiste?
            </label>

            <div className="mt-2 grid grid-cols-3 gap-2">

              {[
                "Bien",
                "Regular",
                "Mal",
              ].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setFeeling(option)
                  }
                  className={`rounded-xl border px-3 py-3 text-sm ${
                    feeling === option
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  {option}
                </button>
              ))}

            </div>

          </div>

          <div>

            <label className="text-sm font-medium">
              Notas
            </label>

            <textarea
              value={note}
              onChange={(event) =>
                setNote(event.target.value)
              }
              rows="3"
              placeholder="¿Tuviste algún síntoma o algo que quieras recordar?"
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
            />

          </div>

        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Guardar aplicación
        </button>

      </form>

    </div>
  );
}

export default TreatmentModal;