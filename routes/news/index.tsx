import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import StoryItem from '../../components/StoryItem.tsx';

const API_PREFIX = "https://hacker-news.firebaseio.com/v0/";

export function fetchApi(suffix: string) {
  return fetch(`${API_PREFIX}${suffix}.json?print=pretty`)
}

export function fetchTopStories() {
  return fetchApi("topstories");
}

export function fetchItem(id: number) {
  return fetchApi(`item/${id}`);
}

type TopStories = {
  id: number;
  by: string;
  descendants: number
  score: number;
  type: 'story';
  time: number;
  title: string;
  url: string;
}[];

export const handler: Handlers = {
  async GET(req, ctx) {
    console.log('handler news');
    const resp = await fetchTopStories();
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const storiesIds: number[] = await resp.json();
    const stories: TopStories = await Promise.all(
      storiesIds.slice(0, 3).map(id => fetchItem(id).then(res => res.json()))
    )
    return ctx.render(stories);
  },
};

export default function News({ data }: PageProps<TopStories | null>) {
  if (!data) {
    return (
      <h1>User failed to load</h1>
    )
  }
  return (
    <>
      <Head>
        <title>Xebia InnoDay - Fresh Hacker News</title>
      </Head>
      <div className="container font-mono antialiased" >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl my-4">Fresh Hacker News</h1>
          <ul>
            {data.map(({ id, by, descendants, score, time, url, title }) =>
              <li className="bg-gray-100 hover:bg-yellow-100 transition-colors duration-300 box-border border-dashed border-b-1 border-gray-300">
                <StoryItem id={id} descendants={descendants} url={url} title={title} score={score} time={time} by={by} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
