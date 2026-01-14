import { AppDataSource } from '../data-source';
import { User, UserRole } from '../../common/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function seedSecondAdmin() {
    const dataSource = await AppDataSource.initialize();
    const repo = dataSource.getRepository(User);

    const email = 'superadmin@example.com';

    const existingAdmin = await repo.findOne({ where: { email } });

    if (existingAdmin) {
        if (existingAdmin.role !== UserRole.ADMIN) {
            existingAdmin.role = UserRole.ADMIN;
            await repo.save(existingAdmin);
            console.log('Second admin role restored for:', email);
        } else {
            console.log('Second admin already exists:', email);
        }

        await dataSource.destroy();
        return;
    }

    const passwordHash = await bcrypt.hash('SuperAdmin@123', 10);

    await repo.save({
        fullName: 'Super Admin 2',
        email,
        phoneNumber: '07034523178',
        passwordHash,
        role: UserRole.ADMIN,
    });

    console.log('Second admin created successfully!');
    await dataSource.destroy();
}

seedSecondAdmin().catch(err => {
    console.error('Failed to seed second admin:', err);
    process.exit(1);
});
