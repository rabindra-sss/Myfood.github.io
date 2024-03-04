import jwt from 'jsonwebtoken'

/// GET food
export const getfood = async (req, res) => {

    try {
        const fooditems = await global.fooditem_coll.find({}).toArray();
        const foodcat = await global.foodcat_coll.find({}).toArray();


        const authheader = req.headers.authorization;
        let islogged = false;
        if (!authheader || !authheader.startsWith('Bearer')) {
            islogged = false;
        }
        else if (authheader) {
            const token = authheader.split(' ')[1];
            const payload = jwt.verify(token, process.env.JWTSECRETKEY);
            
            islogged= true;

        }

        res.send({ fooditems, foodcat, 
            islogged: islogged
        });
    } catch {

        const fooditems = await global.fooditem_coll.find({}).toArray();
        const foodcat = await global.foodcat_coll.find({}).toArray();
        res.send({ fooditems, foodcat, islogged: false });
    }



}
