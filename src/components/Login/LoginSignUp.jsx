import React, { useEffect, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";

export const LoginSignUp = ({ setUserId }) => {
  const navigate = useNavigate();

  const [validations, setValidations] = useState(null);

  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    passwordForm: "",
    passwordConfirm: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/auth/process/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user_id", data.id);
        setValidations({ userId: data.id, data: data });
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/session/process/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user_id", data.id);
        setValidations({ userId: data.id, data: data });
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (validations !== null) {
      if (validations.userId === null && validations.data === null) return;

      if (validations.data[0] === undefined) {
        setUserId(validations.userId);
        navigate("/inbox");
      }
    }
  }, [validations]);

  return (
    <body className="login-page">
      <main>
        <section>
          <div className="form-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="userName">Nombre de Usuario:</label>
                <input placeholder="Escribe tu nombre de usuario" name="userName" id="userName" type="text" value={registerData.userName} onChange={handleRegisterChange} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Dirección de Correo Electrónico:</label>
                <input placeholder="Escribe tu dirección de correo electrónico" name="email" id="email" type="email" value={registerData.email} onChange={handleRegisterChange} />
              </div>

              <div className="form-group">
                <label htmlFor="passwordForm">Contraseña:</label>
                <input placeholder="Escribe tu contraseña" name="passwordForm" id="passwordForm" type="password" value={registerData.passwordForm} onChange={handleRegisterChange} />
              </div>

              <div className="form-group">
                <label htmlFor="password-confirm">Confirma la contraseña:</label>
                <input
                  placeholder="Vuelve a escribir tu contraseña"
                  name="passwordConfirm"
                  id="password-confirm"
                  type="password"
                  value={registerData.passwordConfirm}
                  onChange={handleRegisterChange}
                />
              </div>
              <button type="submit">Registrarse</button>
            </form>
          </div>
        </section>
        <section>
          <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo:</label>
                <input placeholder="Escribe tu dirección de correo electrónico" name="email" id="email" type="text" value={loginData.email} onChange={handleLoginChange} />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input placeholder="Escribe tu contraseña" name="password" id="password" type="password" value={loginData.password} onChange={handleLoginChange} />
              </div>

              <button type="submit">Iniciar Sesión</button>
            </form>
          </div>
        </section>
      </main>
    </body>
  );
};
