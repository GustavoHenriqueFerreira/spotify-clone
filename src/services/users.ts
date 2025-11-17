import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Artist } from '../interfaces/artist';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';
import { Episode } from '../interfaces/episode';
import { User } from '../interfaces/user';
import { PlaylistItem } from '../interfaces/playlists';

interface FetchTopItemsParams extends PaginationQueryParams {
  /**
   * @description Intervalo de tempo no qual as afinidades são calculadas.  
   * Valores válidos:  
   * - long_term (aprox. 1 ano de dados, incluindo novos dados)  
   * - medium_term (aprox. últimos 6 meses)  
   * - short_term (aprox. últimas 4 semanas)  
   * Padrão: medium_term
   */
  timeRange: 'long_term' | 'medium_term' | 'short_term';
}

/**
 * @description Obtém as faixas mais ouvidas pelo usuário atual, com base na afinidade calculada.
 */
const fetchTopTracks = async (params: FetchTopItemsParams) => {
  return await axios.get<Pagination<Track>>(`/me/top/tracks`, { params });
};

/**
 * @description Obtém os artistas mais ouvidos pelo usuário atual, com base na afinidade calculada.
 */
const fetchTopArtists = async (params: FetchTopItemsParams) => {
  return await axios.get<Pagination<Artist>>(`/me/top/artists`, { params });
};

/**
 * @description Obtém os artistas seguidos pelo usuário atual.
 */
const fetchFollowedArtists = async (params: PaginationQueryParams = {}) => {
  return await axios.get<{ artists: Pagination<Artist> }>(`/me/following`, {
    params: { ...params, type: 'artist' },
  });
};

/**
 * @description Obtém a fila atual de reprodução do usuário.
 */
const fetchQueue = async () => {
  return await axios.get<{ currently_playing: Track | Episode; queue: (Track | Episode)[] }>(
    `/me/player/queue`
  );
};

/**
 * @description Verifica se uma ou mais faixas já estão salvas na biblioteca "Músicas Curtidas" do usuário.
 */
const checkSavedTracks = async (ids: string[]) => {
  return await axios.get<boolean[]>('/me/tracks/contains', { params: { ids: ids.join(',') } });
};

/**
 * @description Salva uma ou mais faixas na biblioteca "Músicas Curtidas" do usuário.
 */
const saveTracks = async (ids: string[]) => {
  return await axios.put('/me/tracks', { ids });
};

/**
 * @description Remove uma ou mais faixas da biblioteca "Músicas Curtidas" do usuário.
 * @param ids Array com os IDs das faixas do Spotify. Máximo de 50 IDs por requisição.
 */
const deleteTracks = async (ids: string[]) => {
  return await axios.delete('/me/tracks', { data: { ids } });
};

/**
 * @description Verifica se o usuário atual segue uma playlist específica.
 */
const checkFollowedPlaylist = async (playlistId: string) => {
  return await axios.get<boolean[]>(`/playlists/${playlistId}/followers/contains`).catch(() => {
    return { data: false };
  });
};

/**
 * @description Verifica se o usuário atual segue um ou mais artistas.
 */
const checkFollowingArtists = async (ids: string[]) => {
  return await axios.get<boolean[]>('/me/following/contains', {
    params: { type: 'artist', ids: ids.join(',') },
  });
};

/**
 * @description Verifica se o usuário atual segue um ou mais outros usuários do Spotify.
 */
const checkFollowingUsers = async (ids: string[]) => {
  return await axios.get<boolean[]>('/me/following/contains', {
    params: { type: 'user', ids: ids.join(',') },
  });
};

/**
 * @description Obtém informações públicas do perfil de um usuário do Spotify.
 */
const getUser = async (id: string) => {
  return await axios.get<User>(`/users/${id}`);
};

/**
 * @description Remove o usuário atual como seguidor de uma playlist.
 */
const unfollowPlaylist = async (playlistId: string) => {
  return await axios.delete(`/playlists/${playlistId}/followers`);
};

/**
 * @description Adiciona o usuário atual como seguidor de uma playlist.
 */
const followPlaylist = async (playlistId: string) => {
  return await axios.put(`/playlists/${playlistId}/followers`);
};

/**
 * @description Adiciona o usuário atual como seguidor de um ou mais artistas.
 */
const followArtists = async (ids: string[]) => {
  return await axios.put('/me/following', { type: 'artist', ids });
};

/**
 * @description Remove o usuário atual como seguidor de um ou mais artistas.
 */
const unfollowArtists = async (ids: string[]) => {
  return await axios.delete('/me/following', { params: { type: 'artist', ids: ids.join(',') } });
};

/**
 * @description Adiciona o usuário atual como seguidor de um ou mais outros usuários.
 */
const followUsers = async (ids: string[]) => {
  return await axios.put('/me/following', { type: 'user', ids });
};

/**
 * @description Remove o usuário atual como seguidor de um ou mais outros usuários.
 */
const unfollowUsers = async (ids: string[]) => {
  return await axios.delete('/me/following', { params: { type: 'user', ids: ids.join(',') } });
};

/**
 * @description Obtém a lista de músicas salvas na biblioteca "Músicas Curtidas" do usuário.
 */
const getSavedTracks = async (params: PaginationQueryParams = {}) => {
  return await axios.get<Pagination<PlaylistItem>>(`/me/tracks`, { params });
};

export const userService = {
  getUser,
  saveTracks,
  fetchQueue,
  deleteTracks,
  getSavedTracks,
  fetchTopArtists,
  fetchTopTracks,
  checkSavedTracks,
  followPlaylist,
  checkFollowingUsers,
  followUsers,
  unfollowUsers,
  fetchFollowedArtists,
  checkFollowedPlaylist,
  unfollowPlaylist,
  checkFollowingArtists,
  followArtists,
  unfollowArtists,
};
