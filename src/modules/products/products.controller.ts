import { NextFunction, Request, Response } from 'express';
import { isEqual } from 'lodash';
import { HttpException } from '@common/exceptions';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/product.dto';
import { RequestWithUser } from '../auth/interfaces/auth.interface';

export class ProductsController {
  public productService = new ProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.findAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;

      const product = await this.productService.findProductById(productId);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const dto: CreateProductDto = req.body;
      const product = await this.productService.createProduct({ ...dto, sellerId: req.user._id });

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  private async isNotProductSeller(productId: string, userId: string) {
    const product = await this.productService.findProductById(productId);
    return !isEqual(product.sellerId, userId);
  }

  public updateProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const dto: CreateProductDto = req.body;
      const productId: string = req.params.id;

      if (await this.isNotProductSeller(productId, req.user._id)) {
        return next(new HttpException(403, 'Only the seller can make this action'));
      }

      const updatedProduct = await this.productService.updateProduct(productId, dto);
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return next(error);
    }
  };

  public deleteProduct = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const productId: string = req.params.id;

      if (await this.isNotProductSeller(productId, req.user._id)) {
        return next(new HttpException(403, 'Only the seller can make this action'));
      }

      const product = await this.productService.deleteProduct(productId);

      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  };
}
