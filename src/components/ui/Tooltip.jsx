export default function Tooltip({children, text}) {
  return (
    <div className="relative w-fit">
      <div className="peer">{children}</div>

      <span
        role="tooltip"
        className="bg-neutral-dark text-base-light py-2 px-3 rounded-sm text-captions font-normal whitespace-nowrap pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 opacity-0 peer-hover:opacity-100 transition-opacity"
      >
        {text}

        <span className="absolute left-1/2 -top-2 -translate-x-1/2 w-3 h-3 rotate-45 bg-neutral-dark"></span>
      </span>
    </div>
  );
}
