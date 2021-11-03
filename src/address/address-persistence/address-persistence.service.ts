import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from './schemas/address.schema';
import { IdDto } from '../../dto/id.dto';
import { AddressDto } from '../dto/address.dto';
import { UpdateAddressPatchBodyDto } from '../dto/update-address-patch-body.dto';

@Injectable()
export class AddressPersistenceService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}

  async findAll(): Promise<Address[]> {
    return this.addressModel.find();
  }

  async findOne({ id }: IdDto): Promise<Address> {
    const address: Address | null = await this.addressModel.findById(id);
    if (address !== null) {
      return address;
    }
    return null;
  }

  async create(addressData: AddressDto): Promise<Address> {
    const createdPost = new this.addressModel(addressData);
    return createdPost.save();
  }

  async updateAll(
    id: string,
    addressData: AddressDto,
  ): Promise<Address | null> {
    const post = await this.addressModel
      .findByIdAndUpdate(id, addressData)
      .setOptions({ overwrite: true, new: true });
    if (post !== null) {
      throw new NotFoundException();
    }
    return post;
  }

  async updatePartial(
    id: string,
    addressData: UpdateAddressPatchBodyDto,
  ): Promise<Address | null> {
    const post = await this.addressModel
      .findByIdAndUpdate(id, addressData)
      .setOptions({ new: true });
    if (post === null) {
      throw new NotFoundException();
    }
    return post;
  }

  async delete(postId: string): Promise<Address> {
    const result = await this.addressModel.findByIdAndDelete(postId);
    if (result === null) {
      throw new NotFoundException();
    }
    return result;
  }
}
