// import {destroyPopup, populateTheList} from './utils.js';
// import {people} from './script.js';
// import {main} from './elements.js'

// //add a person to the list
// export function addPeople() {
//     const addForm = document.createElement('form');
//     addForm.classList.add('popup');
//     addForm.innerHTML = `
//     <div>
// 		<fieldset>
//             <label>Last name</label>
//             <input type="text" name="lastName">
// 		</fieldset>
// 		<fieldset>
//             <label>First name</label>
//             <input type="text" name="firstName">
//         </fieldset>
//         <fieldset>
//             <label>Birthday</label>
//             <input type="date" name="birthday">
//         </fieldset>
//         <fieldset>
//             <label>Picture</label>
//             <input type="url" name="picture">
//         </fieldset>
//         <button type="submit">Save</button>
//         <button type="button" name="cancel" class="cancel">Cancel</button>
//     </div>
//     `;
//     //listen to submit
//     addForm.addEventListener('submit', e => {
//         e.preventDefault();
//         const newPerson = {
//             id: Date.now(),
//             lastName: addForm.lastName.value,
//             firstName: addForm.firstName.value,
//             picture: "https://s3.amazonaws.com/uifaces/faces/twitter/jpenico/128.jpg",
//             birthday: addForm.birthday.value
//         }
//         //console.log(newPerson);
//         people.unshift(newPerson);
//         //console.log(people);
//         destroyPopup(addForm);
//         main.dispatchEvent(new CustomEvent('pleaseUpdate'));
//         populateTheList();
//     });

//     //cancel
//     if(addForm.cancel) {
//         addForm.cancel.addEventListener('click', function() {
//             destroyPopup(addForm);
//         }, 
//         {once: true});
//     }

//     document.body.appendChild(addForm);
//     addForm.classList.add('open');
// }

// export const editPeople = (id) => {
//     let personToEdit = people.find(person => person.id === id || person.id === Number(id));
//     //console.log(personToEdit);
//     return new Promise(async function(resolve) {
//         const editForm = document.createElement('form');
//         editForm.classList.add('popup');
//         editForm.innerHTML = `
        
//         <div>
//             <fieldset>
//                 <label>Last name</label>
//                 <input type="text" name="lastName" value="${personToEdit.lastName}">
//             </fieldset>
//             <fieldset>
//                 <label>First name</label>
//                 <input type="text" name="firstName" value="${personToEdit.firstName}">
//             </fieldset>
//             <fieldset>
//                 <label>Birthday</label>
//                 <input type="text" name="birthday" value="${new Date(personToEdit.birthday)}">
//             </fieldset>
//             <fieldset>
//                 <label>Picture</label>
//                 <input type="url" name="picture" value="${personToEdit.picture}">
//             </fieldset>
//             <button type="submit">Save</button>
//             <button type="button" name="cancel" class="cancel">Cancel</button>
//         </div>
//         `;

//         //save the edit
//         editForm.addEventListener('submit', e => {
//             e.preventDefault();
//             personToEdit.lastName = editForm.lastName.value;
//             personToEdit.firstName = editForm.firstName.value;
//             personToEdit.birthday = editForm.birthday.value;
//             personToEdit.picture = editForm.picture.value;
//             populateTheList();
//             destroyPopup(editForm);
//             main.dispatchEvent(new CustomEvent('pleaseUpdate'));   
//         }, {once: true});

//         //cancel
//         if(editForm.cancel) {
//             editForm.cancel.addEventListener('click', function() {
//                 destroyPopup(editForm);
//                 resolve(null);
//             }, 
//             {once: true});
//         }

//         document.body.appendChild(editForm);
//         editForm.classList.add('open');
//     });
// }

// //delete a person 
// export const deletePeople = (id) => {
//     const personToDelete = people.find(person => person.id === id || person.id === Number(id));
//     return new Promise(async function(resolve) {
// 		const deletePopup = document.createElement('div');
// 		deletePopup.classList.add('popup');
//         deletePopup.insertAdjacentHTML("afterbegin", `
// 		<div>
// 			<p>Are you sure to delete <bold>${personToDelete.lastName} ${personToDelete.firstName}</bold>?</p>
// 			<button class="yes">Yes</button>
// 			<button class="cancel">Cancel</button>
// 		</div>
// 		`);
// 		deletePopup.addEventListener('click', (e) => {
// 			if(e.target.matches('button.yes')) {
//                 //people = people.filter(person => person.id !== id || person.id !== Number(id));
//                 if(typeof id === "string") {
//                     people = people.filter(person => person.id !== Number(id))
//                 } 
//                 people = people.filter(person => person.id !== id);
//                 main.dispatchEvent(new CustomEvent('pleaseUpdate')); 
// 				populateTheList();
//                 destroyPopup(deletePopup);
// 			}
// 			if(e.target.matches('button.cancel')){
// 				destroyPopup(deletePopup);
// 			}
// 		})
// 		resolve();
// 		document.body.appendChild(deletePopup)
//         deletePopup.classList.add('open');
//         main.dispatchEvent(new CustomEvent('pleaseUpdate'));
// 	});
// }