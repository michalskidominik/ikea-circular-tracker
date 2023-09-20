import type { Sort } from './sort';

/**
 * Reprezentuje informacje o stronicowaniu.
 */
export interface Pageable {
  /** Informacje o sortowaniu. */
  sort: Sort;

  /** Numer bie??cej strony. */
  pageNumber: number;

  /** Rozmiar strony. */
  pageSize: number;

  /** Offset dla strony. */
  offset: number;

  /** Czy jest stronnicowane. */
  paged: boolean;

  /** Czy nie jest stronnicowane. */
  unpaged: boolean;
}
