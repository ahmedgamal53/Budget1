import { useState } from "react";
import Input from "../components/Input";
import Btn from "../components/Btn";
import Card from "../components/Card";
import { load } from "../utils/storage";

function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 4) e.password = "Min 4 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    const stored = load() || {};
    if (
      !stored.user ||
      stored.user.email !== form.email ||
      stored.user.password !== form.password
    ) {
      setErrors({ email: "Invalid credentials" });
      return;
    }
    onLogin(stored);
  };

  return (
    <Card>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => set("email", e.target.value)}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••"
        value={form.password}
        onChange={(e) => set("password", e.target.value)}
        error={errors.password}
      />
      <Btn
        onClick={submit}
        style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
      >
        Log In
      </Btn>
    </Card>
  );
}

export default LoginScreen;
