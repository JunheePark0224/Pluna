const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const router = express.Router();

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