import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { TextBox } from "../components/TextBox";
import { useUser } from "../utils/localStorageHooks";
import BackButton from "../components/BackButton";

export default function Login() {
  const navigate = useNavigate();

  const [user] = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [error, setError] = useState("");

  // Basic email validation
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const emailIsValid = isValidEmail(email);
  const emailHasError = emailTouched && !emailIsValid;

  // Disable button unless all fields valid
  const buttonDisabled = !username || !emailIsValid || !password;

  return (
    <div className="mx-auto flex h-[852px] w-[393px] flex-col items-center justify-between bg-bg-white p-[60px_24px_40px_24px]">
      <div className="self-start">
        <BackButton />
      </div>
      {/* Title */}
      <h1 className="font-regular self-start text-display text-black">
        welcome back.
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
          label="password"
          placeholder="enter password"
          value={password}
          onChange={setPassword}
        />
      </div>

      {error && <p className="mt-2 text-small text-red">{error}</p>}

      {/* Link to create account */}
      <p
        className="mt-4 cursor-pointer text-small font-medium text-black underline"
        onClick={() => navigate("/create-account")}
      >
        don't have an account? create one
      </p>

      {/* Button */}
      <Button
        variant={buttonDisabled ? "disabled" : "primary"}
        size="md"
        width="full"
        disabled={buttonDisabled}
        onClick={() => {
          if (!user) {
            setError("no account found. create one first!");
            return;
          }

          if (
            user.username === username &&
            user.email === email &&
            user.password === password
          ) {
            navigate("/home");
          } else {
            setError("incorrect username, email, or password.");
          }
        }}
      >
        Log In
      </Button>
    </div>
  );
}
