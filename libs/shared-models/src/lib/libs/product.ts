/**
 * Reprezentuje informacje o produkcie.
 */
export interface Product {
  /** Unikalny identyfikator produktu. */
  id: number;

  /** Unikalny identyfikator sklepu. */
  storeId: string;

  /** Tytuł produktu. */
  title: string;

  /** Opis produktu. */
  description: string;

  /** Cena produktu. */
  price: number;

  /** URL do głównego obrazka produktu. */
  heroImage: string;

  /** Cena artykułów w produkcie. */
  articlesPrice: number;

  /** Waluta. */
  currency: string;

  /** Priorytet produktu. */
  priority: number;

  /** Powód rabatu. */
  reasonDiscount: string;

  /** Dodatkowe informacje o produkcie. */
  additionalInfo: string | null;
}
