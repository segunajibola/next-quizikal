export default function page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          How to Play the Quiz
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          This quiz is designed to test your knowledge on a variety of topics.
          Follow the steps below to get started.
        </p>
        <ol className="space-y-4 text-lg text-gray-500 dark:text-gray-400">
          <li className="flex items-start gap-4">
            <span className="flex-none rounded-full bg-gray-900 px-3 py-1 text-white dark:bg-gray-50 dark:text-gray-900">
              1
            </span>
            <div>Choose a language on the homepage to begin.</div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-none rounded-full bg-gray-900 px-3 py-1 text-white dark:bg-gray-50 dark:text-gray-900">
              2
            </span>
            <div>
              Input your name, then start the quiz with the{" "}
              <strong> Start Quiz </strong> button
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-none rounded-full bg-gray-900 px-3 py-1 text-white dark:bg-gray-50 dark:text-gray-900">
              3
            </span>
            <div>
              Read each question carefully and select the correct answer from
              the multiple choice options provided.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-none rounded-full bg-gray-900 px-3 py-1 text-white dark:bg-gray-50 dark:text-gray-900">
              4
            </span>
            <div>
              After answering a question, click
              <strong> Next </strong>
              to move on to the next question.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-none rounded-full bg-gray-900 px-3 py-1 text-white dark:bg-gray-50 dark:text-gray-900">
              5
            </span>
            <div>
              Keep answering questions until you reach the end of the quiz,
              where you only see the <strong> Submit </strong> button.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-none rounded-full bg-gray-900 px-3 py-1 text-white dark:bg-gray-50 dark:text-gray-900">
              6
            </span>
            <div>
              Your final score will be displayed once you complete the quiz.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="flex-none rounded-full bg-gray-900 px-3 py-1 text-white dark:bg-gray-50 dark:text-gray-900">
              7
            </span>
            <div>
              You can retake the quiz as many times as you like to try and
              improve your score.
            </div>
          </li>
        </ol>
      </div>
    </main>
  );
}
