import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { FaUserPlus } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const BotonRegistro = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--borde-pildora, 50px);
  background-color: var(--color-turquesa, #52c2d4);
  color: #ffffff;
  font-family: var(--font-heading, "Montserrat", sans-serif);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--color-turquesa-hover, #3ea8b7);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-turquesa, #52c2d4);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);

    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?",
        );
        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "460px" }}>
      <Helmet>
        <title>Registrarse | Sol de Mayo</title>
        <meta
          name="description"
          content="Creá una nueva cuenta en Sol de Mayo."
        />
      </Helmet>

      <Card
        className="shadow-sm border-0"
        style={{
          borderRadius: "16px",
          backgroundColor: "var(--bg-blanco, #ffffff)",
        }}
      >
        <Card.Body className="p-4 p-md-5">
          <h2
            className="text-center fw-bold mb-4"
            style={{
              fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
              color: "var(--color-texto, #1a1a1a)",
            }}
          >
            Crear una nueva cuenta
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="registro-email">
              <Form.Label className="fw-semibold">
                Correo Electrónico
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registro-password">
              <Form.Label className="fw-semibold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" role="alert" className="py-2">
                {error}
              </Alert>
            )}

            <BotonRegistro type="submit" disabled={enviando}>
              <FaUserPlus aria-hidden="true" />
              <span>{enviando ? "Registrando..." : "Registrarse"}</span>
            </BotonRegistro>
          </Form>

          <p
            className="text-center mt-4 mb-0 small"
            style={{ color: "var(--color-mutado, #6b6b6b)" }}
          >
            ¿Ya tenés una cuenta?{" "}
            <Link
              to="/login"
              className="fw-semibold text-decoration-none"
              style={{ color: "var(--color-turquesa, #52c2d4)" }}
            >
              Iniciá sesión
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Registro;