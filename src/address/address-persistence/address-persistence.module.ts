import { Module } from '@nestjs/common';
import { AddressPersistenceService } from './address-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './schemas/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  providers: [AddressPersistenceService],
  exports: [AddressPersistenceService],
})
export class AddressPersistenceModule {}
