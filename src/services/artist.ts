import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Album } from '../interfaces/albums';
import type { Artist } from '../interfaces/artist';
import type { Pagination } from '../interfaces/api';

/**
 * @description Obtém informações do catálogo do Spotify para um único artista identificado pelo seu ID único do Spotify.
 */
const fetchArtist = (id: string) => axios.get<Artist>(`/artists/${id}`);

/**
 * @description Obtém informações do catálogo do Spotify para vários artistas com base em seus IDs do Spotify.
 */
const fetchArtists = (ids: string[]) =>
  axios.get<{ artists: Artist[] }>(`/artists`, { params: { ids: ids.join(',') } });

/**
 * @description Obtém informações do catálogo do Spotify sobre os álbuns de um artista.
 */
const fetchArtistAlbums = (
  id: string,
  params: {
    /** @description Quantidade de álbuns a serem retornados. */
    limit?: number;
    /** @description Índice do primeiro álbum a ser retornado. */
    offset?: number;
    /** @description Lista de palavras-chave separadas por vírgula usadas para filtrar a resposta. */
    include_groups?: 'album' | 'single' | 'appears_on' | 'compilation';
    /** @description País usado para formatar a data de lançamento. */
    market?: string;
  } = {}
) => axios.get<Pagination<Album>>(`/artists/${id}/albums`, { params });

/**
 * @description Obtém informações do catálogo do Spotify sobre as músicas mais populares de um artista por país.
 */
const fetchArtistTopTracks = (id: string) =>
  axios.get<{ tracks: Track }>(`/artists/${id}/top-tracks`);

/**
 * @description Obtém informações do catálogo do Spotify sobre artistas similares a um artista específico. A similaridade é baseada na análise do histórico de audição da comunidade Spotify.
 */
const fetchSimilarArtists = (id: string) =>
  axios.get<{ artists: Artist[] }>(`/artists/${id}/related-artists`);

export const artistService = {
  fetchArtist,
  fetchArtists,
  fetchArtistAlbums,
  fetchArtistTopTracks,
  fetchSimilarArtists,
};
