## Запуск проекта

```

npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проектан
```

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature Sliced Design

Ссылка на документацию - [Feature Sliced Design](https://feature-sliced.design/)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами. Файлы с переводами хранятся в public/locales

Документация [i18next](https://www.i18next.com/)

---

## Тесты

-   Unit тесты - `npm run test:unit`
-   e2e тесты - `npm run test:e2e`

Подробнее о тестах - [Документация тестирования](/docs/tests.md)

---

## Конфигурация проекта

Проект содержит 2 конфига

1. Webpack - `./config/build`
2. Vite - `vite.config.ts`

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit. По возможности переиспользуемые сущности необходимо нормализовать с помощью Entity/Adapter.

Запросы на сервер осуществляются с помощью RTK query
