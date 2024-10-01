import expres from "express";
import { userRouter } from "./routes/userRoute";
import { zapRouter } from "./routes/zapRoute";
import cors from "cors"
import { triggerRouter } from "./routes/triggerRouter";
import { actionRouter } from "./routes/actionRouter";

const app = expres();
app.use(expres.json())
app.use(cors())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/zap", zapRouter)
app.use("/api/v1/trigger", triggerRouter)
app.use("/api/v1/action", actionRouter)





app.listen(3001)