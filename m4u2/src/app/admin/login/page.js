"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/styles/login.css";

export default function Login() {

  const router = useRouter();
  const [form, setForm] = useState({
    usuario: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        usuario: form.usuario,
        password: form.password
      })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("adminLogueado", "true");
      localStorage.setItem("usuario", data.usuario);

      router.push("/admin");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}