const express = require("express");
const cors = require("cors"); // cors 추가
const app = express();
const authRoutes = require("./routes/auth");

app.use(cors()); // 모든 도메인에서의 요청 허용
app.use(express.json()); // JSON 파싱 미들웨어
app.use("/api", authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
