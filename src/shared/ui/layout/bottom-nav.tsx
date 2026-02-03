import { Link, useLocation } from 'react-router-dom';

const NAV_ITEM_LIST = [
  { to: '/', label: '홈' },
  { to: '/my-record', label: '기록' },
  { to: '/wordbook', label: '단어장' },
  { to: '/practice', label: '연습' },
  { to: '/profile', label: '프로필' },
  { to: '/admin', label: '관리' },
];

export function BottomNav() {
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname === to;

  return (
    <nav className="bottom-navigation fixed inset-x-0 bottom-0 z-40 h-nav w-full bg-white backdrop-blur">
      <ul className="flex-center justify-between">
        {NAV_ITEM_LIST.map((item) => {
          const active = isActive(item.to);
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className={`block px-2 py-3 text-center text-base transition-all duration-200 ${
                  active ? 'font-bold text-black' : 'text-gray-400'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
