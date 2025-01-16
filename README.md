# 自用 NestJs 模板

## 以实现功能

* 使用多版本 URL 地址控制器版本
* 类验证器修饰符 new ValidationPipe()
* 全局异常拦截器 new AllExceptionFilter()
* 全局响应拦截器 new ResponseInterceptor()
* 全局日志请求ID RequestIdMiddleware
* kysely 数据库的链接 new DbService()
* Prisma 数据库的链接 new PrismaService()
* RabbitMQ 链接 new RabbitMqService()
* Redis 的使用 new RedisService()
* 时间转换拦截器 new TransformDateInterceptorInterceptor()
* id 转换拦截器 new TransformNumberInterceptorInterceptor()
* 公共路由装饰器 @Public()
* 默认的响应格式 new ResponseInterceptor()