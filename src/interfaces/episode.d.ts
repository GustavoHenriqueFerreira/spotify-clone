export interface Episode {
  /**
   * @description URL para uma prévia de 30 segundos (formato MP3) do episódio.
   * Será null se não estiver disponível.
   */
  audio_preview_url: string | null;

  /**
   * @description Descrição do episódio. As tags HTML são removidas deste campo.
   * Use o campo html_description caso precise das tags HTML.
   */
  description: string;

  /**
   * @description Descrição do episódio. Este campo pode conter tags HTML.
   */
  html_description: string;

  /**
   * @description Duração do episódio em milissegundos.
   */
  duration_ms: number;

  /**
   * @description Indica se o episódio contém conteúdo explícito
   * (true = sim; false = não ou desconhecido).
   */
  explicit: boolean;

  /**
   * @description URLs externas conhecidas para este episódio.
   */
  external_urls: {
    spotify: string;
  };

  /**
   * @description Link para o endpoint da Web API que fornece detalhes completos do episódio.
   */
  href: string;

  /**
   * @description ID do Spotify para o episódio.
   */
  id: string;

  /**
   * @description Imagens de capa do episódio em diversos tamanhos, da mais larga para a menor.
   */
  images: {
    url: string;
    height: number;
    width: number;
  }[];

  /**
   * @description True se o episódio for hospedado fora do CDN do Spotify.
   */
  is_externally_hosted: boolean;

  /**
   * @description True se o episódio estiver disponível para reprodução no mercado atual.
   * Caso contrário, false.
   */
  is_playable: boolean;

  /**
   * @description Idioma usado no episódio, identificado por um código ISO 639.
   * Este campo está obsoleto e pode ser removido no futuro.
   * @deprecated
   */
  language: string;

  /**
   * @description Lista de idiomas usados no episódio, identificados por códigos ISO 639.
   */
  languages: string[];

  /**
   * @description Nome do episódio.
   */
  name: string;

  /**
   * @description Data de lançamento do episódio, por exemplo "1981-12-15".
   * Dependendo da precisão, pode aparecer como "1981" ou "1981-12".
   */
  release_date: string;

  /**
   * @description Precisão da data de lançamento:
   * "year", "month" ou "day".
   */
  release_date_precision: string;

  /**
   * @description A posição mais recente do usuário no episódio.
   * Definido apenas quando o token possui o escopo user-read-playback-position.
   */
  resume_point: {
    /**
     * @description Indica se o episódio já foi totalmente reproduzido pelo usuário.
     */
    fully_played: boolean;

    /**
     * @description Posição mais recente do usuário no episódio, em milissegundos.
     */
    resume_position_ms: number;
  };

  /**
   * @description O tipo do objeto: “episode”.
   */
  type: '“episode”';

  /**
   * @description O URI do Spotify para o episódio.
   */
  uri: string;

  /**
   * @description Restrições do episódio.
   */
  restrictions: {
    reason: string;
  };

  /**
   * @description O show ao qual o episódio pertence.
   */
  show: {
    /**
     * @description Lista de países onde o show pode ser reproduzido,
     * identificados por códigos ISO 3166-1 alpha-2.
     */
    available_markets: string[];

    /**
     * @description Informações de copyright do show.
     */
    copyrights: {
      text: string;
      type: string;
    }[];

    /**
     * @description Descrição do show. As tags HTML são removidas deste campo.
     * Use html_description caso precise das tags HTML.
     */
    description: string;

    /**
     * @description Descrição do show, podendo conter tags HTML.
     */
    html_description: string;

    /**
     * @description Indica se o show possui conteúdo explícito.
     */
    explicit: boolean;

    /**
     * @description URLs externas conhecidas do show.
     */
    external_urls: {
      spotify: string;
    };

    /**
     * @description Link para o endpoint da Web API que fornece detalhes completos do show.
     */
    href: string;

    /**
     * @description ID do Spotify para o show.
     */
    id: string;

    /**
     * @description Imagens de capa do show em diversos tamanhos, da mais larga para a menor.
     */
    images: {
      url: string;
      height: number;
      width: number;
    }[];

    /**
     * @description Lista de idiomas usados no show.
     */
    languages: string[];

    /**
     * @description Tipo de mídia do show.
     */
    media_type: string;

    /**
     * @description Nome do show.
     */
    name: string;

    /**
     * @description Editor do show.
     */
    publisher: string;

    /**
     * @description O tipo do objeto: “show”.
     */
    type: 'show';

    /**
     * @description O URI do Spotify para o show.
     */
    uri: string;

    /**
     * @description Número total de episódios do show.
     */
    total_episodes: number;
  };
}
