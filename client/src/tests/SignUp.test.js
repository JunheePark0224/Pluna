import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "../SignUp";
const axios = require("axios");

jest.mock("axios");

test("Displays success message on successful signup", async () => {
  axios.post.mockResolvedValueOnce({ data: { message: "Sign up successful!" } });

  render(<SignUp />);

  userEvent.type(screen.getByPlaceholderText("Username"), "TestUser");
  userEvent.type(screen.getByPlaceholderText("ID"), "testid123");
  userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
  userEvent.type(screen.getByPlaceholderText("Password"), "password123");
  userEvent.type(screen.getByPlaceholderText("Phone Number"), "01012345678");

  fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

  const message = await screen.findByText("Sign up successful!");
  expect(message).toBeInTheDocument();
});

test("Displays error message when required fields are missing", async () => {
  render(<SignUp />);

  fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

  const message = await screen.findByText("All fields are required");
  expect(message).toBeInTheDocument();
});
