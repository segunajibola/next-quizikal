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

  // async function sdbh() {
  //   console.log(counter, htmlQuizData[counter]);
  //   await sdb(counter, htmlQuizData[counter]);
  //   setCounter((prev) => prev + 1);
  // }

  function submit(quiz) {
    console.log("correctOption", quiz.correct);
    console.log("selectedOption", selectedOption);
    console.log("allQuizData.length", allQuizData.length);
    console.log("quizN", quizN);
    if (quiz.correct === selectedOption) {
      setSelectedOption("");
      // setLastResult(
      //   <p className="text-green-500">Previous answer was correct</p>
      // );
      setcorrectCount((prev) => prev + 1);
      setRecentCount("correct");
    } else {
      setSelectedOption("");
      // setLastResult(<p className="text-red-500">Previous answer was wrong</p>);
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
            HTML 🎞
          </h1>
          {/* <p className="quiz_header_text" id="quiz_header_text">
      Can you answer these HTML, CSS & JavaScript Questions?</p> */}
          <p className="text-center text-xl py-3" id="quiz_head">
            Can you answer these HTML Questions?
          </p>
          <div
            className={`flex ${
              quiz === "finished" ? "flex-col" : ""
            } w-[90%] mx-auto`}
          >
            {quiz === null ? (
              <div>Loading quiz...</div>
            ) : quiz === "finished" ? (
              <div className="w-full text-center p-5 text-xl bg-green-500">
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
                  {/* <div className="text-center p-3 text-xl">{lastResult}</div> */}
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
              className={`flex text-center justify-between ${
                quiz === "finished" ? "w-[100%]" : "w-[20%]"
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
              {/* <div id="quizResult" className="p-2 w-[80%]">
                {quiz && (
                  <div className="p-1">
                    <h3
                      className={`text-center ${
                        quiz === "finished" ? "text-2xl" : "text-xl"
                      } font-semibold py-2`}
                    >
                      Result
                    </h3>
                    <div
                      className={`flex ${
                        quiz === "finished"
                          ? "flex-row text-2xl justify-center my-3"
                          : "flex-col"
                      } gap-4`}
                    >
                      <div className="text-green-500">
                        <p>Correct</p>
                        <p className="text-center">{correctCount}</p>
                      </div>
                      <div className="text-red-500">
                        <p>Wrong</p>
                        <p className="text-center">{wrongCount}</p>
                      </div>
                    </div>
                  </div>
                )}
                 {quiz === "finished" && (
                  <div className="flex flex-col gap-2 justify-center items-center text-3xl">
                    <div className="pb-2">
                      <p>Score</p>
                      <p className="text-center">
                        {correctCount}/{allQuizData.length}
                      </p>
                    </div>
                    
                    <div className="text-[1.2rem] text-center">
                      <h3>Name: {name}</h3>
                      <div className="flex gap-2">
                        <h3>Date: {date}</h3>
                        <h3>Time: {time}</h3>
                      </div>
                    </div>
                  </div>
                )} 
              </div> */}
            </div>
            <div className="">
              {quiz === "finished" && (
                <>
                  {missedAnswers.length > 0 ? (
                    <>
                      <h3 className="text-center text-xl font-semibold py-2">
                        Missed questions
                      </h3>
                      <table className="my-2.5 border-collapse w-[95%] mx-auto">
                        <tr>
                          <th>Question</th>
                          <th>Picked Option</th>
                          <th>Correct Option</th>
                        </tr>
                        {missedAnswers.map((missed) => (
                          <tr>
                            <td>{missed.question}</td>
                            <td>{missed.picked}</td>
                            <td>{missed.correct}</td>
                          </tr>
                        ))}
                      </table>
                    </>
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
        <Modal onSubmit={handleNameSubmit} quiz={quiz} quizType={quizType} />
      )}
    </>
  );
}
