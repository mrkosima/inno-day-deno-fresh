import { Head } from "$fresh/runtime.ts";
import Container from "../components/Container.tsx";
import GA4 from "../components/GA4.tsx";
import CounterComponent from "../islands/Counter.tsx";

export default function Counter() {
  return (
    <>
      <Head>
        <title>Xebia InnoDay</title>
        <GA4 />
      </Head>
      <Container>
        <CounterComponent start={3} />
      </Container>
    </>
  );
}