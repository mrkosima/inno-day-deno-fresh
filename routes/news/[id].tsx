import { PageProps } from "$fresh/server.ts";

export default function NewsById(props: PageProps) {
  const { id } = props.params;
  return (
    <main>
      <p>Here will be news with id {id}!</p>
    </main>
  );
}