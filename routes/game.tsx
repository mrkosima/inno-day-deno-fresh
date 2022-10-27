import { Handlers, PageProps } from "$fresh/server.ts";
import type { FunctionComponent } from 'preact';

type Data = {
  answer: string;
  length: number;
  success: boolean | undefined;
  matches: ("none" | "present" | "match")[];
  cheat: boolean | undefined;
}

const GAME_ANSWER = (Deno.env.get('GAME_ANSWER') || '').toLowerCase();

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const originAnswer = url.searchParams.get("answer");
    const answer = (originAnswer || "").trim().toLowerCase();
    let matches: Data['matches'] = [];
    if (answer.length === GAME_ANSWER.length) {
      matches = answer.split('').map((c, i) => {
        if (GAME_ANSWER[i] === c) {
          return 'match';
        }
        if (GAME_ANSWER.indexOf(c) >= 0) {
          return 'present';
        }
        return 'none';
      })
    }

    return ctx.render({
      length: GAME_ANSWER.length,
      answer,
      matches,
      success: answer ? answer === GAME_ANSWER : undefined,
      cheat: answer ? answer.length !== GAME_ANSWER.length : undefined,
    })
  },
};

const Wrapper: FunctionComponent<{ answer: string, length: number }> = ({ children, answer, length }) => (
  <div className="container mx-auto">
    <div className="font-mono max-w-sm mx-auto">
      <h1 className="text-2xl my-4">Game: guess the word of the day which has <span className="text-red-900">{length}</span> characters</h1>
      <form className="mb-4">
        <input
          type="text"
          name="answer"
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
          value={answer} />
        <button
          type="submit"
          className="text-gray-100 rounded bg-green-500 hover:bg-green-400 focus:outline-none rounded-sm font-medium text-sm w-full px-5 py-2.5 text-center"
        >Submit</button>
      </form>
      {children}
    </div>
  </div>
)

export default function Game({ data }: PageProps<Data>) {
  const { success, cheat, answer, length, matches } = data;
  if (cheat) {
    return (
      <Wrapper answer={answer} length={length}>
        <div className="bg-red-100 text-red-900 text-center p-8 rounded">Don't cheat. The word should be {length} chars</div>
      </Wrapper>
    )
  }
  return (
    <Wrapper answer={answer} length={length}>
      {matches?.length > 0 && (
        <div className="flex gap-1 mt-12 justify-center">
          {matches.map((match, i) => {
            let bg = "bg-gray-500";
            if (match === 'match') {
              bg = "bg-green-500"
            }
            if (match === 'present') {
              bg = "bg-yellow-500"
            }
            return <div className={`p-4 ${bg} rounded text-white`}>{answer[i]}</div>
          })}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-900 text-center p-8 rounded mt-4">Congrats, <span className="font-bold">"{answer}"</span> is the riddled word!</div>
      )}

    </Wrapper>
  )
}