import ReactPlayer from "react-player"
import { useDispatch } from "react-redux"
import { next, useCurrentLesson } from "../store/slices/player"

export function Video() {
  const dispatch = useDispatch()
  const { currentLesson } = useCurrentLesson()

  function handlePlayNext() {
    return (
      dispatch(next())
    )
  }

  return (
    <div className="w-full bg-zinc-500 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        onEnded={handlePlayNext}
        url={`https://youtu.be/${currentLesson.id}`}
      />
    </div>
  )
}