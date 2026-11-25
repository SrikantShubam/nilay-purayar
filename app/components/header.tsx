import NavBar from "./Navbar/navbar";
import type { NavbarSettings } from "@/app/lib/settings";

export default function Header({ navbar }: { navbar: NavbarSettings }) {
  return (
    <header className="w-full z-[10] relative">
      <NavBar navbar={navbar} />
    </header>
  );
}
