import { Injectable } from '@nestjs/common';
import { AddressPersistenceService } from './address-persistence/address-persistence.service';
import { IdDto } from '../dto/id.dto';
import { Address } from './address-persistence/schemas/address.schema';
import { AddressDto } from './dto/address.dto';
import { UpdateAddressPatchBodyDto } from './dto/update-address-patch-body.dto';

@Injectable()
export class AddressService {
  constructor(
    private readonly _addressPersistenceService: AddressPersistenceService,
  ) {}

  async findAll(): Promise<Address[]> {
    return this._addressPersistenceService.findAll();
  }

  async findOne({ id }: IdDto): Promise<Address> {
    return this._addressPersistenceService.findOne({ id });
  }

  async create(createAddress: AddressDto): Promise<Address> {
    return this._addressPersistenceService.create(createAddress);
  }

  async updatePartial(
    id: string,
    updateAddress: UpdateAddressPatchBodyDto,
  ): Promise<Address> {
    return this._addressPersistenceService.updatePartial(id, updateAddress);
  }

  async updateAll(id: string, updateAddress: AddressDto): Promise<Address> {
    return this._addressPersistenceService.updateAll(id, updateAddress);
  }

  async delete(id: string): Promise<Address> {
    return this._addressPersistenceService.delete(id);
  }
}
