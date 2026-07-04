export function getAmbienceForHour(hour) {
  const normalizedHour = Number(hour);

  if (normalizedHour >= 5 && normalizedHour < 11) {
    return 'morning';
  }

  if (normalizedHour >= 11 && normalizedHour < 21) {
    return 'dusk';
  }

  return 'night';
}

export function getAmbienceClass(date = new Date()) {
  return `ambience-${getAmbienceForHour(date.getHours())}`;
}
