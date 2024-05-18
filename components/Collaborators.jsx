import React from "react";

const Collaborators = ({ collaborator: { avatar_url, html_url, login, role_name } }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center">
      <img
        src={avatar_url}
        className="w-20 h-20 rounded-[50%]".
        alt={`${login}'s avatar`}
      />
      <a href={html_url} className="underline">
        {login}
      </a>
      <span>{role_name}</span>
    </div>
  );
};

export default Collaborators;
