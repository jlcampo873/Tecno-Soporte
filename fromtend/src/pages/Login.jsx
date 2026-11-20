import { useContext, useState } from 'react'

import { AuthContext } from '../context/AuthContext'

import '../styles/Login.css'

function Login() {

  const {
    iniciarSesion,
    cargando,
    error
  } = useContext(AuthContext)

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const manejarLogin = async (evento) => {
    evento.preventDefault()

    await iniciarSesion(
      correo.trim(),
      password
    )

  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Tecno Soporte</h1>

        <p className="subtitulo">
          Gestión Inteligente de Servicios
        </p>

        <form onSubmit={manejarLogin}>

          <div className="campo">

            <label htmlFor="correo">
              Correo electrónico
            </label>

            <input
              id="correo"
              name="correo"
              type="email"
              placeholder="Ingrese su correo"
              value={correo}
              onChange={(evento) =>
                setCorreo(evento.target.value)
              }
              autoComplete="email"
              disabled={cargando}
              required
            />

          </div>

          <div className="campo">

            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(evento) =>
                setPassword(evento.target.value)
              }
              autoComplete="current-password"
              disabled={cargando}
              required
            />

          </div>

          {error && (
            <div
              className="mensaje-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
          >
            {cargando
              ? 'Autenticando...'
              : 'Iniciar sesión'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login