export interface Category {
  /** @description Link para o endpoint da Web API que retorna todos os detalhes da categoria. */
  href: string;

  /** @description Os ícones da categoria, em vários tamanhos. */
  icons: {
    /** @description A URL de origem da imagem. */
    url: string;

    /** @description A largura da imagem em pixels. */
    width: number;

    /** @description A altura da imagem em pixels. */
    height: number;
  }[];

  /** @description O ID da categoria no Spotify. */
  id: string;

  /** @description O nome da categoria. */
  name: string;
}
