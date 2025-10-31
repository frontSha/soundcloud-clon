import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';

export default function Footer() {
  const footerLinks = {
    desktop: [
      "Directorio",
      "Quiénes somos",
      "Recursos para artistas",
      "Sala de redacción",
      "Trabajo",
      "Desarrolladores",
      "Ayuda",
      "Legal",
      "Privacidad",
      "Política de cookies",
      "Administrador de cookies",
      "SoundCloud Ltd.",
      "Listas de éxitos",
      "Informes de transparencia"
    ], 
    mobile: [
      "Listas de éxitos",
      "Empresa",
      "Quiénes somos",
      "Directorio",
      "Newsroom",
      "Trabaja con nosotros",
      "Desarrolladores",
      "Legal",
      "Administrador de cookies",
      "Derechos de autor"
    ]
  }

  return (
    <div>
      {/* Footer Desktop */}
      <footer
        aria-roledescription="footer-desktop"
        className="py-7.5 max-md:hidden"
      >
        <ul className="flex flex-wrap">
          {footerLinks.desktop.map((link) => (
            <li className="last:[&_span]:hidden">
              <a
                href="#"
                className="text-neutral-light hover:text-neutral-medium font-normal text-nowrap"
              >
                {link}
              </a>
              <span className="mx-2 text-neutral-light">·</span>
            </li>
          ))}
        </ul>
      </footer>

      {/* Footer Mobile */}
      <footer
        aria-roledescription="footer-mobile"
        className="px-8 pt-16 pb-10 md:hidden"
      >
        <div className="mb-12">
          <h1 className="text-heading1 font-semibold">
            Disfruta al máximo de la experiencia SoundCloud en la aplicación
          </h1>
          <div className="link-stores h-21 w-fit mt-4">
            <a
              href="https://apps.apple.com/us/app/soundcloud-the-music-you-love/id336353151"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://m.sndcdn.com/_next/static/images/Spanish-9b474dc1600c05003481241e296ace45.png"
                alt="Ios App Store banner"
                className="h-full"
              />
            </a>
          </div>
        </div>
        <ul className="mt-4">
          {footerLinks.mobile.map((link) => (
            <li>
              <a href="#" className="inline-block py-4 font-500">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <ul className="socials mt-12 mb-8 *:inline-block *:mr-16">
          <li>
            <a
              href="https://www.instagram.com/soundcloud/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <GrInstagram size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/SoundCloud/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/soundcloud"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <FaXTwitter size={24} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
