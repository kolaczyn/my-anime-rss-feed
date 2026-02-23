# Notes

## Zasoby

- Łopatologicznie wytłumaczone jak korzystać z OAuth w MyAnimeList: https://myanimelist.net/blog.php?eid=835707
- Jak korzystać z API MyAnimeList z samym application id: https://myanimelist.net/forum/?topicid=1973077
- Dokumentacja API MyAnimeList: https://myanimelist.net/apiconfig/references/api/v2
- Nieoficjalna dokumentacja API MyAnimeListhttps://github.com/SuperMarcus/myanimelist-api-specification
- Endpoint który zwraca daty obejrzenia odcinków: https://myanimelist.net/ajaxtb.php?keepThis=true&detailedaid=1735

- Specyfikacja RSS https://www.rssboard.org/rss-specification
- Przykładowy RSS feed: https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us

## Nowe terminy dla mnie oraz rzeczy do nauki

- PKCE generator - co to?
- Mniej więcej kojarzę czym jest OAuth. Ale w jaki sposób działa? Jak można zrobić własny OAuth (żeby zrozumieć jak to działa pod spodem)?
- Jak w rozszerzeniu Huachao Mao można korzystać ze zmiennych które są ukryte i żeby było mniej duplikacji
- Jaki w ogóle jest cel refresh tokena? W jakiej sytuacji zwiększa to security? Bo często jeśli ktoś ma tokena, to też ma refresh tokena.
  - wytłumaczenie jest tutaj: https://stackoverflow.com/questions/10703532/whats-the-point-of-refresh-token
- może zrobić dekotator który loguje przed i po wykonaniu promise'a?
- znaleźć alternatywę do Axios, która nie wyrzuca błędu jeśli jest error (żeby było bardziej w stylu programowania funkcyjnego)

## Monorepo bun cheat sheet

```
bun install --filter "@app/frontend" is-even
```
