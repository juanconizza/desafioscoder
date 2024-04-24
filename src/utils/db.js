import { connect } from "mongoose"

const dbConnection = async () => {
 try {
   await connect(process.env.LINK_MONGO)
   console.log("database connected");
 } catch (error) {
   console.log(error);
 } 
}

export default dbConnection