export const testGetcontroller = (req,res) =>{
    res.send("hi welcome to my new food delivery app");
};

export const testPostController = (req,res) => {
    const {name} = req.body;

    res.status(200).send(`your name is ${name}`);
};
