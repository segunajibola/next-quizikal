import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";

export default function NavBar() {
  return (
    <header className="flex items-center justify-between h-16 px-4 bg-gray-900 text-white md:px-6">
      <Link className="text-lg font-bold" href="/">
        {/* <MountainIcon className="h-6 w-6 mr-2" /> */}
        <span className="sr-only">Home</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link
          className="text-sm font-medium hover:text-gray-400"
          href="/how-to-play"
        >
          How To Play
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-400"
          href="/contribute"
        >
          Contribute
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            {/* <MenuIcon className="h-6 w-6" /> */}
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-64 bg-gray-900 text-white" side="right">
          <div className="p-4 space-y-4">
            <Link
              className="block text-sm font-medium hover:text-gray-400"
              href="/how-to-play"
            >
              How To Play
            </Link>
            <Link
              className="block text-sm font-medium hover:text-gray-400"
              href="/contribute"
            >
              Contribute
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
