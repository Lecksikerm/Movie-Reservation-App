import { AppDataSource } from '../data-source';
import { User, UserRole } from '../../common/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seedAnotherAdmin() {
    const dataSource = await AppDataSource.initialize();

    const newAdmin = await dataSource.getRepository(User).findOne({
        where: { email: 'superadmin@example.com' },
    });

    if (newAdmin) {
        console.log('Second admin already exists');
        await dataSource.destroy();
        return;
    }

    const passwordHash = await bcrypt.hash('SuperAdmin@123', 10);

    await dataSource.getRepository(User).save({
        fullName: 'Super Admin 2',
        email: 'superadmin@example.com',
        phoneNumber: '07034523178', 
        passwordHash: passwordHash,
        role: UserRole.ADMIN,
    });

    console.log('Second admin created successfully!');
    await dataSource.destroy();
}

seedAnotherAdmin().catch(err => {
    console.error('Failed to seed second admin:', err);
    process.exit(1);
});