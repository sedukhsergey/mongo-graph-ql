import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressPersistenceModule } from './address-persistence/address-persistence.module';
import { AddressController } from './address.controller';

@Module({
  imports: [AddressPersistenceModule],
  providers: [AddressService],
  controllers: [AddressController],
})
export class AddressModule {}
