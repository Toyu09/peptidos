function WeightChart({ records = [] }) {
  if (!records.length) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-slate-400">
        Aún no tienes registros de peso.
      </div>
    );
  }

  const data = [...records]
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`) -
        new Date(`${b.date}T${b.time}`)
    )
    .slice(-10);

  const weights = data.map((item) =>
    Number(item.weight)
  );

  const max = Math.max(...weights) + 0.5;
  const min = Math.min(...weights) - 0.5;

  const width = 600;
  const height = 220;

  const points = data.map((item, index) => {
    const x =
      data.length === 1
        ? width / 2
        : (index / (data.length - 1)) * width;

    const normalized =
      (Number(item.weight) - min) /
      (max - min || 1);

    const y =
      height -
      normalized * (height - 20) -
      10;

    return {
      x,
      y,
      weight: item.weight,
    };
  });

  const path = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  return (
    <div className="mt-8 h-64">

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full"
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
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="6"
            className="fill-white stroke-emerald-500"
            strokeWidth="3"
          />
        ))}

      </svg>

    </div>
  );
}

export default WeightChart;