export default function SearchFilters({ activeId, onChange }) {
  const searchFilters = [
    { id: 'all', label: 'Todo' },
    { id: 'sounds', label: 'Pistas' },
    { id: 'people', label: 'Gente' },
    { id: 'albums', label: 'Álbumes' },
    { id: 'sets', label: 'Listas' },
  ];

  return (
    <div>
      <ul className="search-navigation max-md:flex md:mb-12">
        {searchFilters.map((item) => (
          <li
            key={item.id}
            className={`w-[224px] px-8 py-2 max-md:py-6 max-md:w-[20%] max-md:flex max-md:items-center max-md:justify-center max-md:hover:bg-neutral-medium/40 md:mb-2 ${
              activeId === item.id
                ? 'bg-base-light rounded-sm max-md:bg-transparent max-md:border-b-2 max-md:border-base-light max-md:rounded-none'
                : 'bg-transparent'
            }`}
            onClick={() => onChange(item.id)}
          >
            <span
              className={`${
                activeId === item.id
                  ? 'text-base max-md:text-base-light'
                  : 'text-base-light hover:text-base-light/40 max-md:text-neutral-light max-md:hover:text-neutral-light/40'
              } text-heading4 font-semibold cursor-pointer max-md:text-heading5 text-nowrap`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
