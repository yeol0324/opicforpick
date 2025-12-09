import { Link, useLocation } from "react-router-dom";

const NAV_ITEM_LIST = [
  { to: "/", label: "홈" },
  { to: "/my-record", label: "기록" },
  { to: "/wordbook", label: "단어장" },
  { to: "/practice", label: "연습" },
];

export function BottomNav() {
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname === to;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur bottom-nav">
      <div className="mx-auto max-w-md">
        <ul className="flex justify-between px-4 py-1">
          {NAV_ITEM_LIST.map((item) => {
            const active = isActive(item.to);
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  className={`flex flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] ${
                    active ? "active " : ""
                  } link`}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
