import { useState } from "react";
import { TextBox } from "../components/TextBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import type { User } from "../types/localStorage";
import { useUser } from "../utils/localStorageHooks";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [, setUser] = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const emailIsValid = isValidEmail(email);
  const emailHasError = emailTouched && !emailIsValid;

  const confirmMatches = confirm === password;
  const confirmHasError = confirmTouched && !confirmMatches;

  const buttonDisabled =
    !firstName || !lastName || !emailIsValid || !password || !confirmMatches;

  return (
    <div className="flex flex-col min-h-screen bg-bg-white px-9 pt-9 pb-10">
      <div className="flex flex-col flex-1">
        <div className="self-start">
          <BackButton />
        </div>

        <h1 className="font-regular text-display text-black">
          create your account.
        </h1>

        <div className="mt-10 flex flex-col gap-6">
          <TextBox
            label="first name"
            placeholder="enter first name"
            value={firstName}
            onChange={setFirstName}
          />

          <TextBox
            label="last name"
            placeholder="enter last name"
            value={lastName}
            onChange={setLastName}
          />

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

          <TextBox
            label="create password"
            placeholder="enter password"
            value={password}
            onChange={setPassword}
          />

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
              <p className="mt-1 text-small text-red">
                Passwords do not match
              </p>
            )}
          </div>
        </div>
      </div>

      <p
        className="mt-4 cursor-pointer text-small font-medium text-black underline"
        onClick={() => navigate("/login")}
      >
        already have an account? log in
      </p>

      <Button
        variant={buttonDisabled ? "disabled" : "primary"}
        size="md"
        width="full"
        disabled={buttonDisabled}
        onClick={() => {
          const newUser: User = {
            firstName,
            lastName,
            email,
            password,
          };

          setUser(newUser);
          navigate("/setup");
        }}
      >
        create account
      </Button>
    </div>
  );
}
