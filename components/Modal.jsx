import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Modal = ({ onSubmit, quiz }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Enter your full name</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="type your fullname" value={name} onChange={handleChange} />
            </div>
            <Button className="w-full" type="submit">
              {name && !quiz ? "Please wait..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
