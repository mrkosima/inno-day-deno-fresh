import { PageProps, Handlers } from "$fresh/server.ts";

const temp = {
  "login": "mrkosima",
  "id": 6384121,
  "node_id": "MDQ6VXNlcjYzODQxMjE=",
  "avatar_url": "https://avatars.githubusercontent.com/u/6384121?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/mrkosima",
  "html_url": "https://github.com/mrkosima",
  "followers_url": "https://api.github.com/users/mrkosima/followers",
  "following_url": "https://api.github.com/users/mrkosima/following{/other_user}",
  "gists_url": "https://api.github.com/users/mrkosima/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/mrkosima/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/mrkosima/subscriptions",
  "organizations_url": "https://api.github.com/users/mrkosima/orgs",
  "repos_url": "https://api.github.com/users/mrkosima/repos",
  "events_url": "https://api.github.com/users/mrkosima/events{/privacy}",
  "received_events_url": "https://api.github.com/users/mrkosima/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Konstantin Klimashevich",
  "company": null,
  "blog": "",
  "location": "Amsterdam, Netherlands",
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": "mrkosima",
  "public_repos": 24,
  "public_gists": 1,
  "followers": 10,
  "following": 0,
  "created_at": "2014-01-12T19:46:53Z",
  "updated_at": "2022-10-07T12:43:42Z"
}

type Data = {
  login: string;
  avatar_url: string;
  name: string;
  public_repos: number;
  location: string;
};

export const handler: Handlers<Data | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: Data = await resp.json();
    return ctx.render(user)
    // return ctx.render(temp);
  },
};

export default function NewsById(props: PageProps<Data | null>) {
  const { data, params } = props;
  const userId = params['username'];
  if (!data) {
    return (
      <div className="container font-mono antialiased">
        <div className="max-w-lg mx-auto flex items-center shadow-lg mt-12">
          <h1 className="m-8">User {userId} was not found</h1>
        </div>
      </div>
    )
  }

  const { avatar_url, location, name, public_repos, login } = data;
  return (
    <div className="container font-mono antialiased">
      <div className="max-w-xl mx-auto flex items-center shadow-lg mt-12">
        <img src={`${avatar_url}`}
          alt={name}
          className="m-4 w-36 h-36 rounded-full" />
        <div className="text-gray-900 font-bold">
          <p>Username: <span className="text-green-500">{login}</span></p>
          <p>Name: <span className="text-gray-700 font-normal">{name}</span></p>
          <p>Location: <span className="text-gray-700 font-normal">{location}</span></p>
          <p>Public repos: <span className="text-gray-700 font-normal">{public_repos}</span></p>
        </div>
      </div>
    </div>
  );
}