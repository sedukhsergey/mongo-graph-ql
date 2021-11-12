import { Module } from '@nestjs/common';
import { SeriesPersistenceService } from './series-persistence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Series, SeriesSchema } from './schemas/series.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Series.name, schema: SeriesSchema }]),
  ],
  providers: [SeriesPersistenceService],
})
export class SeriesPersistenceModule {}
