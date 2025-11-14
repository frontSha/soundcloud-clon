import '@/styles/components.css';
import { IoMdHeart, IoMdPause, IoMdPlay } from 'react-icons/io';
import { FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { TfiMoreAlt } from 'react-icons/tfi';
import { TbCopy } from 'react-icons/tb';
import { LuListPlus, LuListStart, LuListVideo } from 'react-icons/lu';
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5';
import { PiShuffleBold } from 'react-icons/pi';
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

export function IconButton({ icon, text, size, variant, ariaLabel, onClick, customClasses, isDisabled }) {
  return (
    <button
      className={`btn 
        ${
          variant === 'tertiary'
            ? 'btn-tertiary'
            : variant === 'primary'
            ? 'btn-primary'
            : 'btn-secondary'
        } ${
        size === 'medium' ? 'btn-md' : size === 'large' ? 'btn-lg' : 'btn-sm'
      } ${customClasses || ''} disabled:hidden`}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={isDisabled}
      type="button"
    >
      <span
        className={`flex items-center justify-center ${
          (icon && text && 'gap-4') || ''
        }`}
      >
        {icon}
        {text}
      </span>
    </button>
  );
}

// Action buttons

export function LikeButton({ buttonSize, on, onToggle, text }) {
  return (
    <IconButton
      size={buttonSize}
      ariaLabel={!on ? 'Me gusta' : 'Ya no me gusta'}
      onClick={onToggle}
      text={text}
      icon={<IoMdHeart size={16} fill={on ? '#f50' : undefined} />}
    />
  );
}

export function FollowButton({ buttonSize, on, onToggle, text }) {
  return (
    <IconButton
      size={buttonSize}
      ariaLabel={!on ? 'Seguir' : 'Dejar de seguir'}
      onClick={onToggle}
      text={text}
      icon={
        !on ? (
          <FaUserPlus size={16} />
        ) : (
          <FaUserCheck size={16} fill={!text ? '#f50' : undefined} />
        )
      }
    />
  );
}

export function MoreButton({ buttonSize, on, onToggle }) {
  return (
    <IconButton
      size={buttonSize}
      ariaLabel={!on ? 'Más' : 'Menos'}
      onClick={onToggle}
      icon={<TfiMoreAlt size={16} fill={on ? '#f50' : undefined} />}
    />
  );
}

export function CopyButton({ buttonSize, onClick }) {
  return (
    <IconButton
      size={buttonSize}
      ariaLabel={'Copiar enlace'}
      onClick={onClick}
      icon={<TbCopy size={16} strokeWidth={2.6} />}
    />
  );
}

export function AddToListButton({ buttonSize, onClick, variant, text }) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={'Añadir a lista'}
      onClick={onClick}
      text={text}
      icon={<LuListPlus size={18} />}
    />
  );
}

export function AddToQueueButton({ buttonSize, onClick, variant, text }) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={'Añadir a continuación'}
      onClick={onClick}
      text={text}
      icon={<LuListStart size={18} />}
    />
  );
}

export function SeeQueueButton({buttonSize, onClick, variant}) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={'A continuación'}
      onClick={onClick}
      icon={<LuListVideo size={18} />}
    />
  );
}

// Control buttons: play, prev, next, shuffle, volume

export function PlayButton({ onClick, played, buttonSize, variant, iconSize, custom }) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={!played ? 'Reproducir' : 'Pausar'}
      onClick={onClick}
      customClasses={`play-control ${custom || ''}`}
      icon={played ? <IoMdPause size={iconSize || 16} /> : <IoMdPlay size={iconSize || 16} />}
    />
  );
}

export function SkipNextButton({buttonSize, onClick, variant}) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={'Siguiente'}
      onClick={onClick}
      customClasses={'skip-controls'}
      icon={<IoPlaySkipForwardSharp size={buttonSize === 'large' ? 24 : 16} />}
    />
  );
}

export function SkipPrevButton({buttonSize, onClick, variant}) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={'Anterior'}
      onClick={onClick}
      customClasses={'skip-controls'}
      icon={<IoPlaySkipBackSharp size={buttonSize === 'large' ? 24 : 16} />}
    />
  );
}

export function ShuffleButton({buttonSize, variant, onClick, on}) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={'Aleatorio'}
      onClick={onClick}
      icon={<PiShuffleBold size={16} fill={on ? '#f50' : undefined} />}
    />
  );
}

export function VolumeControl({buttonSize, variant, onClick, off}) {
  return (
    <IconButton
      size={buttonSize}
      variant={variant}
      ariaLabel={!off ? 'Silenciar' : 'Subir volumen'}
      onClick={onClick}
      icon={off ? <HiVolumeOff size={16} /> : <HiVolumeUp size={16} />}
    />
  );
}

// Slider buttons <>

export function ArrowLeft({buttonSize, onClick, isDisabled }) {
  return (
    <IconButton
      size={buttonSize}
      ariaLabel={'Deslizar izquierda'}
      onClick={onClick}
      customClasses={'icon-rounded'}
      isDisabled={isDisabled}
      icon={<MdArrowBackIosNew size={16} />}
    />
  );
}

export function ArrowRight({buttonSize, onClick, isDisabled }) {
  return (
    <IconButton
      size={buttonSize}
      ariaLabel={'Deslizar derecha'}
      onClick={onClick}
      customClasses={'icon-rounded'}
      isDisabled={isDisabled}
      icon={<MdArrowForwardIos size={16} />}
    />
  );
}