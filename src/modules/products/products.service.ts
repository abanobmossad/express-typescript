import { HttpException } from '@common/exceptions/HttpException';
import { isEmpty } from '@utils/helpers';
import productModel from './product.model';
import { Product } from './interface/product.interface';
import { CreateProductDto } from './dto/product.dto';

export class ProductService {
  public products = productModel;

  public async findAllProducts(): Promise<Product[]> {
    return this.products.find().lean();
  }

  public async findProductById(id: string): Promise<Product> {
    const product = await this.products.findOne({ _id: id }).lean();
    if (!product) throw new HttpException(404, 'Product Not Found');

    return product;
  }

  public async createProduct(dto: CreateProductDto): Promise<Product> {
    if (isEmpty(dto)) throw new HttpException(400, 'No product DTO');
    const createdProduct = await this.products.create(dto);
    return createdProduct.toJSON();
  }

  public async updateProduct(productId: string, dto: CreateProductDto): Promise<Product> {
    if (isEmpty(dto)) throw new HttpException(400, 'No product DTO');
    const updateProduct: Product = await this.products.findByIdAndUpdate(productId, dto, { new: true }).lean();
    if (!updateProduct) throw new HttpException(404, 'Product Not Found');

    return updateProduct;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProduct: Product = await this.products.findByIdAndDelete(productId).lean();
    if (!deleteProduct) throw new HttpException(404, 'Product Not Found');

    return deleteProduct;
  }
}
