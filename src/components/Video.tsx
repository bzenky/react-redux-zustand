import ReactPlayer from "react-player"

export function Video() {
  return (
    <div className="w-full bg-zinc-500 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        url="https://youtu.be/f2kbQKau-Bw"
      />
    </div>
  )
}