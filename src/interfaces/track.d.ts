import type { Album } from './albums';
import type { SimpleArtist } from './artist';

export interface Track {
  /**
   * @description O álbum no qual a faixa aparece. O objeto do álbum inclui um link em `href` para informações completas sobre o álbum.
   */
  album: Album;

  /**
   * @description Os artistas que performaram a faixa. Cada objeto de artista inclui um link em `href` para mais detalhes sobre o artista.
   */
  artists: SimpleArtist[];

  /**
   * @description Lista dos países em que a faixa pode ser reproduzida, identificados por seus códigos ISO 3166-1 alpha-2.
   */
  available_markets: string[];

  /**
   * @description O número do disco (geralmente 1, a menos que o álbum tenha mais de um disco).
   */
  disc_number: number;

  /**
   * @description A duração da faixa em milissegundos.
   */
  duration_ms: number;

  /**
   * @description Indica se a faixa possui conteúdo explícito (true = sim; false = não ou desconhecido).
   */
  explicit: boolean;

  /**
   * @description IDs externos conhecidos da faixa.
   */
  external_ids: {
    isrc: string;
  };

  /**
   * @description URLs externas conhecidas para esta faixa.
   */
  external_urls: {
    /**
     * @description A URL da faixa no Spotify.
     */
    spotify: string;
  };

  /**
   * @description Link para o endpoint da Web API que fornece detalhes completos da faixa.
   */
  href: string;

  /**
   * @description O ID da faixa no Spotify.
   */
  id: string;

  /**
   * @description Indica se a faixa é um arquivo local.
   */
  is_local: false;

  /**
   * @description Parte da resposta quando o Track Relinking é aplicado. Se true, a faixa pode ser reproduzida no mercado atual; caso contrário, false.
   */
  is_playable: boolean;

  /**
   * @description O nome da faixa.
   */
  name: string;

  /**
   * @description A popularidade da faixa, entre 0 e 100. É calculada com base na popularidade de todas as faixas do álbum.
   */
  popularity: number;

  /**
   * @description Uma URL para um preview de 30 segundos da faixa (formato MP3).
   */
  preview_url: string;

  /**
   * @description O número da faixa. Em álbuns com múltiplos discos, esse número corresponde ao disco atual.
   */
  track_number: number;

  /**
   * @description O tipo do objeto.
   */
  type: 'track';

  /**
   * @description O URI da faixa no Spotify.
   */
  uri: string;
}

export interface TrackWithSave extends Track {
  saved: boolean;
}
