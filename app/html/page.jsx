"use client";

import React, { useState, useEffect } from "react";
import { getQuiz } from "../api/firebase";

export default function Home() {
  const [quiz, setQuiz] = useState(null);
  const [quizN, setQuizN] = useState(0);

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

  function submit(quiz) {
    quiz.correct === setQuizN((prev) => prev + 1);
  }

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
      {quiz === null ? (
        <div>Loading quiz...</div>
      ) : (
        quiz.map((quiz) => (
          <div
            className="bg-[#fff] rounded-[10px] overflow-hidden w-[90%] max-w-[90%] m-auto quiz-container"
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
                    name="answer"
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
                    name="answer"
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
                    name="answer"
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
                    name="answer"
                    className="cursor-pointer answer"
                  />
                  <label className="cursor-pointer" id="d_text" htmlFor="d">
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
                  onClick={() => setQuizN((prev) => prev - 1)}
                >
                  Previous
                </button>
              )}
              <button
                id="submit"
                className="block bg-[#c29a45] hover:bg-[#e4c436] focus:bg-[#ac6e46] outline-none border-none text-white cursor-pointer text-[1.3rem] w-full p-[1rem] mt-1"
                onClick={(quiz) => submit(quiz)}
              >
                Next
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
