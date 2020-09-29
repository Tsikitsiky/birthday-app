// import {people} from './script.js';
// import {main} from './elements.js';

// export function populateTheList(e, filterName, filterMonth) {
//     //const peopleSorted = people.sort((person1, person2) => person2.birthday - person1.birthday);
//     if(filterName) {
//         people = people.filter(person => {
//             let lowercaseFirstName = person.firstName.toLowerCase();
//             let lowercaseLastName = person.lastName.toLowerCase();
//             let lowercaseFilter = filterName.toLowerCase();
//             if(lowercaseFirstName.includes(lowercaseFilter) || lowercaseLastName.includes(lowercaseFilter)) {
//                 return true;
//             } else {
//                 return false;
//             }
//         })
//     }
//     if(filterMonth) {
//         console.log(filterMonth)
//         people = people.filter(person => new Date(person.birthday).getMonth() == filterMonth)  
//     }
//     const html = people.map(person => {
//         //manage the dates
//         let age = new Date().getFullYear() - new Date(person.birthday).getFullYear();
//         let brtDate = new Date(person.birthday).getDate();
//         let date;
//         let month;
//         if(brtDate > 3) {
//             date = `${brtDate}th`;
//         }
//          switch (brtDate % 10) {
//              case 1: 
//                 date = `${brtDate}st`;
//                 break;
//             case 2:
//                 date = `${brtDate}nd`;
//                 break;
//             case 3:
//                 date = `${brtDate}rd`;

//          };
//         const brtMonth = new Date(person.birthday).getMonth();
//         switch (brtMonth) {
//             case 0:
//               month = "January";
//               break;
//             case 1:
//               month = "February";
//               break;
//             case 2:
//                month = "March";
//               break;
//             case 3:
//               month = "April";
//               break;
//             case 4:
//               month = "May";
//               break;
//             case 5:
//               month = "June";
//               break;
//             case 6:
//               month = "July";
//             case 7:
//               month = "August";
//               break;
//             case 8:
//               month = "September";
//               break;
//             case 9:
//               month = "October";
//               break;
//             case 10:
//               month = "November";
//               break;
//             case 11:
//               month = "December";
//           };

//           const oneDay = 24 * 60 * 60 * 1000;
//         let today = new Date();
//         let year; 
    
//     if(today.getMonth() > brtMonth) {
//         year = today.getFullYear() + 1;
//     } else if(today.getMonth() === brtMonth && today.getDate() > brtDate) {
//         year = today.getFullYear();
//     } else {
//         year = today.getFullYear();
//     }
//         let birthDay = new Date(year, brtMonth, brtDate); 
        
        
//         // To Calculate next year's birthday if passed already. 
//         if (today.getMonth() === brtMonth && today.getDate() > brtDate) {
//             birthDay.setFullYear(birthDay.getFullYear() + 1);
//             age = (new Date().getFullYear() + 1) - new Date(person.birthday).getFullYear();
//             //console.log(new Date(birthDay.setFullYear(birthDay.getFullYear())))
//         };

        
//         // To Calculate the result in milliseconds and then converting into days 
//         let daysLeft =  Math.round(Math.abs((new Date(birthDay) - new Date(today)) / oneDay));

//         return `
//         <article data-id="${person.id}">
//             <img src="${person.picture}" alt="${person.firstName} ${person.lastName}">
//             <p>${person.firstName} ${person.lastName} <br> Turns ${age} on ${date} ${month}</p>
//             <p> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>
//              in ${daysLeft}days</p>
//             <p>
//                 <button class="edit">
//                     <img src="../assets/edit.svg">
//                 </button>
//             </p>
//             <p>
//                 <button class="delete">
//                     <img src="../assets/trash.svg">
//                 </button>
//             </p>
//         </article>
//         `
//     }
//        ).sort((person1, person2) => person2.birthday - person1.birthday);

//         main.innerHTML = html.join('');
       
// }

// //destroy popup
// export async function destroyPopup(popup) {
//     popup.classList.remove('open');
//     //remove the popup from the DOM
//     popup.remove();
//     //remove from the javascript memory
//     popup = null;
// }
