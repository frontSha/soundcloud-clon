import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Nav() {
  const pathname = usePathname();

  const links = [
    {
      id: "home",
      href: "/home",
      label: "Inicio"
    },
    {
      id: "channel",
      href: "/feed",
      label: "Canal"
    },
    {
      id: "lib",
      href: "/library",
      label: "Biblioteca"
    }
  ]

  return (
    <nav>
      <ul className="flex">
        {links.map((link) => (
          <li key={`link-${link.id}`}>
            <Link
              href={link.href}
              className={`py-6 px-4 mr-4 hover:text-base-light font-semibold 
                ${
                  pathname === link.href
                    ? 'border-b-2 border-base-light text-base-light'
                    : 'text-neutral-light'
                }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
