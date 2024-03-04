import jwt from 'jsonwebtoken'
const userAuth = async (req,res,next) =>{
    const authheader = req.headers.authorization;
    if(!authheader || !authheader.startsWith('Bearer')) {
         next('Auth failed');
        }
    const token = authheader.split(' ')[1];
    try{
        
        
        const payload = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = {userId: payload.userId};

        next();

    } catch(error){
        next('Auth failed');
    }
}
export default userAuth;