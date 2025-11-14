import { useAuthContext } from "@entities/auth/model/context";

export function GuestLoginButton() {
  const { loginAsGuest, auth } = useAuthContext();

  if (auth.mode === "guest") {
    return <p>게스트로 이용 중 (ID: {auth.deviceId?.slice(0, 8)}…)</p>;
  }

  return (
    <button type="button" onClick={loginAsGuest}>
      게스트로 시작하기
    </button>
  );
}
