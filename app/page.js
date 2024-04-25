"use client";

import React, { useState, useEffect } from "react";
import { getQuiz } from "./utils/firebase";

export default function Home() {
  const [quiz, setQuiz] = useState(null);
  const [quizN, setQuizN] = useState(0);

  async function fetchQuiz(quizN) {
    console.log("quizN", quizN);
    try {
      const quizData = await getQuiz();
      setQuiz(quizData[quizN]);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
    console.log("quiz", quiz);
  }

  useEffect(() => {
    fetchQuiz(quizN);
    console.log("quiz", quiz);
  }, [quizN]);

  function submit() {
    setQuizN((prev) => prev + 1);
  }
  
  console.log("quiz", quiz);

  return (
    <div>
      <h1>HTML Quizikal 👨‍💻</h1>
      {/* <p className="quiz_header_text" id="quiz_header_text">
      Can you answer these HTML, CSS & JavaScript Questions?</p> */}
      <p className="quiz_header_text" id="quiz_header_text">
        Can you answer these HTML Questions?
      </p>
      {quiz === null ? (
        <div>Loading quiz...</div>
      ) : (
        quiz.map((quiz) => (
          <div className="quiz-container" id="quiz">
            <div className="quiz-header">
              <span id="spanQuestion"></span>
              <h2 id="question">{quiz.question}</h2>
              {/* <!-- ul>li*4>input+label --> */}
              <ul>
                <li>
                  <input type="radio" id="a" name="answer" className="answer" />
                  <label id="a_text" for="a">
                    {quiz.a}
                  </label>
                </li>
                <li>
                  <input type="radio" id="b" name="answer" className="answer" />
                  <label id="b_text" for="b">
                    {quiz.b}
                  </label>
                </li>
                <li>
                  <input type="radio" id="c" name="answer" className="answer" />
                  <label id="c_text" for="c">
                    {quiz.c}
                  </label>
                </li>
                <li>
                  <input type="radio" id="d" name="answer" className="answer" />
                  <label id="d_text" for="d">
                    {quiz.d}
                  </label>
                </li>
              </ul>
            </div>
            <button id="submit" onClick={submit}>
              Submit
            </button>
          </div>
        )))}

      {/* <button onclick="saveAsPNG()">Save as PNG</button>
     <button onclick="read()">readd</button> */}
      <footer>
        <p>
          Built with <span className="love">&#9829</span> by Segun Ajibola
        </p>
      </footer>
    </div>
  );
}
