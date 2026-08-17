import dotenv from "dotenv"
dotenv.config();

import app from "./src/app.js";
import { connectDb } from "./src/db/store.js";

const port=process.env.PORT || 8080;

connectDb()
.then(() => {
   app.listen(port,()=>{
    console.log(`Port is listening on ${port}`);
}) 
}).catch((err) => {
    console.log("DB error ", err);
});