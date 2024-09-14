# Full Stack Assessment:

## Backend Part

1. Create a CRUD API for managing `users` table created by the following SQL statement:

```sql
CREATE TABLE users
(
    ID         INT PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name  VARCHAR(50),
    created_at TIMESTAMP
);
```

To speed up the development we recommend using the API platform for Symfony (we don't work with Laravel so cannot
suggest more).

2. Extend the user GET handler to support filtering by field value
3. Implement simple sorting by field
4. Pagination

### Technical requirements:

- Framework: Symfony / Laravel
- ORM: Doctrine / Eloquent
- DB: MySQL / Postgresql

## Frontent Part

In /frontend directory you have already prepared VUE application to display User list. Some features are missing, please
add them:

1. Bind to CRUD API and display the user's list
2. Implement adding and modifying users using a simple form inside a modal.
    3. Deleting users should require a confirmation modal.
4. Allow sorting by at least one column (e.g., user email). This can be done with simple buttons or clickable table
   headers.
6. Keep the sorting persistent between page reloads.

### Technical requirements/stack:

1. Vue.js 3.x / Nuxt3
2. The project should be launched from the console
3. Styles should be built with SASS
4. Images should have optimization provided
5. We will check the Lighthouse score
6. The project should be provided with .zip / .tar.gz
7. Node package install should be possible with the latest npm/node version or please provide a proper readme file with
   requirements
