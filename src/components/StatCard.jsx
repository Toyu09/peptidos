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

export default StatCard;
