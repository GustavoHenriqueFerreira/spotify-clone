export interface Artist {
  /** @description URLs externas conhecidas para este artista. */
  external_urls: {
    /** @description A URL do Spotify para este artista. */
    spotify: string;
  };

  /** @description Informações sobre os seguidores do artista. */
  followers: {
    /** @description Sempre será null, pois a Web API não oferece suporte a este campo atualmente. */
    href: string;

    /** @description O número total de seguidores. */
    total: number;
  };

  /**
   * @description Lista dos gêneros aos quais o artista está associado. Caso não haja classificação, o array estará vazio.
   * @example ["Prog rock", "Grunge"]
   */
  genres: string[];

  /** @description Link para o endpoint da Web API que fornece os detalhes completos do artista. */
  href: string;

  /** @description O ID do artista no Spotify. */
  id: string;

  /** @description Imagens do artista em vários tamanhos, começando pela mais larga. */
  images: {
    url: string;
    height: number;
    width: number;
  }[];

  /** @description O nome do artista. */
  name: string;

  /** @description A popularidade do artista (0–100). Calculada a partir da popularidade de todas as suas músicas. */
  popularity: number;

  /** @description O tipo do objeto. */
  type: 'artist';

  /** @description A URI do Spotify para o artista. */
  uri: string;
}

export type SimpleArtist = Pick<
  Artist,
  'external_urls' | 'id' | 'href' | 'name' | 'type' | 'uri'
>;
