import { AppDataSource } from './data-source';

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('DB connection failed:', err);
        process.exit(1);
    });
