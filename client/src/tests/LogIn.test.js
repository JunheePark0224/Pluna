import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogIn from "../LogIn";
const axios = require("axios");


jest.mock("axios");

test("로그인 성공 시 메시지 출력", async () => {
  axios.post.mockResolvedValueOnce({ data: { message: "Successfully Logged In" } });

  render(<LogIn />);

  userEvent.type(screen.getByPlaceholderText("ID"), "testid123");
  userEvent.type(screen.getByPlaceholderText("Password"), "password123");

  fireEvent.click(screen.getByText("Log In"));

  const message = await screen.findByText("Successfully Logged In");
  expect(message).toBeInTheDocument();
});

test("잘못된 ID 또는 비밀번호 시 에러 메시지 출력", async () => {
  axios.post.mockRejectedValueOnce({
    response: { data: { message: "Invalid ID or password" } },
  });

  render(<LogIn />);

  userEvent.type(screen.getByPlaceholderText("ID"), "wrongid");
  userEvent.type(screen.getByPlaceholderText("Password"), "wrongpassword");

  fireEvent.click(screen.getByText("Log In"));

  const message = await screen.findByText("Invalid ID or password");
  expect(message).toBeInTheDocument();
});
