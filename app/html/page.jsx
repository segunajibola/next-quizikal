"use client";

import React, { useState, useEffect } from "react";
import { getQuiz } from "../api/firebase";
import { sendResult } from "../api/firebase";
import { sdb } from "../api/firebase";
import { saveAsPNG } from "@/lib/utils";
import { getCurrentDateAndTime } from "@/lib/utils";
import { Modal } from "@/components/Modal";

export default function Home() {
  const [quiz, setQuiz] = useState(null);
  const [allQuizData, setAllQuizData] = useState([]);
  const [quizN, setQuizN] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [lastResult, setLastResult] = useState("");
  const [result, setResult] = useState([]);
  const [correctCount, setcorrectCount] = useState(0);
  const [wrongCount, setwrongCount] = useState(0);
  const [recentCount, setRecentCount] = useState("");
  const [name, setName] = useState("");
  const { date, time } = getCurrentDateAndTime();
  const [counter, setCounter] = useState(2);

  async function fetchQuiz(quizN) {
    try {
      const quizData = await getQuiz();
      const sortedQuiz = quizData.sort((a, b) => a.id - b.id);
      setAllQuizData(sortedQuiz);
      setQuiz([quizData[quizN]]);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  }

  console.log("allQuizData", allQuizData);
  useEffect(() => {
    fetchQuiz(quizN);
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

  const htmlQuizData = [
    {
      question: "2. What is the full meaning of CSS?",
      a: "Complementing Style Shirt",
      b: "Cascading Style Sheet",
      c: "Cup Snake Snail",
      d: "Cascading Stress Sheet",
      correct: "b",
    },
    {
      question: "3. Which HTML element is used to define a paragraph?",
      a: "<p>",
      b: "<paragraph>",
      c: "<para>",
      d: "<ph>",
      correct: "a",
    },
    {
      question: "4. What is the correct HTML for making a text input field?",
      a: "<input type='text'>",
      b: "<textfield>",
      c: "<textinput type='text'>",
      d: "<input type='textfield'>",
      correct: "a",
    },
    {
      question:
        "5. Which HTML tag is used to define the navigation links in a webpage?",
      a: "<nav>",
      b: "<navigation>",
      c: "<links>",
      d: "<menu>",
      correct: "a",
    },
    {
      question: "6. Which tag is used to define an ordered list?",
      a: "<ul>",
      b: "<ol>",
      c: "<li>",
      d: "<u>",
      correct: "b",
    },
    {
      question: "7. What is the correct HTML for inserting a line break?",
      a: "<break>",
      b: "<br>",
      c: "<lb>",
      d: "<linebreak>",
      correct: "b",
    },
    {
      question:
        "8. Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
      a: "alt",
      b: "title",
      c: "src",
      d: "href",
      correct: "a",
    },
    {
      question:
        "9. Which HTML element is used to specify an heading text for a document or section?",
      a: "<header>",
      b: "<head>",
      c: "<h1>",
      d: "<p>",
      correct: "c",
    },
    {
      question: "10. Which character is used to indicate an end tag in HTML?",
      a: "/",
      b: "<",
      c: ">",
      d: "^",
      correct: "a",
    },
    {
      question: "11. What does comment means in HTML?",
      a: "To tell the browser to ignore the code",
      b: "To tell VSCode to style the element",
      c: "To tell the browser to accept the code",
      d: "To tell the browser to use Github",
      correct: "a",
    },
    {
      question: "12. What is the correct HTML for creating a checkbox?",
      a: "<input type='checkbox'>",
      b: "<checkbox>",
      c: "<input type='check'>",
      d: "<check>",
      correct: "a",
    },
    {
      question:
        "13. Which HTML element is used to define the metadata about an HTML document?",
      a: "<head>",
      b: "<meta>",
      c: "<title>",
      d: "<link>",
      correct: "b",
    },
    {
      question: "14. What is the correct HTML for inserting an image?",
      a: "<image src='image.jpg' alt='MyImage'>",
      b: "<img src='image.jpg' alt='MyImage'>",
      c: "<img href='image.jpg' alt='MyImage'>",
      d: "<image href='image.jpg' alt='MyImage'>",
      correct: "b",
    },
    {
      question: "15. Which HTML element defines the title of a document?",
      a: "<meta>",
      b: "<title>",
      c: "<head>",
      d: "<heading>",
      correct: "b",
    },
    {
      question: "16. What is the correct HTML for creating a hyperlink?",
      a: "<a href='http://www.example.com'>link text</a>",
      b: "<a>http://www.example.com</a>",
      c: "<a url='http://www.example.com'>link text</a>",
      d: "<link>http://www.example.com</link>",
      correct: "a",
    },
    {
      question: "17. Which HTML tag is used to define a table row?",
      a: "<tr>",
      b: "<table-row>",
      c: "<td>",
      d: "<th>",
      correct: "a",
    },
    {
      question:
        "18. Which HTML attribute is used to specify the URL of the page the link goes to?",
      a: "href",
      b: "src",
      c: "link",
      d: "url",
      correct: "a",
    },
    {
      question: "19. What is the correct HTML for creating a button?",
      a: "<buttontext>Click me</buttontext>",
      b: "<input type='button' value='Click me'>",
      c: "<btn>Click me</btn>",
      d: "<input type='submit' value='Click me'>",
      correct: "b",
    },
    {
      question: "20. Which HTML element defines the structure of a table?",
      a: "<table>",
      b: "<tr>",
      c: "<td>",
      d: "<th>",
      correct: "a",
    },
  ];

  async function sdbh() {
    console.log(counter, htmlQuizData[counter]);
    await sdb(counter, htmlQuizData[counter]);
    setCounter((prev) => prev + 1);
  }

  function submit(correctOption) {
    console.log("correctOption", correctOption);
    console.log("selectedOption", selectedOption);
    console.log("allQuizData.length", allQuizData.length);
    console.log("quizN", quizN);
    if (correctOption === selectedOption) {
      setSelectedOption("");
      setLastResult(
        <p className="text-green-500">Previous answer was correct</p>
      );
      setcorrectCount((prev) => prev + 1);
      setRecentCount("correct");
    } else {
      setSelectedOption("");
      setLastResult(<p className="text-red-500">Previous answer was wrong</p>);
      setwrongCount((prev) => prev + 1);
      setRecentCount("wrong");
    }

    if (allQuizData.length - quizN === 1) {
      setQuiz("finished");
      return;
    }
    setQuizN((prev) => prev + 1);
    console.log("quizN", quizN);

    setResult((prev) => [...prev, selectedOption]);
  }

  const handleNameSubmit = (name) => {
    setName(name);
    console.log("name", name);
    console.log("quiz", quiz);
  };
  console.log("result", result);
  console.log("quizN", quizN);

  return (
    <>
      {name ? (
        <div className="h-[80vh]">
          <h1 className="text-2xl py-3 font-bold tracking-tighter sm:text-3xl md:text-4xl text-center">
            HTML 🎞
          </h1>
          <h2 onClick={sdbh}>sdb</h2>
          {/* <p className="quiz_header_text" id="quiz_header_text">
      Can you answer these HTML, CSS & JavaScript Questions?</p> */}
          <p className="text-center text-xl py-3" id="quiz_head">
            Cdan you answer these HTML Questions?
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
                      {allQuizData.length - quizN === 1 ? "Submit" : "Next"}
                    </button>
                  </div>
                </div>
              ))
            )}
            <div
              className={`flex text-center justify-between ${
                quiz === "finished" ? "w-[80%]" : "w-[20%]"
              } mx-auto`}
            >
              <div id="quizResult" className="p-2 w-[80%]">
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
                    <div className="bg-blue-300 pb-2 px-[12.5vw]">
                      <p>Score</p>
                      <p className="text-center">
                        {correctCount}/{allQuizData.length}
                      </p>
                    </div>
                    <div className="text-[3rem] my-2">
                      {correctCount / allQuizData.length <= 0.2
                        ? "😭"
                        : correctCount / allQuizData.length <= 0.4
                        ? "😒"
                        : correctCount / allQuizData.length <= 0.6
                        ? "😉"
                        : correctCount / allQuizData.length <= 0.8
                        ? "😜"
                        : correctCount / allQuizData.length <= 1
                        ? "😆🙌"
                        : ""}
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
              </div>
              <div>
                {quiz === "finished" && (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={saveAsPNG}
                      className="text-[.9rem] bg-gray-500 text-white p-2 rounded-md m-2 w-auto mx-auto"
                    >
                      Download Result Image
                    </button>
                    <button
                      onClick={() =>
                        sendResult(
                          name,
                          correctCount,
                          allQuizData.length,
                          date,
                          time
                        )
                      }
                      className="text-[.9rem] bg-gray-500 text-white p-2 rounded-md m-2 w-auto mx-auto"
                    >
                      Upload Result to DataBase
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Modal onSubmit={handleNameSubmit} quiz={quiz} />
      )}
    </>
  );
}
