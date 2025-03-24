import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIModule } from './domain/openai/openai.module';
import { ChatModule } from './domain/chat/chat.module';
import { KakaoModule } from './domain/kakao/kakao.module';
import { PostModule } from './domain/post/post.module'; // ✅ PostModule 추가
import { configValidationSchema } from './config/validation/config-validation';
import { UserModule } from './domain/user/user.module';
import { NewsletterModule } from './domain/newsletter/newsletter.module';

@Module({
  imports: [
    OpenAIModule, 
    ChatModule, 
    KakaoModule, 
    PostModule,
    UserModule,
    NewsletterModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [ '.env.' + process.env.NODE_ENV ], // 실행 환경에 따라 .env 파일을 선택
      validationSchema: configValidationSchema,
    }),
    // MongoDB 연결
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule 로드
      inject: [ConfigService], // ConfigService 주입
      useFactory: (configService: ConfigService) => {
        const dbHost = configService.get<string>('DB_HOST');
        const uri = `${dbHost}`;
        return { uri };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
