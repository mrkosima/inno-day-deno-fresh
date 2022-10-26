import CounterComponent from "../islands/Counter.tsx";

export default function Counter() {
  return (
    <>
      <div className="container">
        <div className="mt-12 font-mono max-w-sm mx-auto flex flex-col">
          <CounterComponent start={3} />
        </div>
      </div>
    </>
  );
}