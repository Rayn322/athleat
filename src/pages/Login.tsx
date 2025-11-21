import { useState } from "react";
import { TextBox } from "../components/TextBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [error, setError] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const emailIsValid = isValidEmail(email);
  const emailHasError = emailTouched && !emailIsValid;

  const buttonDisabled = !emailIsValid || !password;

  return (
    <div className="flex flex-col min-h-screen bg-bg-white px-9 pt-9 pb-10">
      <BackButton />

      <div className="flex flex-col flex-1">
        <h1 className="text-display font-regular text-black self-start">
          welcome back.
        </h1>

        <div className="flex flex-col gap-6 mt-10">
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
              className={emailHasError ? "outline-red border-red" : ""}
            />
            {emailHasError && (
              <p className="text-small text-red mt-1">Invalid email format</p>
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

        {error && <p className="text-small text-red mt-2">{error}</p>}
      </div>

      <p
        className="mt-4 cursor-pointer text-small font-medium text-black underline"
        onClick={() => navigate("/create-account")}
      >
        don't have an account? create one
      </p>

      <Button
        variant={buttonDisabled ? "disabled" : "primary"}
        size="md"
        width="full"
        disabled={buttonDisabled}
        onClick={() => {
          const saved = localStorage.getItem("fakeUser");

          if (!saved) {
            setError("no account found. create one first!");
            return;
          }

          const user = JSON.parse(saved);

          if (user.email === email && user.password === password) {
            navigate("/home");
          } else {
            setError("incorrect email, or password.");
          }
        }}
      >
        log in
      </Button>
    </div>
  );
}
