import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalDbExceptionFilter } from './common/filters/global-db-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    helmet({
      hsts: process.env.NODE_ENV === 'production' ? true : false,
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production'
          ? {
              directives: {
                'script-src': [
                  "'self'",
                  "'unsafe-inline'",
                  '://cloudflare.com',
                ],
                'img-src': ["'self'", 'data:', 'validator.swagger.io'],
                'style-src': ["'self'", "'unsafe-inline'"],
              },
            }
          : false,
    }),
  );

  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new GlobalDbExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('React NestJS PostgreSQL Template API')
    .setDescription(
      'API documentation for the React NestJS PostgreSQL template project',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
