import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateGroupedProductDto } from './dtos/create-grouped-product.dto';
import { GroupedProduct, GroupedProductDocument } from './schemas/grouped-product.schema';
import { UpdateGroupedProductDto } from './dtos/update-grouped-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,

    @InjectModel(GroupedProduct.name) private readonly groupedProductModel: Model<GroupedProductDocument>,
  ) { }

  async findAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate('category_id')
      .populate({
        path: 'group_modifiers',
        populate: {
          path: 'modifiers'
        }
      })
      .exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate({
        path: 'group_modifiers',
        populate: {
          path: 'modifiers'
        }
      })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return deletedProduct;
  }

  async getAllGroupedProducts() {
    return await this.groupedProductModel.find().populate({
      path: 'products', 
      populate: [ 
        {
          path: 'category_id', 
        },
        {
          path: 'group_modifiers',
          populate: {
            path: 'modifiers',
          }
        }
      ]
    })
  }

  async getGroupedProductById(id: string) {
    return await this.groupedProductModel.findOne({ where: { id } })
  }

  async createGroupedProduct(dto: CreateGroupedProductDto): Promise<GroupedProduct> {
    const createdGroup = new this.groupedProductModel(dto);
    return createdGroup.save();
  }

  async updateGroupedProduct(id: string, updateGroupedProductDto: UpdateGroupedProductDto): Promise<GroupedProduct> {
    const updatedGroup = await this.groupedProductModel
      .findByIdAndUpdate(id, updateGroupedProductDto, { new: true }) // { new: true } повертає оновлений документ
      .exec();

    if (!updatedGroup) {
      throw new NotFoundException(`Grouped Product with ID ${id} not found`);
    }
    return updatedGroup;
  }
}