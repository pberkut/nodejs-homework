## Node.js App contacts RESTful API

This this Node.js App "Contacts" RESTful API with authorization. App deploy Render service.

<https://nodejs-rest-api-backend-m9yr.onrender.com>

Work with users
```
// signup user
/users/register

// signin user
/users/login

// Get current user
/users/current

// Change subscription user. Subscription items using variant starter, pro, business
/users/subscription


// Logout user
/users/logout
```

Work with contacts through authorization
```
// GET. Get all contacts
/api/contacts

// GET. Get one contact by id
/api/contacts/:contactId

// POST. Create contact
/api/contacts

// PUT. Update contact
/api/contacts/:contactId

// PATCH. Update contact field "favorite"
/api/contacts/:contactId/favorite

// DELETE. Remove contact
/api/contacts/:contactId
```


### Commands

```
- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
```
