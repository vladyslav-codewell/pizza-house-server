# Pizza House — Server

NestJS REST API з MongoDB. Повна документація доступна через Swagger.

---

## Tech Stack

| | |
|---|---|
| Runtime | Node.js 20+ |
| Framework | NestJS 11 |
| Database | MongoDB + Mongoose 8 |
| Auth | JWT (Bearer) via `@nestjs/jwt` |
| Validation | `class-validator` + `class-transformer` |
| Docs | Swagger / OpenAPI (`@nestjs/swagger`) |
| Config | `@nestjs/config` — всі секрети через `.env` |

---

## Старт

```bash
git clone https://github.com/vladyslav-codewell/pizza-house-server.git
cd pizza-house-server

cp .env.example .env
# заповни MONGODB_URI та JWT_SECRET

npm install
npm run start:dev
```

Сервер: `http://localhost:5000/api`  
Swagger: `http://localhost:5000/docs`

---

## Environment Variables

| Змінна | Обов'язкова | Опис |
|---|---|---|
| `MONGODB_URI` | ✅ | Connection string MongoDB Atlas або локальний |
| `JWT_SECRET` | ✅ | Довгий випадковий рядок для підпису токенів |
| `PORT` | — | Порт сервера (default: `5000`) |
| `ALLOWED_ORIGINS` | — | CORS origins через кому (default: `*`) |
| `API_URL` | — | Публічний URL сервера (відображається в Swagger) |

---

## Project Structure

```
src/
├── main.ts                        # Bootstrap: CORS, global prefix /api, Swagger, ValidationPipe
├── app.module.ts                  # Root module: ConfigModule + MongooseModule async
│
└── modules/
    ├── auth/
    │   ├── auth.controller.ts     # POST /auth/login, GET /auth/profile
    │   ├── auth.service.ts        # signIn: email + bcrypt verify → JWT
    │   ├── auth.guard.ts          # Global JWT guard + @Public() decorator
    │   └── dto/sign-in.dto.ts
    │
    ├── users/
    │   ├── users.controller.ts    # CRUD /users (POST public, решта — auth)
    │   ├── users.service.ts       # password hashing, select('-password') скрізь
    │   └── schemas/user.schema.ts
    │
    ├── products/
    │   ├── products.controller.ts # /products + /products/grouped
    │   ├── products.service.ts    # deep populate: group_modifiers → modifiers
    │   └── schemas/
    │       ├── product.schema.ts         # варіант піци (30см / 40см / 50см)
    │       └── grouped-product.schema.ts # група варіантів (батьківський запис)
    │
    ├── categories/
    │   ├── categories.controller.ts  # CRUD /categories (GET public)
    │   └── schemas/category.schema.ts
    │
    ├── modifiers/
    │   ├── modifiers.controller.ts       # CRUD /modifiers
    │   ├── group-modifiers.controller.ts # CRUD /group-modifiers
    │   └── schemas/
    │       ├── modifier.schema.ts        # окремий модифікатор (сир, гриби...)
    │       └── group-modifier.schema.ts  # група (Вибір бортика, Додатки)
    │
    └── orders/
        ├── orders.controller.ts   # POST /orders, GET /orders/my, PATCH /orders/:id/status
        ├── orders.service.ts      # owner check, pagination, aggregation stats
        └── schemas/order.schema.ts # snapshot підхід — дані продуктів копіюються
```

---

## API Reference

### Authentication

| Метод | URL | Auth | Опис |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Логін → `access_token` |
| `GET` | `/api/auth/profile` | JWT | Поточний юзер із токена |

### Users

| Метод | URL | Auth | Опис |
|---|---|---|---|
| `POST` | `/api/users` | Public | Реєстрація |
| `GET` | `/api/users` | JWT | Список всіх юзерів |
| `GET` | `/api/users/:id` | JWT | Юзер по ID |
| `PATCH` | `/api/users/:id` | JWT | Оновити email / пароль |
| `DELETE` | `/api/users/:id` | JWT | Видалити юзера |

### Products

