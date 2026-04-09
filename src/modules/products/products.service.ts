import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateGroupedProductDto } from './dtos/create-grouped-product.dto';
import {
  GroupedProduct,
  GroupedProductDocument,
} from './schemas/grouped-product.schema';
import { UpdateGroupedProductDto } from './dtos/update-grouped-product.dto';

const MODIFIER_POPULATE = {
  path: 'group_modifiers',
  populate: { path: 'modifiers' },
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectModel(GroupedProduct.name)
    private readonly groupedProductModel: Model<GroupedProductDocument>,
  ) {}
<<<<<<< HEAD

  // ── Single Products ──────────────────────────────────────────────────────────
=======
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836

  // --- Standalone Product Methods ---

  /**
   * Fetch all products with full population of categories and nested modifiers
   */
  async findAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate('category_id')
<<<<<<< HEAD
      .populate(MODIFIER_POPULATE)
=======
      .populate({
        path: 'group_modifiers',
        populate: {
          path: 'modifiers',
        },
      })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
      .exec();
  }

  /**
   * Find a single product by its ObjectID
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
<<<<<<< HEAD
      .populate('category_id')
      .populate(MODIFIER_POPULATE)
      .populate('well_together_products')
      .exec();

    if (!product) throw new NotFoundException(`Product ${id} not found`);
=======
      .populate({
        path: 'group_modifiers',
        populate: {
          path: 'modifiers',
        },
      })
      .exec();

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    return new this.productModel(dto).save();
  }

<<<<<<< HEAD
  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const updated = await this.productModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Product ${id} not found`);
    return updated;
=======
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  }

  async remove(id: string): Promise<{ deleted: true }> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Product ${id} not found`);
    return { deleted: true };
  }

<<<<<<< HEAD
  // ── Grouped Products ─────────────────────────────────────────────────────────

=======
  // --- Grouped Product Methods ---

  /**
   * Fetch all grouped products with deep population of variants and their modifiers
   */
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  async getAllGroupedProducts(): Promise<GroupedProduct[]> {
    return this.groupedProductModel
      .find()
      .populate({
        path: 'products',
        populate: [
          { path: 'category_id' },
<<<<<<< HEAD
          MODIFIER_POPULATE,
        ],
      })
      .sort({ order: 1 })
      .exec();
  }

=======
          {
            path: 'group_modifiers',
            populate: { path: 'modifiers' },
          },
        ],
      })
      .exec();
  }

  /**
   * Find a specific grouped product by ID
   * Fix: Changed from Sequelize-style { where: { id } } to Mongoose findById
   */
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  async getGroupedProductById(id: string): Promise<GroupedProduct> {
    const group = await this.groupedProductModel
      .findById(id)
      .populate({
        path: 'products',
<<<<<<< HEAD
        populate: [{ path: 'category_id' }, MODIFIER_POPULATE],
      })
      .exec();

    if (!group) throw new NotFoundException(`Grouped product ${id} not found`);
    return group;
  }

  async createGroupedProduct(dto: CreateGroupedProductDto): Promise<GroupedProduct> {
    return new this.groupedProductModel(dto).save();
  }

  async updateGroupedProduct(id: string, dto: UpdateGroupedProductDto): Promise<GroupedProduct> {
    const updated = await this.groupedProductModel
      .findByIdAndUpdate(id, dto, { new: true })
=======
        populate: { path: 'group_modifiers', populate: { path: 'modifiers' } },
      })
      .exec();

    if (!group) {
      throw new NotFoundException(`Grouped Product with ID ${id} not found`);
    }
    return group;
  }

  async createGroupedProduct(
    dto: CreateGroupedProductDto,
  ): Promise<GroupedProduct> {
    const createdGroup = new this.groupedProductModel(dto);
    return createdGroup.save();
  }

  async updateGroupedProduct(
    id: string,
    updateGroupedProductDto: UpdateGroupedProductDto,
  ): Promise<GroupedProduct> {
    const updatedGroup = await this.groupedProductModel
      .findByIdAndUpdate(id, updateGroupedProductDto, { new: true })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
      .exec();
    if (!updated) throw new NotFoundException(`Grouped product ${id} not found`);
    return updated;
  }
<<<<<<< HEAD

  async removeGroupedProduct(id: string): Promise<{ deleted: true }> {
    const result = await this.groupedProductModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Grouped product ${id} not found`);
    return { deleted: true };
  }
=======
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
}
