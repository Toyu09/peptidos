function WeightChart({ records = [] }) {

  const data =
    records.length > 0
      ? [...records].slice(0, 10).reverse()
      : [
          { weight: 75 },
          { weight: 74.4 },
          { weight: 73.8 },
          { weight: 73 },
          { weight: 72.5 },
          { weight: 71.8 },
          { weight: 71.2 },
        ];

  const weights = data.map(
    (record) => Number(record.weight)
  );

  const max = Math.max(...weights) + 0.5;
  const min = Math.min(...weights) - 0.5;

  const width = 600;
  const height = 220;

  const points = data.map((record, index) => {

    const x =
      data.length === 1
        ? width / 2
        : (index / (data.length - 1)) * width;

    const normalized =
      (record.weight - min) /
      (max - min);

    const y =
      height -
      normalized * (height - 20) -
      10;

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
    <div className="mt-8">

      <div className="relative h-64">

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
          className="absolute inset-0 h-full w-full"
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

    </div>
  );
}

export default WeightChart;