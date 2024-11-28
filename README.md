# FullStack-DevOps-Project

## Steps:

- write the `compose.yaml` file.
- write `.gitignore` file.

```bash
docker compose up db
```

### To check the container is up and running:

```bash
docker exec -it db psql -U postgres
```

## Postgres Commands:

```bash
\l
\dt
```

```bash
docker compose build

docker compose up -d backend

docker exec -it backend npx prisma migrate dev --name init
```

Insert data directly from postgres terminal

```bash
insert into "User" (name, email) values ('frompsql', 'userfrompsqlmail');
```

```bash
docker compose up -d frontend
```

to stop the containers:

```bash
docker compose stop
```
