import { Link } from 'react-router-dom';

import logo from '@shared/logo.png';
import { TextLogo } from '@shared/index';

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white backdrop-blur">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logo} alt="OPIC FORPIC" className="h-8 w-8 rounded-xl" />
          <TextLogo />
        </Link>
      </div>
    </header>
  );
}
