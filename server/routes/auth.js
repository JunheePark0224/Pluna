const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("Signup request received."); // 요청이 들어왔는지 확인
  console.log("Request body:", req.body); // 클라이언트가 전송한 데이터 확인

  const { id, username, email, password, phone_number } = req.body;

  if (!id || !username || !email || !password) {
    console.error("Missing required fields"); // 필드 누락 확인
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully."); // 비밀번호 해시 성공 로그

    const query = `INSERT INTO Users (id, username, email, password, phone_number) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [id, username, email, hashedPassword, phone_number], (err) => {
      if (err) {
        console.error("Database error:", err); // 데이터베이스 관련 에러 출력
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "ID or email already exists" });
        }
        return res.status(500).json({ message: "Error signing up" });
      }
      console.log("User inserted successfully."); // 데이터 삽입 성공
      res.status(201).json({ message: "Sign up successful!" });
    });
  } catch (error) {
    console.error("Error during signup process:", error); // 기타 에러 출력
    res.status(500).json({ message: "Internal server error" });
  }
});
// 로그인 API
router.post("/login", async (req, res) => {
  console.log("Login request received:", req.body); // 요청 확인 로그

  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "ID and password are required" });
  }

  try {
    const query = `SELECT * FROM Users WHERE id = ?`;
    db.query(query, [id], async (err, results) => {
      if (err) {
        console.error("Database query error:", err); // DB 에러 로그
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        console.error("Invalid ID or password"); // 잘못된 ID 로그
        return res.status(400).json({ message: "Invalid ID or password" });
      }

      const user = results[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        console.error("Invalid password"); // 비밀번호 불일치 로그
        return res.status(400).json({ message: "Invalid ID or password" });
      }

      console.log("Login successful for user:", user.id); // 로그인 성공 로그

      // 로그인 성공 시 username을 포함한 응답
      res.status(200).json({
        message: "Successfully Logged In",
        username: user.username, // DB에서 가져온 username
      });
    });
  } catch (error) {
    console.error("Error during login process:", error); // 기타 에러 로그
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;