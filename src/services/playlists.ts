import axios from '../axios';

// Interfaces
import type { Track } from '../interfaces/track';
import type { Playlist, PlaylistItem } from '../interfaces/playlists';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

/**
 * @description Obtém uma playlist pertencente a um usuário do Spotify.
 * @param playlistId O ID da playlist no Spotify.
 */
const getPlaylist = async (playlistId: string) => {
  return axios.get<Playlist>(`/playlists/${playlistId}`);
};

interface GetPlaylistItemsParams extends PaginationQueryParams {
  fields?: string;
}

/**
 * @description Obtém detalhes completos dos itens de uma playlist pertencente a um usuário do Spotify.
 */
const getPlaylistItems = async (
  playlistId: string,
  params: GetPlaylistItemsParams = { limit: 50 }
) => {
  return axios.get<Pagination<PlaylistItem>>(`/playlists/${playlistId}/tracks`, { params });
};

/**
 * @description Obtém uma lista de playlists que o usuário atual do Spotify possui ou segue.
 */
const getMyPlaylists = async (params: PaginationQueryParams = {}) => {
  return axios.get<Pagination<Playlist>>('/me/playlists', { params });
};

interface GetFeaturedPlaylistsParams extends PaginationQueryParams {
  locale?: string;
}

/**
 * @description Obtém uma lista de playlists em destaque no Spotify (exibidas, por exemplo, na aba “Explorar” do player).
 */
const getFeaturedPlaylists = async (params: GetFeaturedPlaylistsParams = {}) => {
  return axios.get<{ playlists: Pagination<Playlist> }>('/browse/featured-playlists', { params });
};

/**
 * @description Adiciona um ou mais itens à playlist de um usuário.
 */
const addPlaylistItems = async (playlistId: string, uris: string[], snapshot_id: string) => {
  return axios.post(`/playlists/${playlistId}/tracks`, {
    uris,
    snapshot_id,
  });
};

/**
 * @description Remove um ou mais itens da playlist de um usuário.
 */
const removePlaylistItems = async (playlistId: string, uris: string[], snapshot_id: string) => {
  return axios.delete(`/playlists/${playlistId}/tracks`, {
    data: {
      tracks: uris.map((uri) => ({ uri })),
      snapshot_id,
    },
  });
};

/**
 * @description Reordena ou substitui itens de uma playlist, dependendo dos parâmetros enviados.
 * Para reordenar, envie range_start, insert_before, range_length e snapshot_id.
 * Para substituir itens, envie uris como parâmetro de query ou no corpo da requisição.
 * Substituir itens sobrescreve completamente o conteúdo atual da playlist.
 */
const reorderPlaylistItems = async (
  playlistId: string,
  uris: string[],
  rangeStart: number,
  insertBefore: number,
  rangeLength: number,
  snapshotId: string
) => {
  return axios.put(
    `/playlists/${playlistId}/tracks`,
    {
      range_start: rangeStart,
      insert_before: insertBefore,
      range_length: rangeLength,
      snapshot_id: snapshotId,
    },
    { params: { uris } }
  );
};

/**
 * @description Altera o nome e as configurações de privacidade/colaboração de uma playlist.
 * (O usuário precisa ser o dono da playlist.)
 */
const changePlaylistDetails = async (
  playlistId: string,
  data: {
    name?: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  }
) => {
  return axios.put(`/playlists/${playlistId}`, data);
};

/**
 * @description Substitui a imagem usada como capa de uma playlist específica.
 * @body Imagem JPEG codificada em Base64. Tamanho máximo da carga: 256 KB.
 */
const changePlaylistImage = async (playlistId: string, image: string, content: string) => {
  return axios.put(`/playlists/${playlistId}/images`, image, {
    headers: { 'Content-Type': content },
  });
};

/**
 * @description Cria uma playlist para um usuário do Spotify.
 * A playlist será criada vazia até que você adicione músicas.
 * Cada usuário pode ter no máximo aproximadamente 11.000 playlists.
 */
const createPlaylist = async (
  userId: string,
  data: {
    name: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  }
) => {
  return axios.post<Playlist>(`/users/${userId}/playlists`, data);
};

/**
 * @description Obtém recomendações com base nos seeds fornecidos (artistas, gêneros ou faixas).
 * Se houver informações suficientes, uma lista de faixas compatíveis será retornada.
 */
const getRecommendations = async (params: {
  seed_artists?: string;
  seed_genres?: string;
  limit?: number;
  seed_tracks?: string;
}) => {
  return axios.get<{ tracks: Track[] }>('/recommendations', { params });
};

/**
 * @description Obtém uma lista de playlists pertencentes ou seguidas por um determinado usuário.
 */
const getPlaylists = async (
  userId: string,
  params: {
    limit?: number;
    offset?: number;
  }
) => {
  return axios.get<Pagination<Playlist>>(`/users/${userId}/playlists`, { params });
};

export const playlistService = {
  getPlaylist,
  getPlaylists,
  getMyPlaylists,
  createPlaylist,
  getPlaylistItems,
  addPlaylistItems,
  getRecommendations,
  changePlaylistImage,
  removePlaylistItems,
  getFeaturedPlaylists,
  reorderPlaylistItems,
  changePlaylistDetails,
};
