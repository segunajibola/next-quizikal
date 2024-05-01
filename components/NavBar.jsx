import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from "@/components/ui/sheet";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import { RiMenu3Fill } from "react-icons/ri";

export default function NavBar() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <Link className="text-lg font-bold" href="/">
        {/* <MountainIcon className="h-6 w-6 mr-2" /> */}
        <div className="">Quizikal</div>
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
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden inline" size="icon">
            <RiMenu3Fill size={30} />
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
      </Sheet> */}
      <Sheet>
        <SheetTrigger asChild>
          {/* <Button
            className="md:hidden w-4 bg-none flex justify-center items-center"
            size="idcon"
          > */}
          <RiMenu3Fill size={30} className="md:hidden" />
          {/* </Button> */}
        </SheetTrigger>
        <SheetContent side="right" className="bg-gray-800 text-gray-200">
          <div className="grid gap-2 mt-3 py-6 bg-gray-800 text-gray-200">
            <SheetClose asChild>
              <Link className="flex w-full items-center py-2 text-lg" href="/">
                Home
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="flex w-full items-center py-2 text-lg"
                href="/how-to-play"
              >
                How to Play
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="flex w-full items-center py-2 text-lg"
                href="/contribute"
              >
                Contribute
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
