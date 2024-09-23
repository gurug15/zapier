import expres from "express";
import { userRouter } from "./routes/userRoute";
import { zapRouter } from "./routes/zapRoute";
import cors from "cors"

const app = expres();
app.use(expres.json())
app.use(cors())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/zap", zapRouter)




app.listen(3001)