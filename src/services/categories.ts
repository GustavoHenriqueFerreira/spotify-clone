import axios from '../axios';

import type { Playlist } from '../interfaces/playlists';
import type { Category } from '../interfaces/categories';
import type { Pagination, PaginationQueryParams } from '../interfaces/api';

/**
 * @description Obtém uma lista de categorias usadas para marcar itens no Spotify (por exemplo, na aba “Explorar” do player do Spotify).
 */
const fetchCategories = (params: PaginationQueryParams = {}) =>
  axios.get<{ categories: Pagination<Category> }>('/browse/categories', { params });

/**
 * @description Obtém uma lista de playlists do Spotify marcadas com uma categoria específica.
 */
const fetchCategoryPlaylists = (categoryId: string, params: PaginationQueryParams = {}) =>
  axios.get<{ playlists: Pagination<Playlist> }>(`/browse/categories/${categoryId}/playlists`, {
    params,
  });

/**
 * @description Obtém uma única categoria usada para marcar itens no Spotify (por exemplo, na aba “Explorar” do player do Spotify).
 */
const fetchCategory = (categoryId: string) =>
  axios.get<Category>(`/browse/categories/${categoryId}`);

export const categoriesService = {
  fetchCategories,
  fetchCategoryPlaylists,
  fetchCategory,
};
