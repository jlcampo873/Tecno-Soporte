# TecnoSoporte – versión revisada

Aplicación de gestión de soporte técnico con Spring Boot, React + Vite y MySQL.

## Backend
1. Copiar `.env.example` como referencia de variables de entorno.
2. Configurar `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` y `JWT_SECRET`.
3. Ejecutar `./mvnw spring-boot:run` en Linux/macOS o `mvnw.cmd spring-boot:run` en Windows.

## Frontend
1. Copiar `.env.example` como `.env`.
2. Ajustar `VITE_API_URL` si el backend no usa `http://localhost:8080/api`.
3. Ejecutar `npm install` y después `npm run dev`.

## Seguridad aplicada
- JWT sin rol confiado desde el token: el rol activo se consulta desde la base de datos.
- Contraseñas con BCrypt.
- CORS configurable.
- Secretos mediante variables de entorno.
- Autorización por método HTTP y rol.
- Respuestas genéricas en login para evitar enumeración de usuarios.
- Interceptor Axios para adjuntar JWT y manejar expiración.

No subas archivos `.env` reales ni contraseñas a Git.
