import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productData = {
      ...createProductDto,
      ...(createProductDto.provider && typeof createProductDto.provider === 'string'
        ? { provider: { providerId: createProductDto.provider } as any }
        : {}),
    };
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: {
        provider: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { productId: id },
      relations: {
        provider: true,
      },
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async findByProvider(providerId: string) {
    const product = await this.productRepository.findBy({
      provider: {
        providerId: providerId,
      },
    });
    if (!product) throw new NotFoundException();

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productData = {
      productId: id,
      ...updateProductDto,
      ...(updateProductDto.provider && typeof updateProductDto.provider === 'string'
        ? { provider: { providerId: updateProductDto.provider } as any }
        : {}),
    };
    const product = await this.productRepository.preload(productData);
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return await this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return await this.productRepository.remove(product);
  }
}
