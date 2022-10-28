import Container from "../components/Container.tsx";
import CounterComponent from "../islands/Counter.tsx";

export default function Counter() {
  return (
    <Container>
      <CounterComponent start={3} />
    </Container>
  );
}