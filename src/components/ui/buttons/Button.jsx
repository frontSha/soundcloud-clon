import '@/styles/components.css';

// Types:
// - primary
// - secondary
// - tertiary
// - large
// - medium
// - small
// - actions -> another component -> don't always follow the class rules
// - transparent

export default function Button({ text, size='medium', variant='secondary', ariaLabel, onClick, cta, fullWidth }) {

  const sizeClass = (size) => {
    if (size === 'large') {
      return 'btn-lg'
    } else if (size === 'medium') {
      return 'btn-md'
    } else if (size === 'small') {
      return 'btn-sm'
    }
  }

  const variantClass = (variant) => {
    if (variant === 'primary') {
      return 'btn-primary'
    } else if (variant === 'secondary') {
      return 'btn-secondary'
    } else if (variant === 'tertiary') {
      return 'btn-tertiary'
    } else if (variant === 'transparent') {
      return 'btn-transparent'
    }
  }

  // TODO: estados :hover :focus :active / type transparent: elemento anchor no button
  return (
    <button
      className={`btn ${sizeClass(size)} ${variantClass(variant)} ${cta ? "btn-cta" : ""} ${fullWidth ? "btn-full" : ""}`}
      aria-label={ariaLabel}
      onClick={onClick}
      type='button'
    >
      {text}
    </button>
  );
}
