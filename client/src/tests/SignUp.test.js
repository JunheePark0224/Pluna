import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "../SignUp";;
import axios from "axios";

jest.mock("axios");

test("회원가입 성공 시 메시지 출력", async () => {
  axios.post.mockResolvedValueOnce({ data: { message: "Sign up successful!" } });

  render(<SignUp />);

  userEvent.type(screen.getByPlaceholderText("Username"), "TestUser");
  userEvent.type(screen.getByPlaceholderText("ID"), "testid123");
  userEvent.type(screen.getByPlaceholderText("Email"), "test@example.com");
  userEvent.type(screen.getByPlaceholderText("Password"), "password123");
  userEvent.type(screen.getByPlaceholderText("Phone Number"), "01012345678");

  fireEvent.click(screen.getByText("Sign Up"));

  const message = await screen.findByText("Sign up successful!");
  expect(message).toBeInTheDocument();
});

test("필수 입력값 누락 시 에러 메시지 출력", async () => {
  render(<SignUp />);

  fireEvent.click(screen.getByText("Sign Up"));

  const message = await screen.findByText("All fields are required");
  expect(message).toBeInTheDocument();
});
