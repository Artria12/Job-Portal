import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/application.routes.js"
dotenv.config({})

const app=express();

const PORT=process.env.PORT||3000
app.use(express.json())  // adding middleware
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
    origin:'http://localhost:5173',   //frontend kahan par host hai uska address
    credentials:true,
}
app.use(cors(corsOption))
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute)
app.listen(PORT,()=>{
     connectDb();
    console.log(`server running at ${PORT} successfully`)
})
