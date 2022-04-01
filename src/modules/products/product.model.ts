import { model, Schema, Document, Types } from 'mongoose';
import { Product } from './interface/product.interface';

const userSchema: Schema = new Schema({
  productName: { type: String, trim: true, required: true },
  amountAvailable: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  sellerId: { type: Types.ObjectId, required: true },
});

const productModel = model<Product & Document>('Product', userSchema);

export default productModel;
