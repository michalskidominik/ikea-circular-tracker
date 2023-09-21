## Prompt:

Jesteś analitykiem biznesowym aplikacji webowych. Pracujesz nad planem aplikacji internetowej, która śledzi obecne promocje w sklepie Ikea. Aplikacja, którą planujesz, pozwala użytkownikom na przegląd obecnych przedmiotów w promocji. Aplikacja pozwala na wyszukanie przedmiotów, które nie są dostępne w promocji, ale są dostępne w katalogu przedmiotów Ikea.

## Funkcjonalności aplikacji

### 1. Rejestracja i Logowanie:
- Użytkownik może się zarejestrować, podając swój adres e-mail i hasło.
- Logowanie za pomocą adresu e-mail i hasła.
- **(wersja 2.0)** Opcja resetowania hasła w przypadku jego zapomnienia.

### 2. Przeglądanie Promocji:
- Wyświetlanie wszystkich aktualnych przedmiotów w promocji dla wybranego sklepu.
- Filtracja i sortowanie przedmiotów według nazwy i sklepu IKEA.
- Bezpośredni link do strony produktu w sklepie IKEA.

### 3. Wyszukiwarka Produktów:
- Możliwość wyszukania konkretnego produktu zarówno wśród produktów w promocji, jak i w całym katalogu IKEA.

### 4. Obserwowanie Produktów:
- Użytkownicy mogą dodać produkty do listy obserwowanych, aby otrzymywać powiadomienia o zmianach cen.
- Wyświetlanie listy produktów, które użytkownik obserwuje.
- Użytkownicy mogą usunąć produkty z listy obserwowanych.
- **(wersja 3.0)** Możliwość ustawienia konkretnego progu ceny dla obserwowanego produktu, przy którym użytkownik dostanie powiadomienie.

### 5. Powiadomienia:
- Automatyczne powiadomienia e-mail o nowych promocjach dotyczących obserwowanych produktów.

### 6. Zaktualizuj Profil:
- **(wersja 2.0)** Użytkownik może zmienić swój adres e-mail lub hasło.
- **(wersja 2.0)** Możliwość usunięcia konta.

## Struktura danych
Aplikacja korzysta z bazy danych MongoDB. Baza danych zawiera cztery kolekcje, które przechowują dane użytkowników, przedmiotów, sklepów IKEA oraz historii cen.

### 1. Kolekcja Użytkowników (`users`):

- `_id`: unikalny identyfikator użytkownika
- `email`: adres e-mail użytkownika
- `passwordHash`: zahashowane hasło użytkownika
- `trackedItems`: lista identyfikatorów przedmiotów, które użytkownik obserwuje
- `notifiedItems`: lista identyfikatorów przedmiotów, o których użytkownik został już powiadomiony
- `lastNotificationDate`: data i czas ostatniego wysłanego powiadomienia

### 2. Kolekcja Przedmiotów (`items`):

- `_id`: unikalny identyfikator przedmiotu
- `name`: nazwa przedmiotu
- `storeId`: identyfikator sklepu IKEA, który wystawił przedmiot
- `originalPrice`: pierwotna cena przedmiotu (cena przed obniżką)
- `discountPrice`: aktualna cena promocyjna
- `imageUrl`: link do zdjęcia przedmiotu
- `ikeaUrl`: link do strony produktu w sklepie IKEA
- `lastChecked`: data ostatniego sprawdzenia promocji
- `nextCheckTime`: czas następnego sprawdzenia ceny

### 3. Kolekcja sklepów IKEA (`stores`):

- `_id`: unikalny identyfikator sklepu
- `name`: nazwa sklepu

### 4. Kolekcja Historii Cen (`priceHistory`):

- `_id`: unikalny identyfikator wpisu
- `itemId`: identyfikator przedmiotu, którego dotyczy historia ceny
- `date`: data zapisu (czas rejestracji zmiany ceny)
- `discountPrice`: cena promocyjna w danej dacie
- `originalPrice`: pierwotna cena przedmiotu w danej dacie

## Endpointy API

