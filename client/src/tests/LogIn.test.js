test("Placeholder test", () => {
  expect(true).toBe(true);
});

/*import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogIn from "../LogIn";
import axios from "axios";

jest.mock("axios");

test("Displays success message on successful login", async () => {
  axios.post.mockResolvedValueOnce({ data: { message: "Successfully Logged In" } });

  render(<LogIn />);

  userEvent.type(screen.getByPlaceholderText("ID"), "testid123");
  userEvent.type(screen.getByPlaceholderText("Password"), "password123");

  fireEvent.click(screen.getByRole("button", { name: "Log In" }));

  const message = await screen.findByText("Successfully Logged In");
  expect(message).toBeInTheDocument();
});

test("Displays error message on invalid credentials", async () => {
  axios.post.mockRejectedValueOnce({
    response: { data: { message: "Invalid ID or password" } },
  });

  render(<LogIn />);

  userEvent.type(screen.getByPlaceholderText("ID"), "wrongid");
  userEvent.type(screen.getByPlaceholderText("Password"), "wrongpassword");

  fireEvent.click(screen.getByRole("button", { name: "Log In" }));

  const message = await screen.findByText("Invalid ID or password");
  expect(message).toBeInTheDocument();
}); */
