import { LogoIcon } from "./LogoIcon";

export default function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <LogoIcon />
      <h1 className="font-bold text-3xl">Mediconnect</h1>
    </div>
  );
}
