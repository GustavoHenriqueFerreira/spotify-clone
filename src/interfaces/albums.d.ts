import type { SimpleArtist } from './artist';

export interface Album {
  /** @description O tipo do álbum. */
  album_type: 'album' | 'single' | 'compilation';

  /** @description Os artistas do álbum. Cada objeto de artista inclui um link em `href` para mais informações detalhadas sobre o artista. */
  artists: SimpleArtist[];

  /** @description Os mercados nos quais o álbum está disponível: códigos de países ISO 3166-1 alpha-2. OBS: um álbum é considerado disponível em um mercado quando pelo menos uma de suas faixas está disponível nele. */
  available_markets: string[];

  /** @description URLs externas conhecidas para este álbum. */
  external_urls: {
    spotify: string;
  };

  /** @description Um link para o endpoint da Web API que fornece detalhes completos sobre o álbum. */
  href: string;

  /** @description O ID do Spotify para o álbum. */
  id: string;

  /** @description As imagens da capa do álbum em vários tamanhos, da mais larga para a mais estreita. */
  images: {
    url: string;
    width: number;
    height: number;
  }[];

  /** @description O nome do álbum. No caso de um takedown, este valor pode ser uma string vazia. */
  name: string;

  /** @description A data em que o álbum foi lançado pela primeira vez. */
  release_date: string;

  /** @description A precisão com que o valor de `release_date` é conhecido. */
  release_date_precision: 'year' | 'month' | 'day';

  /** @description O número total de faixas no álbum. */
  total_tracks: number;

  /** @description O tipo do objeto. */
  type: 'album';

  /** @description O URI do Spotify para o álbum. */
  uri: string;
}

interface AlbumFullObject extends Album {
  /** @description As faixas do álbum. */
  tracks: Track[];
}
