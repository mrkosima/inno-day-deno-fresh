type StoryItemProps = {
  id: number;
  url: string;
  title: string;
  by: string;
  time: number;
  descendants: number;
  score: number;
}
export default function StoryItem({ by, url, title, score, time, descendants }: StoryItemProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="relative pb-2 pt-1 pl-8 inline-block w-full">
      <img src={`http://s2.googleusercontent.com/s2/favicons?domain_url=${url}`}
        alt={title}
        className="absolute left-2 top-2" />
      <p className="text-gray-600 font-semibold">{title}</p>
      <p className="text-gray-400 text-sm mt-1">
        <span>{score} points</span>
        {" | "}
        <span>by {by}</span>
        {" | "}
        {/* <span>{humanizeDuration(Date.now() - time * 1000, {round: true, largest: 1})} ago</span> */}
        <span>{Date.now() - time * 1000}</span>
        {" | "}
        <span>{descendants} comments</span>
      </p>
    </a>
  )

}