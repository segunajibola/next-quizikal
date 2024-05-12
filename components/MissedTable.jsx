import React from "react";

const MissedTable = ({ missedAnswers }) => {
  return (
    <div>
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
    </div>
  );
};

export default MissedTable;
