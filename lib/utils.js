import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import html2canvas from "html2canvas";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const saveAsPNG = () => {
  html2canvas(document.getElementById("quizResult")).then(function (canvas) {
    var link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "myQuizResult.png";
    link.click();
  });
}

function formatDate(dateString) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dateParts = dateString.split("/");
  const month = months[parseInt(dateParts[0], 10) - 1];
  const day = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  let suffix = "";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  return `${month} ${day}${suffix}, ${year}`;
}

export function getCurrentDateAndTime() {
  const currentTime = new Date().toLocaleString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDateObj = new Date();
  const formattedDate = formatDate(
    `${currentDateObj.getMonth() + 1}/${currentDateObj.getDate()}/${currentDateObj.getFullYear()}`
  );

  return {
    date: formattedDate,
    time: currentTime,
  };
}

export const fetchCollaborators = async () => {
  const owner = "segunajibola";
  const repo = "next-quizikal";
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/collaborators`,
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch collaborators");
  }

  return response.json();
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

