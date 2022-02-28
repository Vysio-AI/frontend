

export default function DailyCompletionCard({ currentClientId }) {

  return (
    <div className="h-full w-full bg-slate-50 rounded-xl shadow-lg outline outline-1 outline-gray-100 flex flex-col items-start justify-start p-4">
      <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">Daily Completion</h1>
      <p>{currentClientId}</p>
    </div>
  )
}