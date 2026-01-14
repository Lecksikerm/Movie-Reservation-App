import { AppDataSource } from '../data-source';
import { User, UserRole } from '../../common/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seedAdmin() {
    const dataSource = await AppDataSource.initialize();

    const existingAdmin = await dataSource.getRepository(User).findOne({
        where: { email: 'admin@example.com' },
    });

    if (existingAdmin) {
        console.log('Admin user already exists');
        await dataSource.destroy();
        return;
    }

    const passwordHash = await bcrypt.hash('Admin@123', 10);

    await dataSource.getRepository(User).save({
        fullName: 'Super Admin',
        email: 'admin@example.com',
        phoneNumber: '07045327821',
        passwordHash: passwordHash,
        role: UserRole.ADMIN,
    });

    console.log('Admin user created successfully!');
    await dataSource.destroy();
}

seedAdmin().catch(err => {
    console.error('Failed to seed admin:', err);
    process.exit(1);
});