| Метод | URL | Auth | Опис |
|---|---|---|---|
| `GET` | `/api/products/grouped` | Public | Всі групи з варіантами (головна сторінка) |
| `GET` | `/api/products/grouped/:id` | Public | Одна група |
| `POST` | `/api/products/grouped` | JWT | Створити групу |
| `PATCH` | `/api/products/grouped/:id` | JWT | Оновити групу |
| `DELETE` | `/api/products/grouped/:id` | JWT | Видалити групу |
| `GET` | `/api/products` | Public | Всі варіанти продуктів |
| `GET` | `/api/products/:id` | Public | Варіант по ID (з модифікаторами) |
| `POST` | `/api/products` | JWT | Створити варіант |
| `PATCH` | `/api/products/:id` | JWT | Оновити варіант |
| `DELETE` | `/api/products/:id` | JWT | Видалити варіант |

### Categories

| Метод | URL | Auth | Опис |
|---|---|---|---|
| `GET` | `/api/categories` | Public | Всі категорії з продуктами |
| `GET` | `/api/categories/:id` | Public | Категорія по ID |
| `POST` | `/api/categories` | JWT | Створити категорію |
| `PATCH` | `/api/categories/:id` | JWT | Оновити |
| `DELETE` | `/api/categories/:id` | JWT | Видалити |

### Modifiers

| Метод | URL | Auth | Опис |
|---|---|---|---|
| `GET` | `/api/modifiers` | Public | Всі модифікатори |
| `POST` | `/api/modifiers` | JWT | Створити модифікатор |
| `PATCH` | `/api/modifiers/:id` | JWT | Оновити |
| `DELETE` | `/api/modifiers/:id` | JWT | Видалити |
| `GET` | `/api/group-modifiers` | Public | Всі групи модифікаторів (populate) |
| `POST` | `/api/group-modifiers` | JWT | Створити групу |
| `PATCH` | `/api/group-modifiers/:id` | JWT | Оновити |
| `DELETE` | `/api/group-modifiers/:id` | JWT | Видалити |

### Orders

| Метод | URL | Auth | Опис |
|---|---|---|---|
| `POST` | `/api/orders` | JWT | Створити замовлення |
| `GET` | `/api/orders/my` | JWT | Мої замовлення (paginated) |
| `GET` | `/api/orders/my/:id` | JWT | Деталі замовлення (owner check) |
| `GET` | `/api/orders` | JWT | [Admin] Всі замовлення з фільтром |
| `PATCH` | `/api/orders/:id/status` | JWT | [Admin] Змінити статус |
| `GET` | `/api/orders/stats/:userId` | JWT | [Admin] Статистика по юзеру |

Query params для `GET /api/orders` та `GET /api/orders/my`:
- `page` (default: 1)
- `limit` (default: 10 / 20)
- `status` — фільтр: `pending | confirmed | preparing | delivering | done | cancelled`

---

## Architecture Decisions

### Global JWT Guard + `@Public()`

`AuthGuard` зареєстрований через `APP_GUARD` — захищає всі роути за замовчуванням. Публічні ендпоінти позначаються декоратором `@Public()`. Це безпечніше ніж навпаки: якщо забув додати guard — роут залишається захищеним, а не відкритим.

### Order Schema — Snapshot підхід

`Order.items` зберігає копію даних продукту (назва, ціна, модифікатори) на момент замовлення замість `ref`. Якщо завтра ціна піци зміниться — стара історія замовлень залишиться коректною. Це стандарт для e-commerce систем.

### Password never returned

`users.service.ts` завжди використовує `.select('-password')` при поверненні даних. `findOneByEmail` (для auth) — єдиний виняток, бо потрібен хеш для порівняння.

### MongoDB URI ніколи не в коді

`MongooseModule.forRootAsync` читає URI через `ConfigService`. Навіть у dev середовищі — тільки через `.env.local`.

---

## Order Statuses Flow

```
pending → confirmed → preparing → delivering → done
    ↘                                        ↗
                  cancelled
```

---

## Scripts

```bash
npm run start:dev    # watch mode з hot reload
npm run build        # компіляція в /dist
npm run start:prod   # запуск продакшн білду
npm run lint         # ESLint з авто-фіксом
npm run test         # Jest unit tests
npm run test:e2e     # End-to-end тести
```

---

## Contributing

```bash
npm run lint
```

Правила:
- Ніяких `any` — якщо тип невідомий, визначи інтерфейс
- Секрети тільки через `.env` — ніколи в коді
- Кожен новий ендпоінт — `@ApiOperation` + `@ApiResponse` в Swagger
- Публічні GET → `@Public()`, решта захищена автоматично
