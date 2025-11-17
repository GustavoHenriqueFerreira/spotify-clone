import axios from '../axios';

import type { Track } from '../interfaces/track';
import type { Album } from '../interfaces/albums';
import type { Artist } from '../interfaces/artist';
import type { Pagination } from '../interfaces/api';
import type { Playlist } from '../interfaces/playlists';

/**
 * @description Obtém informações do catálogo do Spotify sobre álbuns, artistas, playlists, faixas, shows, episódios ou audiolivros que correspondam a uma palavra-chave.  
 * Audiolivros estão disponíveis apenas nos mercados: EUA, Reino Unido, Canadá, Irlanda, Nova Zelândia e Austrália.
 */
export const querySearch = (params: {
  /**
   * @description Palavras-chave da busca e filtros/campos opcionais com operadores.
   */
  q: string;

  /**
   * @description Lista separada por vírgulas com os tipos de itens que devem ser pesquisados.
   */
  type: string;

  /**
   * @description Código de país ISO 3166-1 alpha-2 ou a string "from_token".  
   * Informe este parâmetro caso queira aplicar Track Relinking.
   */
  market?: string;

  /**
   * @description Número máximo de itens a retornar. Padrão: 20.  
   * Mínimo: 1. Máximo: 50.
   */
  limit?: number;

  /**
   * @description Índice do primeiro item a retornar.  
   * Padrão: 0 (o primeiro objeto).  
   * Use junto com "limit" para obter páginas seguintes.
   */
  offset?: number;
}) =>
  axios.get<{
    albums: Pagination<Album>;
    tracks: Pagination<Track>;
    artists: Pagination<Artist>;
    playlists: Pagination<Playlist>;
  }>(`/search`, { params });
