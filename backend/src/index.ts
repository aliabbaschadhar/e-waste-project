import express from "express";
import userRouter from "./routes/userRoute";
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});