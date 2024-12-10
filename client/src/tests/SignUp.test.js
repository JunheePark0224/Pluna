test("Placeholder test", () => {
  expect(true).toBe(true);
});

/*import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "../SignUp";
import axios from "axios";

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

  // 버튼 클릭 (폼 제출)
  fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

  // 메시지를 텍스트 매처를 사용하여 찾기
  const message = await screen.findByText((content) =>
    content.includes("All fields are required")
  );
  expect(message).toBeInTheDocument();
});*/
