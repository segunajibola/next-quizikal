import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuizResult({
  name,
  correctCount,
  total,
  date,
  time,
  uploadToDB,
  saveAsPNG,
}) {
  const dividedScore = correctCount / total.length;
  const percentage = dividedScore * 100;
  let emoji =
    dividedScore <= 0.2
      ? "😭"
      : dividedScore <= 0.4
      ? "😒"
      : dividedScore <= 0.6
      ? "😉"
      : dividedScore <= 0.8
      ? "😜"
      : dividedScore <= 1
      ? "😆🙌"
      : "";
  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-2" id="quizResult">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Quiz Result</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Congratulations on completing the quiz!
        </p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Name:</span>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Score:</span>
            <span className="font-medium text-primary">
              {correctCount} / {total.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Percentage & Emoji
            </span>
            <span className="font-medium text-primary">
              {percentage}% {emoji}
            </span>
          </div>
          <div className="text-[3rem] my-2"></div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Date:</span>
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Time:</span>
            <span className="font-medium">{time}</span>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          className="flex-1 bg-gray-600 hover:bg-black text-white hover:text-white"
          onClick={uploadToDB}
        >
          Save to Database
        </Button>
        <Button
          className="flex-1 bg-gray-600 hover:bg-black text-white hover:text-white"
          variant="outline"
          onClick={saveAsPNG}
        >
          Save as Picture
        </Button>
        <Button
          className="flex-1 bg-gray-600 hover:bg-black text-white hover:text-white"
          variant="ghost"
          onClick={() => window.location.reload()}
        >
          Restart Quiz
        </Button>
      </div>
    </div>
  );
}
