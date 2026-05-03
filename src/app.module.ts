import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SneakerModule } from './sneaker/sneaker.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SneakerModule,
    MongooseModule.forRoot(process.env.MONGO_URL!)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
