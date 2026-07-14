import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req,res,next) => {
    try {
      const authHeader = req.headers.authorization;
      
      if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).send({
            success : false,
            message : "Invalid authHeader"
        })
      }

      const token = authHeader.split(" ")[1];
      jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
        if(err){
            return res.status(401).send({
                success : false,
                message : "Invalid token"
            })
        }
         req.user = decoded;
        next();
      })
   } catch (e){
       console.log(e);
       return res.status(401).send({
         success : false,
         message : 'Error occured',
         e
       })
   }
}

export const adminMiddleware = (req,res,next) => {
    try {
      const authAdminHeader = req.headers.authorization;
      if(!authAdminHeader || !authAdminHeader.startsWith("Bearer ")){
        return res.status(401).send({
            success : false,
            message : 'Invalid admin header'
        })
      }

        const token = authAdminHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded) => {
            if(err){
                return res.status(401).send({
                    success : false,
                    message : 'Invalid token'
                })
            }
           
            if(decoded.role !== 'admin'){
                return res.status(403).send({
                    success : false,
                    message : 'An error occuured'
                })
            }
             req.user = decoded;
            next()
        })
      

    }
   catch (e){
    console.log(e)
        return res.status(401).send({
                    success : false,
                    message : 'An error occuured',
                    e
                })
   }
}