import { XMLBuilder } from 'fast-xml-parser';
import type { RssFeed } from './types';

const makeRssFeedJson = (): RssFeed => ({
  rss: {
    '@_version': '2.0',
    // '@_xmlns:atom': 'http://www.w3.org/2005/Atom',
    // 'atom:link': {
    //   '@_href':
    //     'https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/naruto.xml',
    //   '@_rel': 'self',
    //   '@_type': 'application/rss+xml',
    // },
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
          // guid: '133',
        },
      ],
    },
  },
});

export const makeRssFeed = async () => {
  const json = makeRssFeedJson();

  const builder = new XMLBuilder({
    attributeNamePrefix: '@_',
    ignoreAttributes: false,
    format: true,
  });
  const xmlContent = builder.build(json);
  return xmlContent;
};
