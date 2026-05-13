import { useState } from "react";
import Input from "../components/Input";
import Btn from "../components/Btn";
import Card from "../components/Card";
import { load, save, INITIAL_STATE } from "../utils/storage";

function SignupScreen({ onSignup }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 4) e.password = "Min 4 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    const stored = load() || {};
    if (stored.user?.email === form.email) {
      setErrors({ email: "Email already registered" });
      return;
    }
    const user = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    const state = { ...INITIAL_STATE, user };
    save(state);
    onSignup(state);
  };

  return (
    <Card>
      <Input
        label="Full Name"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        error={errors.name}
      />
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
        Create Account
      </Btn>
    </Card>
  );
}

export default SignupScreen;
