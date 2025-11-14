import { useState } from "react";
import { TextBox } from "../components/TextBox";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");

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
    <div className="flex w-[393px] h-[852px] flex-col justify-between items-center bg-bg-white p-[60px_24px_40px_24px] mx-auto">

      {/* Title */}
      <h1 className="text-display font-regular text-black">
        create your account.
      </h1>

      {/* Input fields */}
      <div className="flex flex-col gap-6 mt-10">
        
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
            className={emailHasError ? "outline-red border-red" : ""}
          />
          {emailHasError && (
            <p className="text-small text-red mt-1">Invalid email format</p>
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
            className={confirmHasError ? "outline-red border-red" : ""}
          />
          {confirmHasError && (
            <p className="text-small text-red mt-1">Passwords do not match</p>
          )}
        </div>
      </div>

      {/* Link to sign in */}
      <p 
        className="text-small font-medium text-black underline cursor-pointer mt-4"
        onClick={() => navigate("/login")}
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
            const newUser = { username, email, password };

            // Save the fake account
            localStorage.setItem("fakeUser", JSON.stringify(newUser));

            navigate("/login");
        }}
        >
        Create Account
        </Button>
    </div>
  );
}
