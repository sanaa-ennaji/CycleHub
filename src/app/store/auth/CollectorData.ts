import { User } from '../../models/user.model';
export const generateFakeCollectors = (): User[] => {
    return [
      {
        id: '2',
        email: 'collector1@example.com',
        password: 'password123',
        firstName: 'John',
        address: '123 Collector St.',
        phoneNumber: '123-456-7890',
        dateOfBirth: new Date('1990-01-01'),
        roleId: 2, 
      },
      {
        id: '3',
        email: 'collector2@example.com',
        password: 'password123',
        firstName: 'Jane',
        address: '456 Collector Ave.',
        phoneNumber: '987-654-3210',
        dateOfBirth: new Date('1985-05-15'),
        roleId: 2, 
      },
     
    ];
  };
  