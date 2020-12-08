import {handleClicks} from './handlers.js';
import {main, addBtn, filterNameInput, filterMonthInput, filterForm} from './elements.js';
import {fetchData} from './libs.js';
import {birthdayCake, edit, trash} from './svg.js';
let people = [];

//get the array from ls
const initLocalStorage = () => {
    const stringFromLs = localStorage.getItem('peopleBirthday');
    const lsItems = JSON.parse(stringFromLs);
    if(lsItems) {
        people = lsItems
    } else {
         fetchData()
    }
    //populateTheList();
   dispatchEvent(new CustomEvent('pleaseUpdate'));
};
initLocalStorage();

const updateLs = () => {
    localStorage.setItem('peopleBirthday', JSON.stringify(people));
}

//filter
// const filterList = e => {
//     populateTheList(e,filterNameInput.value, filterMonthInput.value)
// };


function populateTheList() {
    //const peopleSorted = people.sort((person1, person2) => person2.birthday - person1.birthday);
    if(filterNameInput.value !== '') { 
        people = people.filter(person => {
            let lowercaseFirstName = person.firstName.toLowerCase();
            let lowercaseLastName = person.lastName.toLowerCase();
            let lowercaseFilter = filterNameInput.value.toLowerCase();
            if(lowercaseFirstName.includes(lowercaseFilter) || lowercaseLastName.includes(lowercaseFilter)) {
                return true;
            } else {
                return false;
            }
        })
    }
    
    if(filterMonthInput.value !== '') {
        //console.log(filterMonth)
        people = people.filter(person => new Date(person.birthday).getMonth() == filterMonthInput.value)  
    }
    const html = people.map(person => {
        //manage the dates
        let age = new Date().getFullYear() - new Date(person.birthday).getFullYear();
        let brtDate = new Date(person.birthday).getDate();
        let date;
        let month;
        if(brtDate > 3) {
            date = `${brtDate}th`;
        }
         switch (brtDate % 10) {
             case 1: 
                date = `${brtDate}st`;
                break;
            case 2:
                date = `${brtDate}nd`;
                break;
            case 3:
                date = `${brtDate}rd`;

         };
        const brtMonth = new Date(person.birthday).getMonth();
        switch (brtMonth) {
            case 0:
              month = "January";
              break;
            case 1:
              month = "February";
              break;
            case 2:
               month = "March";
              break;
            case 3:
              month = "April";
              break;
            case 4:
              month = "May";
              break;
            case 5:
              month = "June";
              break;
            case 6:
              month = "July";
              break;
            case 7:
              month = "August";
              break;
            case 8:
              month = "September";
              break;
            case 9:
              month = "October";
              break;
            case 10:
              month = "November";
              break;
            case 11:
              month = "December";
          };

          const oneDay = 24 * 60 * 60 * 1000;
        let today = new Date();
        let year; 
    
    if(today.getMonth() > brtMonth) {
        year = today.getFullYear() + 1;
    } else if(today.getMonth() === brtMonth && today.getDate() > brtDate) {
        year = today.getFullYear();
    } else {
        year = today.getFullYear();
    }
        let birthDay = new Date(year, brtMonth, brtDate); 
        
        
        // To Calculate next year's birthday if passed already. 
        if (today.getMonth() === brtMonth && today.getDate() > brtDate) {
            birthDay.setFullYear(birthDay.getFullYear() + 1);
            age = (new Date().getFullYear() + 1) - new Date(person.birthday).getFullYear();
            //console.log(new Date(birthDay.setFullYear(birthDay.getFullYear())))
        };

        
        // To Calculate the result in milliseconds and then converting into days 
        var daysLeft =  Math.round(Math.abs((new Date(birthDay) - new Date(today)) / oneDay));

        return `
        <article data-id="${person.id}">
            <img src="${person.picture}" alt="${person.firstName} ${person.lastName}">
            <p>${person.firstName} ${person.lastName} <br> ${daysLeft === 0 ? `Today is ${person.firstName}'s birthday`: `Turns ${age} on ${date} ${month}`}</p>
            <p>${daysLeft === 0 ? `${birthdayCake} ${birthdayCake} ${birthdayCake}` : `${birthdayCake}
            in ${daysLeft} days`}</p>
            <p>
                <button class="edit">
                    ${edit}
                </button>
            </p>
            <p>
                <button class="delete">
                    ${trash}
                </button>
            </p>
        </article>
        `
    }
       ).sort((person1, person2) => person2.daysLeft - person1.daysLeft);

        main.innerHTML = html.join('');
       
}



//destroy popup
async function destroyPopup(popup) {
    popup.classList.remove('open');
    //remove the popup from the DOM
    popup.remove();
    //remove from the javascript memory
    popup = null;
}

//add a person to the list
function addPeople() {
    const addForm = document.createElement('form');
    addForm.classList.add('popup');
    addForm.innerHTML = `
    <div>
		<fieldset>
            <label>Last name</label>
            <input type="text" name="lastName">
		</fieldset>
		<fieldset>
            <label>First name</label>
            <input type="text" name="firstName">
        </fieldset>
        <fieldset>
            <label>Birthday</label>
            <input type="date" name="birthday">
        </fieldset>
        <fieldset>
            <label>Picture</label>
            <input type="url" name="picture">
        </fieldset>
        <button type="submit">Save</button>
        <button type="button" name="cancel" class="cancel">Cancel</button>
    </div>
    `;
    //listen to submit
    addForm.addEventListener('submit', e => {
        e.preventDefault();
        const newPerson = {
            id: Date.now(),
            lastName: addForm.lastName.value,
            firstName: addForm.firstName.value,
            picture: "https://s3.amazonaws.com/uifaces/faces/twitter/jpenico/128.jpg",
            birthday: addForm.birthday.value
        }
        //console.log(newPerson);
        people.unshift(newPerson);
        //console.log(people);
        destroyPopup(addForm);
        main.dispatchEvent(new CustomEvent('pleaseUpdate'));
        populateTheList();
    });

    //cancel
    if(addForm.cancel) {
        addForm.cancel.addEventListener('click', function() {
            destroyPopup(addForm);
        }, 
        {once: true});
    }

    document.body.appendChild(addForm);
    addForm.classList.add('open');
}

export const editPeople = (id) => {
    let personToEdit = people.find(person => person.id === id || person.id === Number(id));
    //console.log(personToEdit);
    return new Promise(async function(resolve) {
        const editForm = document.createElement('form');
        editForm.classList.add('popup');
        editForm.innerHTML = `
        
        <div>
            <fieldset>
                <label>Last name</label>
                <input type="text" name="lastName" value="${personToEdit.lastName}">
            </fieldset>
            <fieldset>
                <label>First name</label>
                <input type="text" name="firstName" value="${personToEdit.firstName}">
            </fieldset>
            <fieldset>
                <label>Birthday</label>
                <input type="text" name="birthday" value="${new Date(personToEdit.birthday)}">
            </fieldset>
            <fieldset>
                <label>Picture</label>
                <input type="url" name="picture" value="${personToEdit.picture}">
            </fieldset>
            <button type="submit">Save</button>
            <button type="button" name="cancel" class="cancel">Cancel</button>
        </div>
        `;

        //save the edit
        editForm.addEventListener('submit', e => {
            e.preventDefault();
            personToEdit.lastName = editForm.lastName.value;
            personToEdit.firstName = editForm.firstName.value;
            personToEdit.birthday = editForm.birthday.value;
            personToEdit.picture = editForm.picture.value;
            populateTheList();
            destroyPopup(editForm);
            main.dispatchEvent(new CustomEvent('pleaseUpdate'));   
        }, {once: true});

        //cancel
        if(editForm.cancel) {
            editForm.cancel.addEventListener('click', function() {
                destroyPopup(editForm);
                resolve(null);
            }, 
            {once: true});
        }

        document.body.appendChild(editForm);
        editForm.classList.add('open');
    });
}

//delete a person 
export const deletePeople = (id) => {
    const personToDelete = people.find(person => person.id === id || person.id === Number(id));
    return new Promise(async function(resolve) {
		const deletePopup = document.createElement('div');
		deletePopup.classList.add('popup');
        deletePopup.insertAdjacentHTML("afterbegin", `
		<div>
			<p>Are you sure to delete <bold>${personToDelete.lastName} ${personToDelete.firstName}</bold>?</p>
			<button class="yes">Yes</button>
			<button class="cancel">Cancel</button>
		</div>
		`);
		deletePopup.addEventListener('click', (e) => {
			if(e.target.matches('button.yes')) {
                //people = people.filter(person => person.id !== id || person.id !== Number(id));
                if(typeof id === "string") {
                    people = people.filter(person => person.id !== Number(id))
                } 
                people = people.filter(person => person.id !== id);
                main.dispatchEvent(new CustomEvent('pleaseUpdate')); 
				populateTheList();
                destroyPopup(deletePopup);
			}
			if(e.target.matches('button.cancel')){
				destroyPopup(deletePopup);
			}
		})
		resolve();
		document.body.appendChild(deletePopup)
        deletePopup.classList.add('open');
        main.dispatchEvent(new CustomEvent('pleaseUpdate'));
	});
}

//hanndle clicks
// const handleClicks = (e) => {
//     if(e.target.closest('button.edit')) {
//         const article = e.target.closest('article');
//         const id = article.dataset.id;
//         editPeople(id);
//     }
//     if(e.target.closest('button.delete')) {
//         const article = e.target.closest('article');
//         const id = article.dataset.id;
//         deletePeople(id);
//     }
// }

//event listeners
filterNameInput.addEventListener('input', populateTheList);
filterMonthInput.addEventListener('change', populateTheList);
addBtn.addEventListener('click', addPeople);
main.addEventListener('pleaseUpdate', updateLs);
main.addEventListener('click', handleClicks);
window.addEventListener('DOMContentLoaded', populateTheList);