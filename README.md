# Technical Test - Imagine Apps

This repository contains my solution to the Imagine Apps technical test.

## Technologies used

- Node.js
- Express
- Sequelize
- PostgreSQL
- Docker
- Jest

## Project Setup

### Installing Dependencies

To install the project dependencies, run the following command:

Navigate to the backend folder: `cd backend`

Install the dependencies: `npm install`

### Database Configuration

The application uses a PostgreSQL database. To configure the database connection, set the environment variables `user`, `pass`, `host`, and `schema` with their corresponding values.

<!-- Additionally, run the following command to create the necessary tables in the database: Copy code `npx sequelize-cli db:migrate` -->

### Running the Application

To run the application, execute the following command: `npm run dev`

## Endpoints

The following endpoints are available in the application.

### GET /api/properties

Returns a list of all the properties registered in the database.

Filtering can also be done by `req.query` or `req.body`: `address`, `city`, `year`

<!-- ### POST /properties/:id/like Registers that a user has "liked" a specific property. The `id` of the property should be specified in the URL. -->

## Database Design

The `property` table contains information about each property, such as its address, city, price, description, and year of construction.

The `status` table contains information about the different states a property can have, such as "for sale", "sold", or "pre-sale".

The `status_history` table is an intermediate table that relates properties to their states. Each record in this table represents a state change for a property on a specific date.

<!-- The `likes` table records the "likes" that users have given to properties. Each record in this table represents a user's "like" for a property on a specific date. -->

## "LIKE" SERVICE

This project extends the existing database model to allow users to "like" properties. To achieve this, a new entity called `user_like_property` has been created to record user likes information.

I have attached the E-R diagram I designed for the database in the "er-diagram.png" file:

![Alt Text](/backend/er-diagram.png)

##### Entity-Relationship Diagram

The following Entity-Relationship diagram shows the new entity `user_like_property` and its relationships with the existing entities `user` and `property`:

##### Entity-Relationship Diagram

The following SQL code creates the `user_like_property` table and defines its relationships with the existing `user` and `property` tables:


```sql
CREATE TABLE user_like_property (
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES property(id)
);
```

The `user_like_property` table has two columns: `user_id` and `property_id`, which store the information about the user who liked and the property that received the like, respectively. The table's primary key is defined as a combination of both columns to ensure that a user can only like a property once.

The `user_like_property` table also has two belongsTo relationships with the existing `user` and `property` tables. The first relationship defines that the `user_id` column in the `user_like_property` table relates to the `id` column in the `user` table. The second relationship defines that the `property_id` column in the `user_like_property` table relates to the `id` column in the `property` table.

Explanation:

The `user_like_property` table has been created and its relationships with the existing `user` and `property` tables have been defined to allow users to "like" properties. By adding this new entity and its relationships, it is possible to record which user liked which property and perform queries to retrieve this information.

Furthermore, by defining the `belongsTo` relationships with the existing tables, data integrity and consistency are ensured at all times.

For more information about this project, please refer to the documentation.

# Extra points

## Testing

To run the tests, execute:

`npm run jest`

## Docker

If you want to use Docker, follow these instructions:

Go to the backend folder:

`cd backend`

Run Docker Compose:

`docker-compose up`

You should now be able to use the app at [http://localhost:3000/](http://localhost:3000/).

## Additional comments

Thank you for the opportunity to participate in this technical test!
