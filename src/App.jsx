import { useMemo, useState } from "react";

const initialWeightRecords = [
  {
    id: 1,
    weight: 75.0,
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
    weight: 73.0,
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
    weight: 71.6,
    date: "2026-08-26",
    time: "08:15",
    note: "Antes del desayuno",
  },
  {
    id: 8,
    weight: 71.2,
    date: "2026-08-26",
    time: "14:32",
    note: "Nueva medición",
  },
];

const menu = [
  { id: "inicio", icon: "⌂", label: "Inicio" },
  { id: "peso", icon: "⚖️", label: "Peso" },
  { id: "tratamiento", icon: "💉", label: "Tratamiento" },
  { id: "comida", icon: "🍽️", label: "Comida" },
  { id: "bienestar", icon: "😊", label: "Bienestar" },
];

function App() {
  const [activePage, setActivePage] = useState("inicio");
  const [weightRecords, setWeightRecords] = useState(initialWeightRecords);

  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);

  const sortedRecords = useMemo(() => {
    return [...weightRecords].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);

      return dateB - dateA;
    });
  }, [weightRecords]);

  const currentWeight = sortedRecords[0]?.weight ?? 0;

  const initialWeight =
    weightRecords.length > 0
      ? Math.max(...weightRecords.map((record) => record.weight))
      : currentWeight;

  const totalChange = currentWeight - initialWeight;

  const todayRecords = sortedRecords.filter(
    (record) => record.date === "2026-08-26"
  );

  const saveWeight = (newRecord) => {
    setWeightRecords((current) => [
      ...current,
      {
        ...newRecord,
        id: Date.now(),
      },
    ]);

    setShowWeightModal(false);
  };

  const deleteWeight = (id) => {
    setWeightRecords((current) =>
      current.filter((record) => record.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white px-5 py-7 lg:block">

        <div className="mb-12 flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-bold text-white">
            P
          </div>

          <div>
            <h1 className="text-lg font-bold">
              PeptiTrack
            </h1>

            <p className="text-xs text-slate-400">
              Tu evolución
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition ${
                activePage === item.id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-7 left-5 right-5">
          <div className="rounded-2xl bg-slate-900 p-5 text-white">

            <p className="text-xs text-slate-400">
              Tu progreso
            </p>

            <p className="mt-2 text-2xl font-bold">
              {totalChange > 0 ? "+" : ""}
              {totalChange.toFixed(1)} kg
            </p>

            <p className="mt-1 text-xs text-slate-400">
              desde el registro inicial
            </p>

          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="lg:ml-64">

        {/* HEADER */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white/90 px-5 backdrop-blur md:px-10">

          <div>
            <p className="text-xs text-slate-400">
              Mi progreso
            </p>

            <h2 className="text-lg font-semibold">
              {menu.find((item) => item.id === activePage)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              🔔
            </button>

            <div className="hidden items-center gap-3 sm:flex">

              <div className="text-right">
                <p className="text-sm font-semibold">
                  Brayan
                </p>

                <p className="text-xs text-slate-400">
                  Mi cuenta
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                B
              </div>

            </div>

          </div>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-7xl p-5 pb-28 md:p-10">

          {activePage === "inicio" && (
            <Dashboard
              currentWeight={currentWeight}
              initialWeight={initialWeight}
              totalChange={totalChange}
              todayRecords={todayRecords}
              onOpenWeight={() => setShowWeightModal(true)}
              onOpenTreatment={() => setShowTreatmentModal(true)}
            />
          )}

          {activePage === "peso" && (
            <WeightPage
              records={sortedRecords}
              currentWeight={currentWeight}
              initialWeight={initialWeight}
              totalChange={totalChange}
              onAdd={() => setShowWeightModal(true)}
              onDelete={deleteWeight}
            />
          )}

          {activePage === "tratamiento" && (
            <TreatmentPage
              onAdd={() => setShowTreatmentModal(true)}
            />
          )}

          {activePage === "comida" && (
            <SimplePage
              title="Alimentación"
              description="Registra y consulta tu alimentación diaria."
              icon="🍽️"
            />
          )}

          {activePage === "bienestar" && (
            <SimplePage
              title="Bienestar"
              description="Registra cómo te has sentido."
              icon="😊"
            />
          )}

        </div>
      </main>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white px-2 py-2 lg:hidden">

        <div className="flex justify-around">

          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 text-xs ${
                activePage === item.id
                  ? "text-emerald-600"
                  : "text-slate-400"
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

      {/* WEIGHT MODAL */}
      {showWeightModal && (
        <WeightModal
          onClose={() => setShowWeightModal(false)}
          onSave={saveWeight}
        />
      )}

      {/* TREATMENT MODAL */}
      {showTreatmentModal && (
        <TreatmentModal
          onClose={() => setShowTreatmentModal(false)}
        />
      )}

    </div>
  );
}

/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({
  currentWeight,
  initialWeight,
  totalChange,
  todayRecords,
  onOpenWeight,
  onOpenTreatment,
}) {
  return (
    <>
      <section className="mb-8">

        <p className="text-sm font-medium text-emerald-600">
          Miércoles, 26 de agosto
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
          Hola, Brayan 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Lleva el control de tu evolución y bienestar.
        </p>

      </section>

      {/* STATS */}
      <section className="grid gap-4 md:grid-cols-3">

        <StatCard
          title="Peso actual"
          value={`${currentWeight.toFixed(1)} kg`}
          subtitle={
            totalChange <= 0
              ? `↓ ${Math.abs(totalChange).toFixed(1)} kg desde el inicio`
              : `↑ ${totalChange.toFixed(1)} kg desde el inicio`
          }
          icon="⚖️"
        />

        <StatCard
          title="Peso inicial"
          value={`${initialWeight.toFixed(1)} kg`}
          subtitle={`${todayRecords.length} registros hoy`}
          icon="📊"
        />

        <StatCard
          title="Última aplicación"
          value="2.5 ml"
          subtitle="26 de agosto"
          icon="💉"
        />

      </section>

      {/* GRID */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-semibold">
                Evolución de peso
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Tus últimas mediciones
              </p>
            </div>

            <button
              onClick={onOpenWeight}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
            >
              + Registrar
            </button>

          </div>

          <WeightChart />

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold">
              Mi tratamiento
            </h3>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Activo
            </span>

          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <p className="text-xs text-slate-400">
              Medicamento registrado
            </p>

            <h4 className="mt-1 text-xl font-bold">
              Semaglutida
            </h4>

            <div className="mt-5 grid grid-cols-2 gap-4">

              <div>
                <p className="text-xs text-slate-400">
                  Última aplicación
                </p>

                <p className="mt-1 font-semibold">
                  26 Ago
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Cantidad
                </p>

                <p className="mt-1 font-semibold">
                  2.5 ml
                </p>
              </div>

            </div>

          </div>

          <button
            onClick={onOpenTreatment}
            className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white"
          >
            + Registrar aplicación
          </button>

        </div>

      </section>

      {/* TODAY */}
      <section className="mt-8">

        <h3 className="mb-4 text-lg font-semibold">
          Tu día
        </h3>

        <div className="grid gap-4 md:grid-cols-3">

          <InfoCard
            icon="🍽️"
            title="Alimentación"
            value="Muy buena"
            detail="2.1 L de agua"
          />

          <InfoCard
            icon="😊"
            title="Bienestar"
            value="8 / 10"
            detail="Te has sentido bien"
          />

          <InfoCard
            icon="⚖️"
            title="Peso"
            value={`${todayRecords.length} registros`}
            detail="Puedes registrar nuevamente"
          />

        </div>

      </section>

    </>
  );
}

/* =====================================================
   PESO PAGE
===================================================== */

function WeightPage({
  records,
  currentWeight,
  initialWeight,
  totalChange,
  onAdd,
  onDelete,
}) {
  return (
    <>

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
            onClick={onAdd}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
          >
            + Registrar peso
          </button>

        </div>

      </section>

      {/* SUMMARY */}
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
          subtitle={`${records.length} mediciones registradas`}
          icon="📉"
        />

      </section>

      {/* CHART */}
      <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="font-semibold">
            Evolución
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Cada punto representa una medición.
          </p>

        </div>

        <WeightChart records={records} />

      </section>

      {/* HISTORY */}
      <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="font-semibold">
            Historial de peso
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Puedes registrar varias mediciones el mismo día.
          </p>

        </div>

        {records.length === 0 ? (
          <div className="py-12 text-center">

            <div className="text-4xl">
              ⚖️
            </div>

            <p className="mt-3 font-semibold">
              Todavía no tienes registros
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Registra tu primer peso.
            </p>

          </div>
        ) : (
          <div className="space-y-3">

            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg">
                    ⚖️
                  </div>

                  <div>

                    <p className="font-semibold">
                      {record.weight.toFixed(1)} kg
                    </p>

                    <p className="text-xs text-slate-400">
                      {formatDate(record.date)} · {record.time}
                    </p>

                    {record.note && (
                      <p className="mt-1 text-xs text-slate-500">
                        {record.note}
                      </p>
                    )}

                  </div>

                </div>

                <button
                  onClick={() => onDelete(record.id)}
                  className="rounded-lg px-3 py-2 text-xs text-red-500 hover:bg-red-50"
                >
                  Eliminar
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

    </>
  );
}

/* =====================================================
   WEIGHT MODAL
===================================================== */

function WeightModal({ onClose, onSave }) {

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("2026-08-26");
  const [time, setTime] = useState("14:32");
  const [note, setNote] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault();

    const numericWeight = Number(weight);

    if (!numericWeight || numericWeight <= 0) {
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
              Puedes registrarlo tantas veces como quieras.
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

        {/* WEIGHT */}
        <label className="text-sm font-medium">
          Peso
        </label>

        <div className="mt-2 flex items-center gap-3">

          <input
            type="number"
            step="0.1"
            min="0"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            placeholder="71.2"
            autoFocus
            className="w-full rounded-xl border border-slate-200 px-4 py-4 text-2xl font-bold outline-none focus:border-emerald-500"
          />

          <span className="text-lg font-medium text-slate-500">
            kg
          </span>

        </div>

        {/* DATE + TIME */}
        <div className="mt-5 grid grid-cols-2 gap-4">

          <div>

            <label className="text-sm font-medium">
              Fecha
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
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
              onChange={(event) => setTime(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-emerald-500"
            />

          </div>

        </div>

        {/* NOTE */}
        <div className="mt-5">

          <label className="text-sm font-medium">
            Nota
            <span className="ml-1 text-xs font-normal text-slate-400">
              (opcional)
            </span>
          </label>

          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows="3"
            placeholder="Ej. Después de entrenar, antes del desayuno..."
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500"
          />

        </div>

        {/* SAVE */}
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

/* =====================================================
   CHART
===================================================== */

function WeightChart({ records = [] }) {

  const chartRecords =
    records.length > 0
      ? [...records].slice(0, 12).reverse()
      : [
          { weight: 75 },
          { weight: 74.4 },
          { weight: 73.8 },
          { weight: 73 },
          { weight: 72.5 },
          { weight: 71.8 },
          { weight: 71.2 },
        ];

  const weights = chartRecords.map(
    (record) => record.weight
  );

  const max = Math.max(...weights) + 0.5;
  const min = Math.min(...weights) - 0.5;

  const width = 600;
  const height = 220;

  const points = chartRecords.map((record, index) => {

    const x =
      chartRecords.length === 1
        ? width / 2
        : (index / (chartRecords.length - 1)) * width;

    const normalized =
      (record.weight - min) / (max - min);

    const y =
      height - normalized * (height - 20) - 10;

    return {
      x,
      y,
      weight: record.weight,
    };
  });

  const path = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <div className="mt-8 overflow-hidden">

      <div className="relative h-64 w-full">

        {/* GRID */}
        <div className="absolute inset-0 flex flex-col justify-between">

          {[0, 1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border-t border-slate-100"
            />
          ))}

        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >

          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-500"
          />

          {points.map((point, index) => (
            <g key={index}>

              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                className="fill-white stroke-emerald-500"
                strokeWidth="3"
              />

            </g>
          ))}

        </svg>

      </div>

      <div className="mt-3 flex justify-between text-xs text-slate-400">

        {chartRecords.map((record, index) => (
          <span key={index}>
            {record.date
              ? formatShortDate(record.date)
              : ""}
          </span>
        ))}

      </div>

    </div>
  );
}

/* =====================================================
   TREATMENT
===================================================== */

function TreatmentPage({ onAdd }) {

  return (
    <>

      <section className="mb-8">

        <p className="text-sm font-medium text-emerald-600">
          Seguimiento
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Tratamiento
        </h1>

        <p className="mt-2 text-slate-500">
          Consulta y registra tus aplicaciones.
        </p>

      </section>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-400">
              Medicamento
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Semaglutida
            </h2>

          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Activo
          </span>

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <InfoCard
            icon="💉"
            title="Última aplicación"
            value="2.5 ml"
            detail="26 de agosto"
          />

          <InfoCard
            icon="📅"
            title="Aplicaciones"
            value="8"
            detail="Registradas"
          />

          <InfoCard
            icon="📝"
            title="Notas"
            value="Ver historial"
            detail="Consultar registros"
          />

        </div>

        <button
          onClick={onAdd}
          className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          + Registrar aplicación
        </button>

      </div>

    </>
  );
}

/* =====================================================
   TREATMENT MODAL
===================================================== */

function TreatmentModal({ onClose }) {

  const [medicine, setMedicine] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("ml");
  const [feeling, setFeeling] = useState("");

  const handleSubmit = (event) => {

    event.preventDefault();

    console.log({
      medicine,
      quantity,
      unit,
      feeling,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-5">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-t-3xl bg-white p-6 sm:rounded-3xl"
      >

        <div className="mb-6 flex items-start justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Registrar aplicación
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Guarda la información indicada para tu tratamiento.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-slate-100"
          >
            ×
          </button>

        </div>

        <div>

          <label className="text-sm font-medium">
            Medicamento
          </label>

          <select
            value={medicine}
            onChange={(event) => setMedicine(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          >

            <option value="">
              Seleccionar medicamento
            </option>

            <option value="Semaglutida">
              Semaglutida
            </option>

            <option value="Tirzepatida">
              Tirzepatida
            </option>

            <option value="Otro">
              Otro
            </option>

          </select>

        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">

          <div>

            <label className="text-sm font-medium">
              Cantidad registrada
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="0.00"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />

          </div>

          <div>

            <label className="text-sm font-medium">
              Unidad
            </label>

            <select
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <option value="ml">ml</option>
              <option value="mg">mg</option>
            </select>

          </div>

        </div>

        <div className="mt-4">

          <label className="text-sm font-medium">
            ¿Cómo te sentiste?
          </label>

          <textarea
            value={feeling}
            onChange={(event) => setFeeling(event.target.value)}
            rows="3"
            placeholder="Escribe cómo te has sentido..."
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm"
          />

        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white"
        >
          Guardar registro
        </button>

      </form>

    </div>
  );
}

/* =====================================================
   COMPONENTES
===================================================== */

function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold">
            {value}
          </p>

          <p className="mt-2 text-xs text-emerald-600">
            {subtitle}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-xl">
          {icon}
        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  detail,
}) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-xl">
          {icon}
        </div>

        <div>

          <p className="text-xs text-slate-400">
            {title}
          </p>

          <p className="font-semibold">
            {value}
          </p>

        </div>

      </div>

      <p className="mt-4 text-xs text-slate-400">
        {detail}
      </p>

    </div>
  );
}

function SimplePage({
  title,
  description,
  icon,
}) {
  return (
    <section>

      <div className="mb-8">

        <p className="text-4xl">
          {icon}
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {description}
        </p>

      </div>

      <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">

        <p className="text-lg font-semibold">
          Próximamente
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Esta sección será parte del siguiente módulo del MVP.
        </p>

      </div>

    </section>
  );
}

/* =====================================================
   HELPERS
===================================================== */

function formatDate(dateString) {

  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatShortDate(dateString) {

  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });
}

export default App;