FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN echo '#!/bin/sh\n\
echo "Waiting for database to be ready..."\n\
while ! npx prisma db ping 2>/dev/null; do\n\
    sleep 1\n\
done\n\
echo "Database is ready!"\n\
\n\
echo "Running database migrations..."\n\
npx prisma migrate deploy\n\
\n\
echo "Starting the application..."\n\
npm start' > start.sh

RUN chmod +x start.sh

EXPOSE 5000

CMD ["./start.sh"]