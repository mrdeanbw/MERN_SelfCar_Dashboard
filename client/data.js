import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Web from 'material-ui/svg-icons/av/web';
import {cyan600, pink600, purple600} from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  menus: [
    { text: 'DashBoard', icon: <Assessment/>,   link: '/dashboard' },
    { text: 'Users', icon: <PermIdentity/>,     link: '/users' },
    { text: 'Accounts', icon: <AccountBox/>,    link: '/accounts' },
    { text: 'Assigners', icon: <ActionAssignment/>, link: '/assigners' },
    { text: 'Mentorship', icon: <ActionAssignment/>, link: 'mentorship' }
  ],
// 9 teachers
   TeacherTabs : [
    { name: 'Kenneth',  fullName : 'Kenneth Au',   link: 'mentorship' , email : "kennethau82@gmail.com",    passWord : "UdacityForever",  guru_uid : 'u7542228' },
    { name: 'Ralph',    fullName : 'Ralph Tigoumo',   link: 'mentorship' , email : "ralphwantek@gmail.com",    passWord : "qy3QxateOkC3eDp", guru_uid : '666518750'},
    { name: 'Hamza',    fullName : 'Hamza Zia',   link: 'mentorship' , email : "ziahamza.ust@gmail.com",   passWord : "jIdJuyticRTUOmt", guru_uid : 'u30392994'},
    { name: 'Olivia',   fullName : 'Olivia Natacha',   link: 'mentorship' , email : "natoueolivia@yahoo.fr",    passWord : "o123456789", guru_uid : '8784850534'},
    { name: 'Baris',    fullName : 'Baris Karaagac',   link: 'mentorship' , email : "baris.k.005@gmail.com",    passWord : "CityU2011",  guru_uid : '9686232401'},
    { name: 'Rodrigo',  fullName : 'Rodrigo Bittarr',   link: 'mentorship' , email : "rodrigo_bittarr@hotmail.com", passWord : "secret",  guru_uid : '9709110714'},
    { name: 'Edmund',   fullName : 'Edmund Yang',   link: 'mentorship' , email : "edmundhaoyang@gmail.com",  passWord : "123456789",  guru_uid : '8654209222'},
    { name: 'Talha',    fullName : 'Talha Mahmood',   link: 'mentorship' , email : "tiankoint@gmail.com",      passWord : "Meem2004",   guru_uid : '3474298831'},
    { name: 'Reza',     fullName : 'Reza Chu',  link: 'mentorship' , email : "rezachu@gmail.com",      passWord : "ml252xsdc",   guru_uid : '8407107133'},
  ],

  tablePage: {
    items: [
      {id: 1, name: 'Product 1', price: '$50.00', category: 'Category 1'},
      {id: 2, name: 'Product 2', price: '$150.00', category: 'Category 2'},
      {id: 3, name: 'Product 3', price: '$250.00', category: 'Category 3'},
      {id: 4, name: 'Product 4', price: '$70.00', category: 'Category 4'},
      {id: 5, name: 'Product 5', price: '$450.00', category: 'Category 5'},
      {id: 6, name: 'Product 6', price: '$950.00', category: 'Category 6'},
      {id: 7, name: 'Product 7', price: '$550.00', category: 'Category 7'},
      {id: 8, name: 'Product 8', price: '$750.00', category: 'Category 8'}
    ]
  },
  
  dashBoardPage: {
    recentProducts: [
      {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
      {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
      {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
      {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
    ],
    monthlySales: [
      {name: 'Jan', uv: 3700},
      {name: 'Feb', uv: 3000},
      {name: 'Mar', uv: 2000},
      {name: 'Apr', uv: 2780},
      {name: 'May', uv: 2000},
      {name: 'Jun', uv: 1800},
      {name: 'Jul', uv: 2600},
      {name: 'Aug', uv: 2900},
      {name: 'Sep', uv: 3500},
      {name: 'Oct', uv: 3000},
      {name: 'Nov', uv: 2400},
      {name: 'Dec', uv: 2780}
    ],
    newOrders: [
      {pv: 2400},
      {pv: 1398},
      {pv: 9800},
      {pv: 3908},
      {pv: 4800},
      {pv: 3490},
      {pv: 4300}
    ],
    browserUsage: [
      {name: 'Chrome', value: 800, color: cyan600, icon: <ExpandMore/>},
      {name: 'Firefox', value: 300, color: pink600, icon: <ChevronRight/>},
      {name: 'Safari', value: 300, color: purple600, icon: <ExpandLess/>}
    ]
  }
};

export default data;
