export function ProgressCircle({
  progress,
  size = 54,
  stroke = 4,
  color = '#f50',
  children,
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="block md:hidden relative"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#303030"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.3s linear' }}
      />
      <foreignObject
        x={stroke}
        y={stroke}
        width={size - 2 * stroke}
        height={size - 2 * stroke}
      >
        <div
          style={{
            width: size - 2 * stroke,
            height: size - 2 * stroke,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}
