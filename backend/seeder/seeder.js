import mongoose from "mongoose";
import products from './data.js';
import Product from "../models/product.js";

const seedProducts=async()=>{
    try {
        await mongoose.connect("mongodb+srv://sguptab21:1b0kRjEAT2EDG2ls@e-market.8srxbmo.mongodb.net/?retryWrites=true&w=majority&appName=E-Market");

        await Product.deleteMany();
        console.log("Products are deleted");


        await Product.insertMany(products);
        console.log("Products are added");

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
        
    }
}

seedProducts();