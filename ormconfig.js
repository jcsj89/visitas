module.exports = {
   "type": "sqlite",
   "database": "./src/typeorm/db.sql",
   "migrations": [
       "./{src,build}/typeorm/migrations/*{.ts,.js}",
   ],
   "cli": {
      "migrationsDir": "./src/typeorm/migrations"
   },
    "entities": [
        "{src,build}/modules/**/typeorm/entities/*{.ts,.js}",
    ],
}
