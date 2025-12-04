import { Card } from "@shared/ui";

export function Word() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <section className="space-y-4 w-full">
        <h2 className="text-lg font-semibold text-slate-900">단어장 📕</h2>

        <Card>
          <ul>
            <li
              className={[
                "cursor-pointer rounded-md p-2 transition-colors",
                "hover:bg-slate-100",
              ].join(" ")}
            >
              <span>internally</span>
              <span>내부적으로</span>
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
