import { Handlers, PageProps } from "$fresh/server.ts";
import Container from '../../components/Container.tsx';

type Data = {
  username: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username") || "";
    if (username) {
      return new Response("", {
        status: 303,
        headers: { Location: `/github/${username}` },
      });
    }
    return ctx.render({ username })
  },
};

export default function Game({ data }: PageProps<Data>) {
  const { username } = data;
  return (
    <Container>
      <h1 className="text-2xl my-4">Enter your github username</h1>
      <form className="mb-4">
        <input
          type="text"
          name="username"
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
          value={username} />
        <button
          type="submit"
          className="text-gray-700 bg-gray-100 hover:bg-gray-300 focus:outline-none rounded-sm font-medium text-sm w-full px-5 py-2.5 text-center"
        >Submit</button>
      </form>
    </Container >
  );
}