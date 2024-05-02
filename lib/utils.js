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