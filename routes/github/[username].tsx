import { Head } from "$fresh/runtime.ts";
import { PageProps, Handlers } from "$fresh/server.ts";
import Container from '../../components/Container.tsx';
import GA4 from "../../components/GA4.tsx";

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
  },
};

export default function GithubProfile(props: PageProps<Data | null>) {
  const { data, params } = props;
  const userId = params['username'];
  if (!data) {
    return (
      <div className="container font-mono antialiased mx-auto">
        <div className="max-w-lg mx-auto flex items-center shadow-lg mt-12 mx-auto">
          <h1 className="m-8">User {userId} was not found</h1>
        </div>
      </div>
    )
  }

  const { avatar_url, location, name, public_repos, login } = data;
  return (

    <>
      <Head>
        <GA4 />
      </Head>
      <Container>
        <div className="shadow-lg flex items-center gap-4">
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
      </Container>
    </>
  );
}