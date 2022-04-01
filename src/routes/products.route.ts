import { Router } from 'express';
import { Routes } from '@common/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { ProductsController } from '@modules/products/products.controller';
import { CreateProductDto } from '@modules/products/dto/product.dto';
import authMiddleware from '@middlewares/auth.middleware';

export class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.router.get(`${this.path}`, this.productsController.getProducts);
    this.router.get(`${this.path}/:id`, this.productsController.getProductById);
    this.router.post(`${this.path}`, authMiddleware('seller'), validationMiddleware(CreateProductDto, 'body'), this.productsController.createProduct);
    this.router.put(
      `${this.path}/:id`,
      authMiddleware('seller'),
      validationMiddleware(CreateProductDto, 'body', true),
      this.productsController.updateProduct,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware('seller'), this.productsController.deleteProduct);
  }
}
