type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
export function BaseButton(props: Props) {
  return (
    <button
      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    />
  );
}
