import mongoose from "mongoose"

const connectDB = async() => {
    try {
        
        const connected = await mongoose.connect(process.env.MONGO_URL);
        
        // access data without schema
        global.fooditem_coll = mongoose.connection.db.collection("food-items");
        global.foodcat_coll = mongoose.connection.db.collection("food-category");
        global.orders_coll = mongoose.connection.db.collection("orders");

        

    } catch(err) {
    }
}

export default connectDB;