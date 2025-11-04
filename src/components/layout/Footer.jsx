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
        <ul className="whitespace-normal">
          {footerLinks.desktop.map((link, i) => (
            <li
              key={`desktop-link-${i}`}
              className="inline after:content-['\00a0·\00a0'] last:after:content-[''] text-neutral-light"
            >
              <a
                href="#"
                className="text-neutral-light hover:text-neutral-medium font-normal"
              >
                {link}
              </a>
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
          <div className="link-stores h-21 w-fit mt-4 flex gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.soundcloud.android&utm_source=https%3A//m.soundcloud.com/&utm_content=store_button_footer&utm_medium=mobi&utm_campaign=no_campaign"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://m.sndcdn.com/_next/static/images/Spanish-2c94a581563297b2f74e042c839bcc76.png"
                alt="PlayStore"
                className='h-full'
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/soundcloud-the-music-you-love/id336353151"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://m.sndcdn.com/_next/static/images/Spanish-9b474dc1600c05003481241e296ace45.png"
                alt="Ios App Store"
                className="h-full"
              />
            </a>
          </div>
        </div>
        <ul className="mt-4">
          {footerLinks.mobile.map((link, i) => (
            <li key={`mobile-link-${i}`}>
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
