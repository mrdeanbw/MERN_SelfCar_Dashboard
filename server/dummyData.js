import User from './models/user';

export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const user1 = new User({ name: 'Admin', email: 'admin@adipster.com', password: 'Ats@1234' });

    User.create([user1], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
