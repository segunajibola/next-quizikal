"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoIssueOpened } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

export default function Contribute() {
  const [collaborators, setCollaborators] = useState([]);

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

      if (!response.ok) {
        throw new Error("Failed to fetch collaborators");
      }

      const collaboratorsRes = await response.json();
      console.log("collaboratorsRes", collaboratorsRes);
      console.log("collaborathordsRes");
      setCollaborators(collaboratorsRes);
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
            <div className="flex flex-wrap gap-2 items-center">
              <a href="https://github.com/segunajibola/next-quizikal">
                <Button
                  className="flex items-center space-x-2"
                  variant="outline"
                >
                  <FaGithub className="h-5 w-5" />
                  <span>View on GitHub</span>
                </Button>
              </a>
              <a href="https://github.com/segunajibola/next-quizikal/stargazers">
                <Button
                  className="flex items-center space-x-2"
                  variant="primary"
                >
                  <CiStar className="h-5 w-5" />
                  <span>Star project</span>
                </Button>
              </a>
              <a href="https://github.com/segunajibola/next-quizikal/issues">
                <Button
                  className="flex items-center space-x-2"
                  variant="secondary"
                >
                  <GoIssueOpened className="h-5 w-5" />
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
                    srcSet=""
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
