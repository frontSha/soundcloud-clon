export const timeAgo = (relDate) => {
  const date = new Date(relDate);
  const now = new Date();
  let diffInSeconds = (now.getTime() - date.getTime()) / 1000;

  const units = [
    { name: 'año', plural: 'años', secs: 365 * 24 * 60 * 60 },
    { name: 'mes', plural: 'meses', secs: 30 * 24 * 60 * 60 },
    { name: 'día', plural: 'días', secs: 24 * 60 * 60 },
    { name: 'hora', plural: 'horas', secs: 60 * 60 },
    { name: 'minuto', plural: 'minutos', secs: 60 },
    { name: 'segundo', plural: 'segundos', secs: 1 },
  ];

  const unit = units.find((u) => Math.floor(diffInSeconds / u.secs) >= 1);

  if (!unit) return 'justo ahora';

  const value = Math.floor(diffInSeconds / unit.secs);
  const label = value === 1 ? unit.name : unit.plural;

  return `hace ${value} ${label}`;
}

export const formatQuantities = (num) => {
  if (num < 1000) return num;
  
  const units = [
    {value: 1_000_000_000, symbol: "B"}, 
    {value: 1_000_000, symbol: "M"}, 
    {value: 1_000, symbol: "K"} 
  ]
  
  const unit = units.find((u) => num >= u.value);

  if (!unit) return num;

  const formatted = (num / unit.value).toFixed(1);
  return formatted.replace(/\.0$/, '') + unit.symbol;
}