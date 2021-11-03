import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { ParamsWithIdDto } from '../dto/params-with-id.dto';
import { Address } from './address-persistence/schemas/address.schema';
import { AddressDto } from './dto/address.dto';
import { UpdateAddressPatchBodyDto } from './dto/update-address-patch-body.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly _addressService: AddressService) {}

  @Get()
  async findAll(): Promise<Address[]> {
    return this._addressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') { id }: ParamsWithIdDto): Promise<Address> {
    return this._addressService.findOne({ id });
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createAddress: AddressDto,
  ): Promise<Address> {
    return this._addressService.create(createAddress);
  }

  @Patch(':id')
  updatePartial(
    @Param('id') { id }: ParamsWithIdDto,
    @Body(new ValidationPipe()) updateAddress: UpdateAddressPatchBodyDto,
  ): Promise<Address> {
    return this._addressService.updatePartial(id, updateAddress);
  }

  @Put(':id')
  updateAll(
    @Param('id') { id }: ParamsWithIdDto,
    @Body(new ValidationPipe()) updateAddress: AddressDto,
  ): Promise<Address> {
    return this._addressService.updateAll(id, updateAddress);
  }

  @Delete(':id')
  delete(@Param('id') { id }: ParamsWithIdDto): Promise<Address> {
    return this._addressService.delete(id);
  }
}
