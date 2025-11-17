import { Track } from './track';
import type { User } from './user';

export interface Playlist {
  /**
   * @description true se o dono permite que outros usuários modifiquem a playlist.
   */
  collaborative: boolean;

  /**
   * @description A descrição da playlist. Retornada apenas para playlists modificadas ou verificadas; caso contrário, null.
   * @nullable
   * @example "Fique feliz com esta playlist para levantar o astral."
   * @type string
   */
  description: string | null;

  /**
   * @description Link para o endpoint da Web API que fornece todos os detalhes da playlist.
   */
  external_urls: {
    spotify: string;
  };

  /**
   * @description Link para o endpoint da Web API que fornece todos os detalhes.
   */
  href: string;

  /**
   * @description O ID do Spotify para a playlist.
   * @example "37i9dQZF1DXcBWIGoYBM5M"
   * @type string
   * @pattern ^[a-zA-Z0-9]+$
   */
  id: string;

  /**
   * @description Imagens da playlist. O array pode estar vazio ou conter até três imagens.
   * As imagens são retornadas em ordem decrescente de tamanho.
   * Obs.: Se retornada, a URL da imagem expira em menos de um dia.
   * @nullable
   * @type Image[]
   * @maxItems 3
   * @minItems 0
   * @uniqueItems true
   */
  images: {
    url: string;
    height: number;
    width: number;
  }[];

  /**
   * @description Objeto contendo informações sobre seguidores da playlist.
   */
  followers: {
    href: string;
    total: number;
  };

  /**
   * @description O nome da playlist.
   * @example "Today's Top Hits"
   * @type string
   */
  name: string;

  /**
   * @description O usuário que é dono da playlist.
   * @type User
   * @nullable
   */
  owner: User | null;

  /**
   * @description true se a playlist é pública, false se é privada, null se não for aplicável.
   * @nullable
   * @type boolean
   */
  public: boolean | null;

  /**
   * @description O identificador da versão atual da playlist.
   * Pode ser usado em outras requisições para acessar uma versão específica da playlist.
   * @example "7c9b1b4e"
   */
  snapshot_id: string;

  /**
   * @description Informações sobre as faixas da playlist.
   * @nullable
   */
  tracks: {
    href: string;
    total: number;
  } | null;

  /**
   * @description O tipo do objeto: "playlist".
   */
  type: 'playlist';

  /**
   * @description O URI do Spotify para a playlist.
   * @example "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
   * @type string
   */
  uri: string;
}

export interface PlaylistItem {
  /**
   * @description Data em que o item foi adicionado.
   */
  added_at: string;

  /**
   * @description Usuário que adicionou o item.
   */
  added_by: User;

  /**
   * @description true se a faixa é um arquivo local.
   */
  is_local: boolean;

  /**
   * @description Cor primária da faixa/playlist (se aplicável).
   */
  primary_color: string;

  /**
   * @description A faixa adicionada.
   */
  track: Track;
}

export interface PlaylistItemWithSaved extends PlaylistItem {
  /**
   * @description Indica se a faixa está salva na biblioteca do usuário.
   */
  saved: boolean;
}
