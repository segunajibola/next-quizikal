"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoIssueOpened } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

export default function Contribute() {
  const [collaborators, setCollaborators] = useState("");
  useEffect(() => {
    async function fetchContributors() {
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
      const collaborators = await response.json();
      console.log("collaborators", collaborators);
      setCollaborators(collaborators);

      return {
        props: {
          collaborators,
        },
      };
    }

    fetchContributors();
  }, []);

  return (
    <main className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">How to Contribute</h1>
          <p className="text-gray-500 mt-2">
            Thank you for your interest in contributing to our project! We
            welcome contributions from the community to help make this project
            even better.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Get Started</h2>
          <div className="space-y-2">
            <p>
              To get started, please visit our project's{" "}
              <Link
                className="text-blue-500 hover:underline"
                href="https://github.com/segunajibola/next-quizikal/"
              >
                GitHub repository
              </Link>
              . There you'll find information on how to set up the project
              locally, the coding standards we follow, and our contribution
              guidelines.
            </p>
            <div className="flex items-center space-x-2">
              <a href="https://github.com/segunajibola/next-quizikal">
                <Button
                  className="flex items-center space-x-2"
                  variant="outline"
                >
                  <GithubIcon className="h-5 w-5" />
                  <span>View on GitHub</span>
                </Button>
              </a>
              <a
                href="https://github.com/segunajibola/next-quizikal/stargazers
"
              >
                <Button
                  className="flex items-center space-x-2"
                  variant="primary"
                >
                  <StarIcon className="h-5 w-5" />
                  <span>Star the Project</span>
                </Button>
              </a>

              <iframe
                src="https://ghbtns.com/github-btn.html?user=segunajibola&repo=next-quizikal&type=star&count=true&size=large"
                frameborder="0"
                width="170"
                height="30"
                title="GitHub"
              ></iframe>
              <a href="https://github.com/segunajibola/next-quizikal/issues">
                <Button
                  className="flex items-center space-x-2"
                  variant="secondary"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Report an Issue</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Project Collaborators</h2>
          <div className="flex flex-wrap space-x-2 text-center">
            {collaborators &&
              collaborators.map((collaborator) => (
                <div
                  className="flex flex-col gap-1 justify-center items-center"
                  key={collaborator.id}
                >
                  <img
                    src={collaborator.avatar_url}
                    className="w-20 h-20 rounded-[50%]"
                    alt=""
                    srcset=""
                  />
                  <a href={collaborator.html_url} className="underline">
                    {collaborator.login}
                  </a>
                  <span>{collaborator.role_name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
