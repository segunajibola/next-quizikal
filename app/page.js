import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>HTML Quizikal 👨‍💻</h1>
      {/* <p class="quiz_header_text" id="quiz_header_text">Can you answer these HTML, CSS & JavaScript Questions?</p> */}
      <p class="quiz_header_text" id="quiz_header_text">
        Can you answer these HTML Questions?
      </p>
      <div class="quiz-container" id="quiz">
        <div class="quiz-header">
          <span id="spanQuestion"></span>
          <h2 id="question">Question 1</h2>
          {/* <!-- ul>li*4>input+label --> */}
          <ul>
            <li>
              <input type="radio" id="a" name="answer" class="answer" />
              <label id="a_text" for="a">
                Option A
              </label>
            </li>
            <li>
              <input type="radio" id="b" name="answer" class="answer" />
              <label id="b_text" for="b">
                Option B
              </label>
            </li>
            <li>
              <input type="radio" id="c" name="answer" class="answer" />
              <label id="c_text" for="c">
                Option C
              </label>
            </li>
            <li>
              <input type="radio" id="d" name="answer" class="answer" />
              <label id="d_text" for="d">
                Option D
              </label>
            </li>
          </ul>
        </div>
        <button id="submit">Submit</button>
      </div>
      {/* <button onclick="saveAsPNG()">Save as PNG</button>
     <button onclick="read()">readd</button> */}
      <footer>
        <p>
          Built with <span class="love">&#9829</span> by Segun Ajibola
        </p>
      </footer>
    </div>
  );
}
