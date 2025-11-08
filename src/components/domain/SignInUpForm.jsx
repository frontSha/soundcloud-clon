import Button from "../ui/buttons/Button";
import Input from "../ui/Input";

export default function SignInUpForm() {
  return (
    <div>
      <h1 className="text-base-light text-heading1 font-bold mb-12 pr-18">
        Inicia sesión o crea una cuenta
      </h1>
      <p className="mb-8 text-neutral-light font-normal">
        Al hacer clic en cualquiera de los botones “Continuar” a continuación,
        aceptas los{' '}
        <a href="" className="text-accent-interactive">
          Términos de Uso
        </a>{' '}
        de SoundCloud y reconoces nuestra{' '}
        <a href="" className="text-accent-interactive">
          Política de privacidad
        </a>
        .
      </p>
      <div className="google-access my-12 w-full">
        <button className="btn btn-secondary btn-submit btn-full flex items-center justify-center">
          <span className="bg-[url('https://secure.sndcdn.com/assets/google-a6c367.svg')] bg-no-repeat w-9 h-9"></span>
          <span className="ml-4 font-semibold">Continuar con Google</span>
        </button>
      </div>
      <span className="divider mb-6 mt-2 inline-block font-bold text-base-light">
        O por correo electrónico
      </span>
      <form className="*:mb-8">
        <Input inputType={'email'} inputName={'email'} />
        <Button text={'Continuar'} size="large" variant="primary" ariaLabel={'Enviar'} fullWidth submit />
      </form>
    </div>
  );
}
