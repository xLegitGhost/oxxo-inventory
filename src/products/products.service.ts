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
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: {
        provider: true,
      }
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }


  // async findByProvider(providerId: string) {
  //   return await this.productRepository.find({
  //     where: { provider: providerId },
  //   });
  // }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return await this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return await this.productRepository.remove(product);
  }
}
