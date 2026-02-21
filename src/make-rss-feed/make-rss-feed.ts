import { XMLBuilder } from 'fast-xml-parser';
import type { RssFeed } from './types';

const makeRssFeedJson = (): RssFeed => ({
  rss: {
    '@_version': '2.0',
    channel: {
      title: 'Naruto Shippuuden Status',
      link: 'https://myanimelist.net/profile/kanyastrange',
      description: 'Status objerzanych odcinków Anime Shippuuden',
      // TODO, daty muszą być w odpowiednim formacie (https://whitep4nth3r.com/blog/how-to-format-dates-for-rss-feeds-rfc-822/)
      lastBuildDate: new Date().toUTCString(),
      language: 'pl',

      item: [
        {
          title: 'The Tale of Jiraiya the Gallant',
          description: 'Ep 133',
          link: 'https://naruto.fandom.com/wiki/The_Tale_of_Jiraiya_the_Gallant_(episode)',
          // TODO, daty muszą być w odpowiednim formacie (https://whitep4nth3r.com/blog/how-to-format-dates-for-rss-feeds-rfc-822/)
          pubDate: new Date('2026-02-21T10:01:00').toUTCString(),
        },
      ],
    },
  },
});

export const makeRssFeed = () => {
  const json = makeRssFeedJson();

  const builder = new XMLBuilder({
    attributeNamePrefix: '@_',
    ignoreAttributes: false,
    format: true,
  });
  const xmlContent = builder.build(json);
  return xmlContent;
};
