export const segundosParaTempo = (segundos: number) => {
  const minutos = Math.floor(segundos / 60);
  const restantesSegundos = segundos % 60;
  return `${minutos}:${restantesSegundos < 10 ? '0' : ''}${Math.round(restantesSegundos)}`;
};

export const msToTime = (ms: number) => {
  const segundos = Math.floor(ms / 1000);
  return segundosParaTempo(segundos);
};