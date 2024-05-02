"use client";

import React, { useState, useEffect } from "react";
import { getQuiz } from "../api/firebase";

export default function Home() {
  const [quiz, setQuiz] = useState(null);
  const [quizN, setQuizN] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [lastResult, setLastResult] = useState("");
  const [result, setResult] = useState([]);
  const [correctCount, setcorrectCount] = useState(0);
  const [wrongCount, setwrongCount] = useState(0);
  const [recentCount, setRecentCount] = useState("");

  async function fetchQuiz(quizN) {
    try {
      const quizData = await getQuiz();
      setQuiz([quizData[quizN]]);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }

  useEffect(() => {
    fetchQuiz(quizN);
  }, [quizN]);

  const handleSelectedOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const prevQuestion = () => {
    if (recentCount === "correct") {
      setcorrectCount((prev) => prev - 1);
    } else {
      setwrongCount((prev) => prev - 1);
    }
    setQuizN((prev) => prev - 1);
    setLastResult("");
  };

  function submit(correctOption) {
    console.log("correctOption", correctOption);
    console.log("selectedOption", selectedOption);
    setQuizN((prev) => prev + 1);
    setTimeout(() => {
      if (correctOption === selectedOption) {
        setLastResult(
          <p className="text-green-500">Previous Question: Correct</p>
        );
        setcorrectCount((prev) => prev + 1);
        setRecentCount("correct");
      } else {
        setLastResult(<p className="text-red-500">Previous Question: Wrong</p>);
        setwrongCount((prev) => prev + 1);
        setRecentCount("wrong");
      }
      setSelectedOption("");
    }, 1000);

    setResult((prev) => [...prev, selectedOption]);
  }

  console.log("result", result);

  return (
    <div className="h-[80vh]">
      <h1 className="text-2xl py-3 font-bold tracking-tighter sm:text-3xl md:text-4xl text-center">
        HTML 🎞
      </h1>
      {/* <p className="quiz_header_text" id="quiz_header_text">
      Can you answer these HTML, CSS & JavaScript Questions?</p> */}
      <p className="text-center text-xl py-3" id="quiz_head">
        Can you answer these HTML Questions?
      </p>
      <div className="flex w-[90%] mx-auto">
        {quiz === null ? (
          <div>Loading quiz...</div>
        ) : (
          quiz.map((quiz) => (
            <div
              className="bg-[#fff] rounded-[10px] overflow-hidden w-[70%] m-auto quiz-container"
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
                    <label className="cursor-pointer" id="a_text" htmlFor="a">
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
                    <label className="cursor-pointer" id="b_text" htmlFor="b">
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
                    <label className="cursor-pointer" id="c_text" htmlFor="c">
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
                    <label className="cursor-pointer" id="d_text" htmlFor="d">
                      {quiz.d}
                    </label>
                  </li>
                </ul>
              </div>
              <div className="text-center p-3 text-xl">{lastResult}</div>
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
                  onClick={() => submit(quiz.correct)}
                >
                  Next
                </button>
              </div>
            </div>
          ))
        )}
        {quiz && (
          <div className="p-1">
            <h3 className="text-center text-xl font-semibold py-2">Result</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p>Correct</p>
                <p className="text-center">{correctCount}</p>
              </div>
              <div>
                <p>Wrong</p>
                <p className="text-center">{wrongCount}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