Aplikacja korzysta z API, które udostępnia dane o przedmiotach w promocji. API jest dostępne pod adresem: `https://ikea-price-tracker.vercel.com/api/v<major>.<minor>`.  

Aplikacja wersjonuje API w formacie `v<major>.<minor>`, gdzie `major` oznacza główną wersję API, a `minor` oznacza wersję API w ramach danej głównej wersji.  

Dokumentacja API w formacie Swagger jest dostępna pod adresem: `https://ikea-price-tracker.vercel.com/api/v<major>.<minor>/docs`.

### 1. Użytkownicy:

**Rejestracja:**  
POST `/api/users/register`  
Body:

```json
{
  "email": "string",
  "password": "string"
}
```

---

**Logowanie:**  
POST `/api/users/login`  
Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:  
Token JWT do uwierzytelniania

```json
{
  "token": "string"
}
```

---

**Aktualizacja profilu (wersja 2.0):**  
PATCH `/api/users/update`  
Header:

```json
{
  "Authorization": "Bearer <token>"
}
```

Body:

```json
{
  "password?=": "string"
}
```

---

**Usuwanie konta (wersja 2.0):**  
DELETE `/api/users/delete`
Header:

```json
{
  "Authorization": "Bearer <token>"
}
```

---

**Resetowanie hasła (wersja 2.0):**  
POST `/api/users/password/reset`  
Body:

```json
{
  "email": "string"
}
```

### 2. Przedmioty:

**Pobranie wszystkich przedmiotów w promocji:**  
GET `/api/items/discounts?storeId=<storeId>&page=<pageNumber>&limit=<pageSize>`  
Response:

```json
{
  "items": [
    {
      "_id": "string",
      "name": "string",
      "storeId": "string",
      "originalPrice": 0,
      "discountPrice": 0,
      "imageUrl": "string",
      "ikeaUrl": "string"
    }
  ],
  "totalPages": 0,
  "currentPage": "number"
}
```

**Pobranie przedmiotów posortowanych od największej przeceny:**  
GET `/api/items/hottest-deals?storeId=<storeId>&page=<pageNumber>&limit=<pageSize>`  
Response:

```json
{
  "items": [
    {
      "_id": "string",
      "name": "string",
      "storeId": "string",
      "originalPrice": 0,
      "discountPrice": 0,
      "discountDifference": 0,
      "imageUrl": "string",
      "ikeaUrl": "string"
    }
  ],
  "totalPages": 0,
  "currentPage": "number"
}
```

---

**Wyszukiwanie przedmiotów:**  
GET `/api/items/search?query=<searchQuery>&storeId=<storeId>&page=<pageNumber>&limit=<pageSize>`  
Response:

```json
{
  "items": [
    {
      "_id": "string",
      "name": "string",
      "storeId": "string",
      "originalPrice": 0,
      "discountPrice": 0,
      "imageUrl": "string",
      "ikeaUrl": "string"
    }
  ],
  "totalPages": 0,
  "currentPage": "number"
}
```

---

**Obserwowanie produktu:**  
POST `/api/items/track`  
Header:

```json
{
  "Authorization": "Bearer <token>"
}
```

Body:

```json
{
  "itemId": "string"
}
```

---

**Przestanie obserwowania produktu:**  
DELETE `/api/items/untrack`  
Header:

```json
{
  "Authorization": "Bearer <token>"
}
```

Body:

```json
{
  "itemId": "string"
}
```

---

**Pobranie listy obserwowanych przedmiotów użytkownika:**  
GET `/api/items/tracked?page=<pageNumber>&limit=<pageSize>`  
Header:

```json
{
  "Authorization": "Bearer <token>"
}
```

Response:

```json
{
  "items": [
    {
      "_id": "string",
      "name": "string",
      "storeId": "string",
      "originalPrice": 0,
      "discountPrice": 0,
      "imageUrl": "string",
      "ikeaUrl": "string"
    }
  ],
  "totalPages": 0,
  "currentPage": "number"
}
```

---

### 3. Sklepy IKEA

**Pobranie listy sklepów:**  
GET `/api/stores`  
Response:

```json
{
  "stores": [
    {
      "_id": "string",
      "name": "string"
    }
  ]
}
```
