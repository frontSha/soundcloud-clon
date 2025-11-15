import Link from "next/link";
import Popover from "../ui/Popover";
import { PiBell } from "react-icons/pi";
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { TfiMoreAlt } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function HeaderUserMenu() {
  const router = useRouter();

  const logOutUser = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Hubo un problema al cerrar la sesión', error);
    }

    router.push('/');
  }

  return (
    <div className="flex items-center h-full">
      <div className="w-13 h-13 rounded-full bg-linear-135 from-mist to-coral mr-8"></div>
      <div className="flex relative">
        <Popover icon={<PiBell size={20} />} label={'Notificaciones'}>
          <div>
            <h2 className="py-4 px-6 text-base-light text-heading3 font-semibold">Notificaciones</h2>
            <div className="flex items-center justify-center py-4">
              <span className="text-neutral-light font-normal py-4 px-6">
                No hay notificaciones
              </span>
            </div>
          </div>
        </Popover>
        <Popover icon={<HiOutlineEnvelope size={20} />} label={'Mensajes'}>
          <div>
            <h2 className="py-4 px-6 text-base-light text-heading3 font-semibold">Mensajes</h2>
            <div className="flex items-center justify-center py-4">
              <span className="text-neutral-light font-normal py-4 px-6">
                No hay mensajes
              </span>
            </div>
          </div>
        </Popover>
        <Popover icon={<TfiMoreAlt size={20} />} label={'Ver más'}>
          <button
            className="text-base-light hover:text-base-light/40 font-semibold py-2 px-4 cursor-pointer"
            onClick={logOutUser}
          >
            Cerrar sesión
          </button>
        </Popover>
      </div>
    </div>
  );
}
