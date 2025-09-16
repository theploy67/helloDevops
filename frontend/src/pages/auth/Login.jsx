// src/pages/auth/Login.jsx
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((s) => !s);

  // ✅ ฟังก์ชันตรวจสอบสิทธิ์ login
  const tryLogin = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("auth", "admin");
      navigate("/admin/products", { replace: true });
      return true;
    }
    if (email === "user@gmail.com" && password === "user123") {
      localStorage.setItem("auth", "user");
      navigate("/home", { replace: true });
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.reportValidity()) return;

    setSubmitting(true);
    setError("");

    const email = form.email.value.trim();
    const password = form.password.value;

    // ✅ เช็ค admin หรือ user
    if (tryLogin(email, password)) {
      setSubmitting(false);
      return;
    }

    // fallback demo
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setError("Invalid credentials");
  };

  return (
    <main className="shell">
      <section className="form-side">
        <div className="logo">
          <img src="/assets/logo-no-bg.png" alt="Logo" />
        </div>

        <div className="welcome-text">
          <h1>Welcome Back!</h1>
          <p className="lead">Sign in with your email address and Password.</p>
        </div>

        <form id="loginForm" ref={formRef} noValidate onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="Enter your Email"
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Enter your password"
              minLength={6}
              required
            />
            <button
              className="toggle-eye"
              type="button"
              aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              onClick={handleTogglePassword}
            >
              👁
            </button>
          </div>

          {error && (
            <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
          )}

          <div className="row-end">
            <a href="#" className="link">Forgot Password?</a>
          </div>

          <button id="submitBtn" className="btn" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "LOGIN"}
          </button>

          <p className="note">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </section>

      <aside className="art-side">
        <div className="illustration">
          <div className="phone" aria-hidden="true">
            <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
              <img src="/assets/user/useraccess.png" style={{ width: 686, height: 383 }} alt="" />
              <h2 style={{ color: "white", fontWeight: 600, fontSize: 24 }}>Pure Mart</h2>
              <p style={{ color: "white", fontSize: 14, textAlign: "center" }}>
                Your one-stop shop for all things fresh and organic.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
