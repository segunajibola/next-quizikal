import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Modal = ({ onSubmit, quiz, quizType }) => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(true);

  const handleChange = (event) => {
    setName(event.target.value);
    setSubmitted(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      setSubmitted(false);
      return;
    }
    onSubmit(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
        <div className="flex justify-end">
          <a href="/" className="p-1 text-xl">
            x
          </a>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Enter your full name before starting the {quizType} quiz.
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-lg">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="type your fullname"
                value={name}
                onChange={handleChange}
              />
              {!submitted && (
                <p className="text-red-500">Please enter your full name</p>
              )}
            </div>
            <Button className="w-full" type="submit">
              {name && !quiz ? "Please wait..." : `Start ${quizType} Quiz`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
