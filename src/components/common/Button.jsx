export function Button({ children, onClick }) {
  return (
    <button
      type="button"
      className="py-1 text-neutral-600 bg-transparent
        rounded-full outline-none 
        ease-linear transition-all duration-150
        hover:text-white
        hover:bg-neutral-800
        active:bg-neutral-500 
        focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ButtonOutline({ children, onClick }) {
  return (
    <button
      type="button"
      className="py-1 text-gray-500 bg-white
        border border-gray-400 
        rounded-full outline-none 
        ease-linear transition-all duration-150
        hover:text-white
        hover:bg-gray-800
        active:bg-gray-500
        focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ButtonSvg({ children, onClick }) {
  return (
    <button
      className="py-1 px-1 text-gray-700 bg-transparent
          rounded-full outline-none 
          ease-linear transition-all duration-150
          hover:text-white
          hover:bg-gray-800
          active:bg-gray-500 
          focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
