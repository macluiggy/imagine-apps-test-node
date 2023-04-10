<!-- vaya a la carpeta backend
```
cd backend
```

installar dependencias
```
npm install o pnpm install

```

inicie el servidor

```
npm run dev
```

estrucura para el post en json
```json
{
	"ncedula": "1310564719",
	"nombre": "Luiggy",
	"apellido": "Macias",
	"lugar_nacimiento": "Manabí, Rocafuerte",
	"sexo": "masculino",
	"estado_civil": "soltero"
}
```

utilice la api con el endpont: http://localhost:3000/api/cedula -->

# README
Este proyecto extiende el modelo de la base de datos existente para permitir que los usuarios den "like" a propiedades. Para lograrlo, se ha creado una nueva entidad llamada `user_like_property` que registra la información de los likes de los usuarios.

##### Diagrama entidad-relación
El siguiente diagrama entidad-relación muestra la nueva entidad `user_like_property` y sus relaciones con las entidades existentes `User` y `Property`:

##### Diagrama entidad-relación

Código SQL
El siguiente código SQL crea la tabla `user_like_property` y define sus relaciones con las tablas existentes `user` y `property`:

```sql
Copy code
CREATE TABLE user_like_property (
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES property(id)
);
```
La tabla `user_like_property` tiene dos columnas: `user_id` y `property_id`, que almacenan la información del usuario que dio like y la propiedad que recibió el like, respectivamente. La clave primaria de la tabla se define como una combinación de ambas columnas para garantizar que un usuario solo pueda dar like a una propiedad una vez.

La tabla `user_like_property` también tiene dos relaciones belongsTo con las tablas existentes `user` y `property`. La primera relación define que la columna `user_id` de la tabla `user_like_property` se relaciona con la columna id de la tabla `user`. La segunda relación define que la columna `property_id` de la tabla `user_like_property` se relaciona con la columna `id` de la tabla `property`.

Explicación
Se ha creado la tabla `user_like_property` y se han definido sus relaciones con las tablas existentes `user` y `property` para permitir que los usuarios den "like" a propiedades. Al agregar esta nueva entidad y sus relaciones, se puede registrar qué usuario dio like a qué propiedad y realizar consultas para obtener esta información.

Además, al definir las relaciones belongsTo con las tablas existentes, se garantiza que los datos se mantengan integrales y coherentes en todo momento.

Para más información acerca de este proyecto, por favor consultar la documentación.