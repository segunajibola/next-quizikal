"use client";

import React, { useState, useEffect } from "react";
import { getQuiz } from "../api/firebase";
import { sendResult } from "../api/firebase";
import { saveAsPNG } from "@/lib/utils";
import { getCurrentDateAndTime } from "@/lib/utils";
import { Modal } from "@/components/Modal";
import Success from "@/components/Success";
import QuizResult from "@/components/QuizResult";
import MissedTable from "@/components/MissedTable";
import QuizQuestions from "@/components/QuizQuestions";
import { useQuizData } from "@/hooks/useQuiz";

export default function Home({ params: { quizType } }) {
  const { isPending, error, data } = useQuizData(quizType);
  console.log(data);

  const [quiz, setQuiz] = useState(null);
  const [allQuizData, setAllQuizData] = useState([]);
  const [quizN, setQuizN] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [missedAnswers, setMissedAnswers] = useState([]);
  const [correctCount, setcorrectCount] = useState(0);
  const [wrongCount, setwrongCount] = useState(0);
  const [recentCount, setRecentCount] = useState("");
  const [name, setName] = useState("");
  const { date, time } = getCurrentDateAndTime();
  const [showSuccess, setShowSuccess] = useState(false);
  const quizTypeNew = quizType === "js" ? "JavaScript" : quizType.toUpperCase();

  async function fetchQuiz(quizN, quizType) {
    console.log("quizType", quizType);
    if (allQuizData.length < 1) {
      try {
        const quizData = await getQuiz(quizType);
        console.log(`fetched ${quizN}`);
        const sortedQuiz = quizData.sort((a, b) => a.id - b.id).slice(0, 2);
        setAllQuizData(sortedQuiz);
        setQuiz([sortedQuiz[quizN]]);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    } else {
      setQuiz([allQuizData[quizN]]);
    }
    console.log("allQuizData", allQuizData);
    console.log("quiz", quiz);
  }

  console.log("allQuizData", allQuizData);
  console.log("quiz", quiz);

  useEffect(() => {
    fetchQuiz(quizN, quizType);
  }, [quizN]);

  const handleSelectedOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const prevQuestion = () => {
    setQuizN((prev) => prev - 1);
    if (recentCount === "correct") {
      setcorrectCount((prev) => prev - 1);
    } else {
      setwrongCount((prev) => prev - 1);
    }
    setLastResult("");
  };

  function submit(quiz) {
    console.log("correctOption", quiz.correct);
    console.log("selectedOption", selectedOption);
    console.log("allQuizData.length", allQuizData.length);
    console.log("quizN", quizN);
    if (quiz.correct === selectedOption) {
      setSelectedOption("");

      setcorrectCount((prev) => prev + 1);
      setRecentCount("correct");
    } else {
      setSelectedOption("");

      setwrongCount((prev) => prev + 1);
      setRecentCount("wrong");
      setMissedAnswers((prev) => [
        ...prev,
        {
          question: quiz.question,
          picked: `${selectedOption} - ${quiz[selectedOption]}`,
          correct: `${quiz.correct} - ${quiz[quiz.correct]}`,
        },
      ]);
    }

    if (allQuizData.length - quizN === 1) {
      setQuiz("finished");
      return;
    }

    setQuizN((prev) => prev + 1);
    console.log("quizN", quizN);
  }

  const handleNameSubmit = (name) => {
    setName(name);
    console.log("name", name);
    console.log("quiz", quiz);
  };
  console.log("missedAnswers", missedAnswers);
  console.log("quizN", quizN);

  const uploadToDB = () => {
    sendResult(
      name,
      correctCount,
      allQuizData.length,
      date,
      time,
      missedAnswers
    );
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
      {name ? (
        <div className="py-3">
          <h1 className="text-2xl py-3 font-bold tracking-tighter sm:text-3xl md:text-4xl text-center">
            {quizTypeNew}
          </h1>
          <p className="text-center text-xl py-3" id="quiz_head">
            Can you answer these {quizTypeNew} Questions?
          </p>
          <div
            className={`flex ${
              quiz === "finished" ? "flex-col" : ""
            } w-[90%] mx-auto`}
          >
            {quiz === null ? (
              <div>Loading quiz...</div>
            ) : quiz === "finished" ? (
              <div className="w-full text-center p-5 text-xl bg-green-400">
                Quiz finished
              </div>
            ) : (
              quiz.map((quiz) => (
                <QuizQuestions
                  quiz={quiz}
                  selectedOption={selectedOption}
                  handleSelectedOption={handleSelectedOption}
                  submit={submit}
                />
              ))
            )}
            <div className="fixed top-0 right-0">
              {showSuccess && <Success onClose={handleCloseSuccess} />}
            </div>
            <div
              className={`text-center justify-between ${
                quiz === "finished" ? "flex w-[90%]" : "hidden"
              } mx-auto`}
            >
              <QuizResult
                name={name}
                correctCount={correctCount}
                total={allQuizData}
                date={date}
                time={time}
                uploadToDB={uploadToDB}
                saveAsPNG={saveAsPNG}
              />
            </div>
            <div className="">
              {quiz === "finished" && (
                <>
                  {missedAnswers.length > 0 ? (
                    <MissedTable missedAnswers={missedAnswers} />
                  ) : (
                    <h3 className="text-center mb-3 text-lg">
                      You got everything!!!
                    </h3>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Modal onSubmit={handleNameSubmit} quiz={quiz} quizType={quizTypeNew} />
      )}
    </>
  );
}

//294
