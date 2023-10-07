import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  phoneNumber: '9783035376',
  email: 'asd@gmail.com',
  status: sample(['accept', 'reject']),
  designation: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phoneNumber: _mock.phoneNumber(index),
  address: '908 Jack Locks',
  country: _mock.address.country(index),
  state: 'Virginia',
  city: 'Rancho Cordova',
  zipCode: '85807',
  company: _mock.company(index),
  isVerified: _mock.boolean(index),
  status: randomInArray(['active', 'banned']),
  role: _mock.role(index),
}));

// export default users;
