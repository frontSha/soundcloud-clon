import Link from "next/link";
import { GrUploadOption } from "react-icons/gr";
import { HiOutlineBell } from "react-icons/hi";
import { RxEnvelopeClosed } from 'react-icons/rx';

export default function HeaderMobile() {
  const iconLinks = [
    {
      icon: <GrUploadOption size={17} />,
      href: '/upload',
    },
    {
      icon: <RxEnvelopeClosed size={17} strokeWidth={.2} />,
      href: '/inbox',
    },
    {
      icon: <HiOutlineBell size={20} strokeWidth={1.5} />,
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
            <Link href={icon.href} className="text-base-light hover:text-neutral-light">{icon.icon}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}
