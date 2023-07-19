import ReactPlayer from "react-player"
import { next, useCurrentLesson } from "../store/slices/player"
import { useAppDispatch, useAppSelector } from "../store"
import { Loader } from "lucide-react"

export function Video() {
  const dispatch = useAppDispatch()
  const { currentLesson } = useCurrentLesson()
  const isLoading = useAppSelector(state => state.player.isLoading)

  function handlePlayNext() {
    return (
      dispatch(next())
    )
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading
        ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        )
        : (
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            onEnded={handlePlayNext}
            url={`https://youtu.be/${currentLesson?.id}`}
          />
        )
      }

    </div>
  )
}