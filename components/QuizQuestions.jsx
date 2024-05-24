import React from "react";

const QuizQuestions = (quiz, selectedOption, handleSelectedOption, submit) => {
  return (
    <div
      className="bg-[#fff] rounded-[10px] overflow-hidden w-[80%] m-auto quiz-container text-center"
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
  );
};

export default QuizQuestions;
