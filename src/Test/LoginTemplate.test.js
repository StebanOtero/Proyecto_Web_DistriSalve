// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import LoginTemplate from "../components/templates/LoginTemplate";
// import { useAuthStore } from "../index";

// jest.mock("../index"),
//   () => ({
//     ...jest.requireActual("../index"),
//     useAuthStore: jest.fn(),
//   });

// const mockSignInWithEmail = jest.fn();

// beforeEach(() => {
//   useAuthStore.mockReturnValue({
//     signInWithEmail: mockSignInWithEmail,
//   });
// });

// test("Muestra mensajes de error para datos inválidos", async () => {
//   render(
//     <BrowserRouter>
//       <LoginTemplate />
//     </BrowserRouter>
//   );

//   // Encuentra el botón de envío
//   const submitButton = screen.getByText(/Iniciar/i);

//   // Simula un clic sin llenar los campos
//   fireEvent.click(submitButton);

//   // Verifica los mensajes de error
//   expect(screen.getByText(/Campo requerido/i)).toBeInTheDocument();
// });

// test("Permite el login con datos válidos", async () => {
//   mockSignInWithEmail.mockResolvedValue(true); // Simula una respuesta exitosa del backend

//   render(
//     <BrowserRouter>
//       <LoginTemplate />
//     </BrowserRouter>
//   );

//   // Encuentra los campos e introduce datos válidos
//   const emailInput = screen.getByPlaceholderText(/email/i);
//   const passwordInput = screen.getByPlaceholderText(/contraseña/i);
//   const submitButton = screen.getByText(/Iniciar/i);

//   fireEvent.change(emailInput, {
//     target: { value: "stebanmartiinez@hotmail.com" },
//   });
//   fireEvent.change(passwordInput, { target: { value: "salve123" } });

//   // Simula el clic en el botón
//   fireEvent.click(submitButton);

//   // Espera a que se llame a la función mock con los datos correctos
//   await waitFor(() => {
//     expect(mockSignInWithEmail).toHaveBeenCalledWith({
//       correo: "stebanmartiinez@hotmail.com",
//       pass: "salve123",
//     });
//   });
// });

// test("Muestra error al fallar el inicio de sesión", async () => {
//   mockSignInWithEmail.mockResolvedValue(false); // Simula una respuesta fallida del backend

//   render(
//     <BrowserRouter>
//       <LoginTemplate />
//     </BrowserRouter>
//   );

//   // Encuentra los campos e introduce datos válidos
//   const emailInput = screen.getByPlaceholderText(/email/i);
//   const passwordInput = screen.getByPlaceholderText(/contraseña/i);
//   const submitButton = screen.getByText(/Iniciar/i);

//   fireEvent.change(emailInput, {
//     target: { value: "stebanmartiinez@hotmail.com" },
//   });
//   fireEvent.change(passwordInput, { target: { value: "salve123" } });

//   // Simula el clic en el botón
//   fireEvent.click(submitButton);

//   // Verifica que se muestra el mensaje de error
//   await waitFor(() => {
//     expect(screen.getByText(/datos incorrectos/i)).toBeInTheDocument();
//   });
// });
