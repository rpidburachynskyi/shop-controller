import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const schema = new Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	count: {
		type: Number,
		default: 0,
	},
	category: {
		type: String, // category id
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	price: {
		type: Number,
		required: true,
	},
});

schema.pre("save", function (next) {
	// @ts-ignore
	if (!this.id) this.id = uuidv4();

	next();
});

const productModel = model("products", schema);

const Product = {
	createProduct: (name: string, category: string) =>
		productModel.create({ name, category, count: 0 }),
	getProducts: () => productModel.find({}),
};
productModel;

export default Product;
