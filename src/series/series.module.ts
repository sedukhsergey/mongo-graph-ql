import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { SeriesPersistenceModule } from './series-persistence/series-persistence.module';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
  imports: [SeriesPersistenceModule],
})
export class SeriesModule {}
