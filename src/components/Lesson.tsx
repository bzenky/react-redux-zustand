import { Video } from "lucide-react"

interface LessonProps {
  title: string
  duration: string
}

export function Lesson({ title, duration }: LessonProps) {
  return (
    <button className="flex shrink-0 items-center gap-3 text-sm text-zinc-400">
      <div>
        <Video className="w-4 h-4 text-zinc-500" />
      </div>

      <span className="text-sm truncate">{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
    </button>
  )
}