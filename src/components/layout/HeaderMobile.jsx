import Link from "next/link";
import { GrUploadOption } from "react-icons/gr";
import { PiBell } from "react-icons/pi";
import { RxEnvelopeClosed } from 'react-icons/rx';

export default function HeaderMobile() {
  const iconLinks = [
    {
      icon: <GrUploadOption size={17} />,
      href: '/upload',
    },
    {
      icon: <RxEnvelopeClosed size={17} strokeWidth={0.2} />,
      href: '/inbox',
    },
    {
      icon: <PiBell size={19} strokeWidth={1.5} />,
      href: '/notifications',
    },
  ];

  return (
    <header className="sticky top-0 left-0 z-50 bg-base md:hidden">
      <div className="px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-heading2 text-base-light font-semibold">Home</h1>
        </div>
        <div className="*:ml-12 flex items-center">
          <Link href={'/suscriptions'} className="text-accent hover:text-base-light text-micro font-medium uppercase">Obtener Pro</Link>
          {iconLinks.map((icon, i) => (
            <Link key={`icon-link_${i + 1}`} href={icon.href} className="text-base-light hover:text-neutral-light">{icon.icon}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}
