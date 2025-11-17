import axios from '../axios';
import type { Pagination } from '../interfaces/api';
import { Device } from '../interfaces/devices';
import type { PlayHistoryObject } from '../interfaces/player';

/**
 * @description Obtém informações sobre o estado atual de reprodução do usuário, incluindo faixa ou episódio, progresso e dispositivo ativo.
 */
const fetchPlaybackState = async () => {
  const response = await axios.get('/me/player');
  return response.data;
};

/**
 * @description Transfere a reprodução para um novo dispositivo e, opcionalmente, inicia a reprodução. Esta API só funciona para usuários com Spotify Premium. A ordem de execução não é garantida quando usada junto com outros endpoints da API de Player.
 * @param deviceId O ID do dispositivo para o qual o comando será direcionado. Se não informado, o dispositivo ativo do usuário será usado.
 */
const transferPlayback = async (deviceId: string) => {
  await axios.put('/me/player', { device_ids: [deviceId] });
};

/**
 * @description Obtém informações sobre os dispositivos disponíveis do Spotify Connect do usuário. Alguns modelos de dispositivo não são suportados e não aparecerão na resposta da API.
 */
const getAvailableDevices = async () => {
  const response = await axios.get<{ devices: Device[] }>('/me/player/devices');
  return response.data;
};

/**
 * @description Inicia um novo contexto ou retoma a reprodução atual no dispositivo ativo do usuário. Disponível apenas para usuários com Spotify Premium. A ordem das chamadas pode não ser garantida quando usada com outros endpoints.
 */
const startPlayback = async (
  body: { context_uri?: string; uris?: string[]; offset?: { position: number } } = {}
) => {
  await axios.put('/me/player/play', body);
};

/**
 * @description Pausa a reprodução na conta do usuário. Requer Spotify Premium. A execução pode não ser garantida ao combinar com outros endpoints do Player.
 */
const pausePlayback = async () => {
  await axios.put('/me/player/pause');
};

/**
 * @description Pula para a próxima faixa na fila do usuário. Disponível apenas para usuários Premium.
 */
const nextTrack = async () => {
  await axios.post('/me/player/next');
};

/**
 * @description Volta para a faixa anterior na fila do usuário. Disponível apenas para usuários Premium.
 */
const previousTrack = async () => {
  await axios.post('/me/player/previous');
};

/**
 * @description Avança para uma posição específica na faixa atual do usuário. Disponível apenas para usuários Premium.
 */
const seekToPosition = async (position_ms: number) => {
  await axios.put('/me/player/seek', {}, { params: { position_ms } });
};

/**
 * @description Define o modo de repetição da reprodução do usuário.
 * @param state track: repete a faixa atual; context: repete o contexto atual; off: desativa repetição.
 */
const setRepeatMode = async (state: 'track' | 'context' | 'off') => {
  await axios.put('/me/player/repeat', {}, { params: { state } });
};

/**
 * @description Define o volume do dispositivo de reprodução atual do usuário. Requer Spotify Premium.
 * @param volume_percent Valor entre 0 e 100.
 */
const setVolume = async (volume_percent: number) => {
  await axios.put('/me/player/volume', {}, { params: { volume_percent } });
};

/**
 * @description Liga ou desliga o modo aleatório (shuffle) da reprodução do usuário. Requer Spotify Premium.
 */
const toggleShuffle = async (state: boolean) => {
  await axios.put('/me/player/shuffle', {}, { params: { state } });
};

/**
 * @description Adiciona um item ao final da fila de reprodução do usuário. Requer Spotify Premium.
 */
const addToQueue = async (uri: string) => {
  await axios.post('/me/player/queue', {}, { params: { uri } });
};

/**
 * @description Obtém as faixas reproduzidas recentemente pelo usuário. Observação: atualmente não suporta episódios de podcast.
 */
const getRecentlyPlayed = async (params: { limit?: number; after?: number; before?: number }) => {
  const response = await axios.get<Pagination<PlayHistoryObject>>('/me/player/recently-played', {
    params,
  });
  return response.data;
};

export const playerService = {
  addToQueue,
  fetchPlaybackState,
  transferPlayback,
  startPlayback,
  pausePlayback,
  nextTrack,
  previousTrack,
  setRepeatMode,
  setVolume,
  toggleShuffle,
  seekToPosition,
  getRecentlyPlayed,
  getAvailableDevices,
};
