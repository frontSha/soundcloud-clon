import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { MdError } from "react-icons/md";
import { PiEye, PiEyeSlash } from "react-icons/pi";

export default function Input({
  func,
  inputType,
  inputName,
  inputValue,
  placeholder,
  passwordInvalid = false,
  invalidCredentials = false
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible)
  }

  const passwordInputType = isVisible ? "text" : "password";

  return (
    <div className="input-wrapper h-full">
      <div
        className={`group bg-neutral-dark text-base-light rounded-sm focus-within:border-1 focus-within:border-neutral-light relative max-w-[600px] ${
          inputType === 'search' ? 'h-full' : 'h-27'
        } ${
          passwordInvalid || invalidCredentials
            ? 'border-1 border-status-error focus-within:border-status-error'
            : ''
        }`}
      >
        <input
          onChange={(e) => func(e.target.value)}
          name={inputName}
          type={inputName === 'password' ? passwordInputType : inputType}
          value={inputValue}
          aria-required="true"
          placeholder={inputType === 'search' ? placeholder : ' '}
          {...(inputType === 'email' ? { autoComplete: 'email' } : {})}
          className={`h-full w-full absolute inset-0 outline-none pl-8 ${
            inputType === 'search' ? 'py-4 pr-20' : 'pt-7'
          } z-5`}
        />
        {inputType !== 'search' && (
          <label
            htmlFor={inputName}
            className="text-neutral-light text-captions absolute top-1/2 left-8 -translate-y-1/2 group-focus-within:top-8 transition-transform ease-in-out duration-500 z-0 group-has-[input:not(:placeholder-shown)]:top-8"
          >
            {inputType === 'email'
              ? 'Tu dirección de email'
              : inputName === 'password'
              ? 'Tu contraseña (mín. 6 caracteres)'
              : ''}
          </label>
        )}
        {inputName === 'password' && (
          <button
            type="button"
            onClick={handlePasswordVisibility}
            className="cursor-pointer absolute top-1/2 right-8 -translate-y-1/2 z-10"
          >
            {!isVisible ? <PiEye size={24} /> : <PiEyeSlash size={24} />}
          </button>
        )}
        {inputType === 'search' && (
          <button
            onClick={func}
            className="cursor-pointer absolute top-1/2 right-8 -translate-y-1/2 z-10 text-neutral-light"
          >
            <HiOutlineSearch size={24} />
          </button>
        )}
        {passwordInvalid && (
          <div className="absolute top-1/2 -translate-y-1/2 right-24">
            <MdError size={16} color="#d61348" />
          </div>
        )}
      </div>
      {passwordInvalid && (
        <span className="text-status-error text-captions px-8 mt-2">
          Introduce una contraseña válida.
        </span>
      )}
    </div>
  );
}
