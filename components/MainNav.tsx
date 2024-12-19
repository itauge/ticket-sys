import Link from "next/link";
import ToggleMode from "./ToggleMode";
import MainNavLink from "./MainNavLink";

const MainNav = () => {
  return (
    <div className="flex justify-between">
        <MainNavLink />
        <div className="flex items-center gap-2">
            <Link href="/login">Login</Link>
            <ToggleMode />
        </div>
    </div>
  );
};

export default MainNav;
