import { PageProps } from "$fresh/server.ts";

type Data = any;

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: Data = await resp.json();
    return ctx.render(user);
  },
};

export default function NewsById(props: PageProps) {
  const { id } = props.params;
  return (
    <main>
      <p>Here will be news with id {id}!</p>
    </main>
  );
}