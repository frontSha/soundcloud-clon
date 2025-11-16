import { useEffect, useRef, useState } from "react"

export default function Popover({icon, children, label}) {
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={popoverRef} aria-label={label}>
      <button onClick={() => setIsOpen(!isOpen)} className={`py-6 px-4 cursor-pointer ${isOpen ? "text-base-light" : "text-neutral-light"}`}>{icon}</button>

      {isOpen && (
        <div aria-roledescription="dropdown" className="absolute top-20 right-0 border-1 border-base-light/15 bg-base rounded-sm min-w-[170px] py-4">
          {children}
        </div>
      )}
    </div>
  )
}
