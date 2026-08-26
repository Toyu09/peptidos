import { useState } from "react";

function WeightModal({
  onClose,
  onSave,
}) {

  const now = new Date();

  const today =
    now.toISOString().split("T")[0];

  const currentTime =
    now.toTimeString().slice(0, 5);

  const [weight, setWeight] =
    useState("");

  const [date, setDate] =
    useState(today);

  const [time, setTime] =
    useState(currentTime);

  const [note, setNote] =
    useState("");

  const handleSubmit = (event) => {

    event.preventDefault();

    const numericWeight =
      Number(weight);

    if (
      !numericWeight ||
      numericWeight <= 0
    ) {
      alert("Ingresa un peso válido.");
      return;
    }

    onSave({
      weight: numericWeight,
      date,
      time,
      note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-5">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-3xl"
      >

        <div className="mb-6 flex items-start justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Registrar peso
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Puedes registrarlo cada vez que quieras.
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

        <label className="text-sm font-medium">
          Peso
        </label>

        <div className="mt-2 flex items-center gap-3">

          <input
            type="number"
            step="0.1"
            min="0"
            value={weight}
            onChange={(event) =>
              setWeight(event.target.value)
            }
            placeholder="71.2"
            autoFocus
            className="w-full rounded-xl border border-slate-200 px-4 py-4 text-2xl font-bold outline-none focus:border-emerald-500"
          />

          <span className="text-lg font-medium text-slate-500">
            kg
          </span>

        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">

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

        <div className="mt-5">

          <label className="text-sm font-medium">
            Nota
            <span className="ml-1 text-xs font-normal text-slate-400">
              (opcional)
            </span>
          </label>

          <textarea
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            rows="3"
            placeholder="Ej. Después de entrenar..."
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Guardar peso
        </button>

      </form>

    </div>
  );
}

export default WeightModal;