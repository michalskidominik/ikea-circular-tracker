import type { Pageable } from "./pageable";
import type { Product } from "./product";
import type { Sort } from "./sort";

/**
 * Reprezentuje główną odpowiedź API z informacjami o produktach.
 */
export interface SearchResponse {
  /** Lista produktów. */
  content: Product[];

  /** Informacje o stronicowaniu. */
  pageable: Pageable;

  /** Całkowita liczba stron. */
  totalPages: number;

  /** Całkowita liczba elementów. */
  totalElements: number;

  /** Czy to jest ostatnia strona. */
  last: boolean;

  /** Liczba elementów na bieżącej stronie. */
  numberOfElements: number;

  /** Czy to jest pierwsza strona. */
  first: boolean;

  /** Informacje o sortowaniu. */
  sort: Sort;

  /** Rozmiar strony. */
  size: number;

  /** Numer bieżącej strony. */
  number: number;

  /** Czy odpowiedź jest pusta. */
  empty: boolean;
}
