import { expect, test } from 'bun:test';
import { extractWatchedDates } from './mal-extract-watched-dates';

const exampleHtml = `
<div class="spaceit_pad" id="eprow2310190653">Ep 1126, watched on 01/16/2026 at 20:21 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow2255279901">Ep 1125, watched on 08/25/2025 at 22:59 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow1905288962">Ep 188, watched on 07/11/2023 at 18:40 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow1905260248">Ep 187, watched on 07/11/2023 at 17:36 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow1905251418">Ep 186, watched on 07/11/2023 at 17:13 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow1878181355">Ep 11, watched on 05/22/2023 at 20:42 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow1878090204">Ep 10, watched on 05/22/2023 at 17:25 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow1878090194">Ep 9, watched on 05/22/2023 at 17:25 <a><small>Remove</small></a></div>
<div class="spaceit_pad" id="eprow1878029546">Ep 8, watched on 05/22/2023 at 13:48 <a><small>Remove</small></a></div>
`;

test('extracting dates from html', () => {
  expect(extractWatchedDates(exampleHtml)).toMatchInlineSnapshot(`
    [
      {
        "date": 2026-01-16T20:21:00.000Z,
        "episode": 1126,
      },
      {
        "date": 2025-08-25T22:59:00.000Z,
        "episode": 1125,
      },
      {
        "date": 2023-07-11T18:40:00.000Z,
        "episode": 188,
      },
      {
        "date": 2023-07-11T17:36:00.000Z,
        "episode": 187,
      },
      {
        "date": 2023-07-11T17:13:00.000Z,
        "episode": 186,
      },
      {
        "date": 2023-05-22T20:42:00.000Z,
        "episode": 11,
      },
      {
        "date": 2023-05-22T17:25:00.000Z,
        "episode": 10,
      },
      {
        "date": 2023-05-22T17:25:00.000Z,
        "episode": 9,
      },
      {
        "date": 2023-05-22T13:48:00.000Z,
        "episode": 8,
      },
    ]
  `);
});
