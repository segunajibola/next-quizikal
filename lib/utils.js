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

export function getCurrentDateAndTime() {
  const currentTime = new Date().toLocaleString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDateObj = new Date();
  const formattedDate = `${currentDateObj.getMonth() +
    1}/${currentDateObj.getDate()}/${currentDateObj.getFullYear()}`;

  return {
    date: formattedDate,
    time: currentTime,
  };
}