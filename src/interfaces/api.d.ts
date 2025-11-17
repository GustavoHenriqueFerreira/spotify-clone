export interface Pagination<T> {
  /** @description Link para o endpoint da Web API que retorna o resultado completo da requisição. */
  href: string;

  items: T[];

  /** @description O número máximo de itens na resposta (definido na consulta ou pelo padrão). */
  limit: number;

  /** @description O deslocamento (offset) dos itens retornados (definido na consulta ou pelo padrão). */
  offset: number;

  /** @description URL para a página anterior de itens (null se não existir). */
  previous: string | null;

  /** @description URL para a próxima página de itens (null se não existir). */
  next: string | null;

  /** @description O número total de itens disponíveis para retornar. */
  total: number;
}

export interface PaginationQueryParams {
  /** @description Limite de itens a serem retornados. */
  limit?: number;

  /** @description Índice (offset) do primeiro item a ser retornado. */
  offset?: number;
}
