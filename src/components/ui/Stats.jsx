export default function Stats({ stat, statCount, icon }) {
  return (
    <div
      className="flex items-center text-neutral-light text-captions"
      aria-label={`Número de ${stat}`}
      title={`${statCount} ${stat}`}
    >
      <span className="mr-1">{icon}</span>
      <span>{statCount}</span>
    </div>
  );
}
