import { Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  answer: string;
  result: boolean | undefined;
}

const GAME_ANSWER = Deno.env.get('GAME_ANSWER');

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const answer = url.searchParams.get("answer") || "";
    return ctx.render({ answer, result: answer ? answer === GAME_ANSWER : undefined })
  },
};

  export default function Game({ data }: PageProps<Data>) {
    const { result, answer } = data;
return (
  <div className="container">
    <div className="font-mono max-w-sm mx-auto">
      <h1 className="text-2xl my-4">Game: type in my name</h1>
      <form className="mb-4">
        <input
          type="text"
          name="answer"
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
          value={answer} />
        <button
          type="submit"
          className="text-gray-700 bg-gray-100 hover:bg-gray-300 focus:outline-none rounded-sm font-medium text-sm w-full px-5 py-2.5 text-center"
        >Submit</button>
      </form>
      {result !== undefined && (
        result ?
          (
            <div className="bg-green-100 text-green-900 text-center p-8">You're a great person!</div>
          )
          :
          (
            <div className="bg-red-100 text-red-900 text-center p-8">Shame on you!</div>
          )
      )}
    </div>
  </div >
);
}