import { connect } from "mongoose"

const dbConnection = async () => {
 try {
   await connect(process.env.LINK_MONGO)   
 } catch (error) {
   console.log(error);
 } 
}

export default dbConnection