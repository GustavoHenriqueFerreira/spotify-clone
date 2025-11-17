import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Album, AlbumFullObject } from '../interfaces/albums';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

const fetchNewRelases = (params: PaginationQueryParams = {}) =>
  axios.get<{ albums: Pagination<Album> }>('/browse/new-releases', { params });

/**
 * @description Obtém informações do catálogo do Spotify para um único álbum.
 */
const fetchAlbum = (id: string) => axios.get<AlbumFullObject>(`/albums/${id}`);

/**
 * @description Obtém informações do catálogo do Spotify para múltiplos álbuns identificados pelos seus IDs.
 */
const fetchAlbums = (ids: string[]) =>
  axios.get<{ albums: Album[] }>(`/albums`, { params: { ids: ids.join(',') } });

/**
 * @description Obtém informações sobre as faixas de um álbum. Parâmetros opcionais podem ser usados para limitar a quantidade de faixas retornadas.
 */
const fetchAlbumTracks = (id: string, params: PaginationQueryParams = {}) =>
  axios.get<Pagination<Track>>(`/albums/${id}/tracks`, { params });

/**
 * @description Obtém a lista de álbuns salvos na biblioteca "Suas Músicas" do usuário atual.
 */
const fetchSavedAlbums = (params: PaginationQueryParams = {}) =>
  axios.get<Pagination<{ added_at: string; album: Album }>>('/me/albums', { params });

/**
 * @description Salva um ou mais álbuns na biblioteca "Suas Músicas" do usuário atual.
 */
const saveAlbums = (ids: string[]) => axios.put('/me/albums', { ids });

/**
 * @description Remove um ou mais álbuns da biblioteca "Suas Músicas" do usuário atual.
 */
const deleteAlbums = (ids: string[]) => axios.delete('/me/albums', { data: { ids } });

export const albumsService = {
  fetchAlbum,
  fetchAlbums,
  fetchNewRelases,
  fetchSavedAlbums,
  fetchAlbumTracks,
  saveAlbums,
  deleteAlbums,
};
