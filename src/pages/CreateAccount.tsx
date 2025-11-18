import { useState } from "react";
import { TextBox } from "../components/TextBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/localStorage";
import { useUser } from "../utils/localStorageHooks";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [, setUser] = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Basic email validation
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const emailIsValid = isValidEmail(email);
  const emailHasError = emailTouched && !emailIsValid;

  // Confirm password check
  const confirmMatches = confirm === password;
  const confirmHasError = confirmTouched && !confirmMatches;

  // Disable button unless all fields valid
  const buttonDisabled =
    !username || !emailIsValid || !password || !confirmMatches;

  return (
    <div className="mx-auto flex h-[852px] w-[393px] flex-col items-center justify-between bg-bg-white p-[60px_24px_40px_24px]">
      {/* Title */}
      <h1 className="font-regular text-display text-black">
        create your account.
      </h1>

      {/* Input fields */}
      <div className="mt-10 flex flex-col gap-6">
        <TextBox
          label="username"
          placeholder="enter username"
          value={username}
          onChange={setUsername}
        />

        {/* Email */}
        <div className="flex flex-col">
          <TextBox
            label="email"
            placeholder="enter email"
            value={email}
            onChange={(v) => {
              setEmail(v);
              if (!emailTouched) setEmailTouched(true);
            }}
            className={emailHasError ? "border-red outline-red" : ""}
          />
          {emailHasError && (
            <p className="mt-1 text-small text-red">Invalid email format</p>
          )}
        </div>

        {/* Password */}
        <TextBox
          label="create password"
          placeholder="enter password"
          value={password}
          onChange={setPassword}
        />

        {/* Confirm password */}
        <div className="flex flex-col">
          <TextBox
            label="confirm password"
            placeholder="re-enter password"
            value={confirm}
            onChange={(v) => {
              setConfirm(v);
              if (!confirmTouched) setConfirmTouched(true);
            }}
            className={confirmHasError ? "border-red outline-red" : ""}
          />
          {confirmHasError && (
            <p className="mt-1 text-small text-red">Passwords do not match</p>
          )}
        </div>
      </div>

      {/* Link to sign in */}
      <p
        className="mt-4 cursor-pointer text-small font-medium text-black underline"
        onClick={() => navigate("/setup")}
      >
        already have an account? log in
      </p>

      {/* Button */}
      <Button
        variant={buttonDisabled ? "disabled" : "primary"}
        size="md"
        width="full"
        disabled={buttonDisabled}
        onClick={() => {
          const newUser: User = { username, email, password };

          // Save the fake account
          setUser(newUser);

          navigate("/setup");
        }}
      >
        create account
      </Button>
    </div>
  );
}
