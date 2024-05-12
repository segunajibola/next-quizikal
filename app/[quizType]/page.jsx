"use client";

import React, { useState, useEffect } from "react";
import { getQuiz } from "../api/firebase";
import { sendResult } from "../api/firebase";
// import { sdb } from "../api/firebase";
import { saveAsPNG } from "@/lib/utils";
import { getCurrentDateAndTime } from "@/lib/utils";
import { Modal } from "@/components/Modal";
import Success from "@/components/Success";
import QuizResult from "@/components/QuizResult";
import MissedTable from "@/components/MissedTable";

export default function Home({ params: { quizType } }) {
  const [quiz, setQuiz] = useState(null);
  const [allQuizData, setAllQuizData] = useState([]);
  const [quizN, setQuizN] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  // const [lastResult, setLastResult] = useState("");
  const [missedAnswers, setMissedAnswers] = useState([]);
  const [correctCount, setcorrectCount] = useState(0);
  const [wrongCount, setwrongCount] = useState(0);
  const [recentCount, setRecentCount] = useState("");
  const [name, setName] = useState("");
  const { date, time } = getCurrentDateAndTime();
  const [showSuccess, setShowSuccess] = useState(false);
  const quizTypeSentenceCase =
    quizType === "js"
      ? "JavaScript"
      : quizType.charAt(0).toUpperCase() + quizType.slice(1);

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
            {quizTypeSentenceCase.toUpperCase()}
          </h1>
          <p className="text-center text-xl py-3" id="quiz_head">
            Can you answer these {quizTypeSentenceCase.toUpperCase()} Questions?
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
                <div
                  className="bg-[#fff] rounded-[10px] overflow-hidden w-[80%] m-auto quiz-container"
                  id="quiz"
                  key={quiz.id}
                >
                  <div className="p-[2rem]">
                    <span id="spanQuestion"></span>
                    <h2 className="p-[1rem] text-[1.4rem] text-center m-0">
                      {quiz.question}
                    </h2>
                    {/* <!-- ul>li*4>input+label --> */}
                    <ul className="list-none p-0">
                      <li className="text-[1rem] my-[1rem] mx-0 flex gap-1 items-center">
                        <input
                          type="radio"
                          id="a"
                          name="options"
                          value={"a"}
                          checked={selectedOption === "a"}
                          onChange={handleSelectedOption}
                          className="cursor-pointer answer"
                        />
                        <label
                          className="cursor-pointer"
                          id="a_text"
                          htmlFor="a"
                        >
                          {quiz.a}
                        </label>
                      </li>
                      <li className="text-[1rem] my-[1rem] mx-0 flex gap-1 items-center">
                        <input
                          type="radio"
                          id="b"
                          name="options"
                          value={"b"}
                          checked={selectedOption === "b"}
                          onChange={handleSelectedOption}
                          className="cursor-pointer answer"
                        />
                        <label
                          className="cursor-pointer"
                          id="b_text"
                          htmlFor="b"
                        >
                          {quiz.b}
                        </label>
                      </li>
                      <li className="text-[1rem] my-[1rem] mx-0 flex gap-1 items-center">
                        <input
                          type="radio"
                          id="c"
                          name="options"
                          value={"c"}
                          checked={selectedOption === "c"}
                          onChange={handleSelectedOption}
                          className="cursor-pointer answer"
                        />
                        <label
                          className="cursor-pointer"
                          id="c_text"
                          htmlFor="c"
                        >
                          {quiz.c}
                        </label>
                      </li>
                      <li className="text-[1rem] my-[1rem] mx-0 flex gap-1 items-center">
                        <input
                          type="radio"
                          id="d"
                          name="options"
                          value={"d"}
                          checked={selectedOption === "d"}
                          onChange={handleSelectedOption}
                          className="cursor-pointer answer"
                        />
                        <label
                          className="cursor-pointer"
                          id="d_text"
                          htmlFor="d"
                        >
                          {quiz.d}
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-8 justify-center items-center">
                    {quizN > 0 && (
                      <button
                        id="submit"
                        className="block bg-[#c29a45] hover:bg-[#e4c436] focus:bg-[#ac6e46] outline-none border-none text-white cursor-pointer text-[1.3rem] w-full p-[1rem] mt-1"
                        onClick={prevQuestion}
                      >
                        Previous
                      </button>
                    )}
                    <button
                      id="submit"
                      className="block bg-[#c29a45] hover:bg-[#e4c436] focus:bg-[#ac6e46] outline-none border-none text-white cursor-pointer text-[1.3rem] w-full p-[1rem] mt-1"
                      onClick={() => submit(quiz)}
                    >
                      {allQuizData.length - quizN === 1 ? "Submit" : "Next"}
                    </button>
                  </div>
                </div>
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
                  {missedAnswers ? (
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
        <Modal onSubmit={handleNameSubmit} quiz={quiz} quizType={quizTypeSentenceCase} />
      )}
    </>
  );
}
