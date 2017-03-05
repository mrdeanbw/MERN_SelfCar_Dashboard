import User from './models/user';
import Role from './models/role';
import cuid from 'cuid';

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const role1 = new User({ name: 'Admin' });
    const role2 = new User({ name: 'Manager' });

    Role.create([role1, role2], (error) => {
      if (!error) {
        console.log('Created roles....');
      }
    });

    const user1 = new User({ name: 'Admin', email: 'admin@adipster.com', password: 'Ats@1234', roles:[role1, role2], cuid: cuid() });

    User.create([user1], (error) => {
      if (!error) {
        console.log('Created Admin user....');
      }
      else {
        console.log(error);
      }
    });
  });
  
}
