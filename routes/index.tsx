import { Head } from "$fresh/runtime.ts";
import Container from "../components/Container.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Xebia InnoDay</title>
      </Head>
      <Container>
        <p className="mb-8 font-bold text-xl">Deno Fresh - Inno Day</p>
        <p>
          <a href="/joke">Best joke</a>
          <span className="text-gray-300"> (API)</span>
        </p>
        <p><a href="/news">Fresh News</a> <span className="text-gray-300"> (SSR + fetch)</span></p>
        <p><a href="/game">Game</a> <span className="text-gray-300">  (Form)</span></p>
        <p><a href="/github">Github</a> <span className="text-gray-300"> (Router)</span></p>
        <p><a href="/counter">Counter</a> <span className="text-gray-300"> (CSR Island)</span></p>
      </Container>
    </>
  );
}