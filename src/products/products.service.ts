import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {

  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Coca Cola 600ml',
      price: 10.99,
      countSeal: 5,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Sabritas Normal 40g",
      price: 5.99,
      countSeal: 10,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 8.99,
      countSeal: 8,
      provider: uuid(),
    }
  ];



  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    if(!createProductDto.provider) createProductDto.provider = uuid();
    this.products.push(createProductDto);

    console.log('Creating product:', createProductDto);
    
    return this.products;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find(product => product.productId === id)
    if(!product) throw new NotFoundException();

    return product;
  }

  findByProvider(providerId: string) {
    const product = this.products.filter(product => product.provider === providerId);

    if(!product || product.length === 0) throw new NotFoundException();

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product: CreateProductDto = this.findOne(id) as CreateProductDto;
    if(!product) throw new NotFoundException();

    product = { ...product, ...updateProductDto };
    this.products = this.products.map(prod => prod.productId === id ? product : prod);
    return product;
  }

  remove(id: string) {
    const productToDelete = this.findOne(id);
    if(!productToDelete) throw new Error(`Product with id ${id} not found`);

    this.products = this.products.filter(product => product.productId !== productToDelete.productId);
    return this.products;
  }
}
