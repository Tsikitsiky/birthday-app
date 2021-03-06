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
         fetchData();
    }
    populateTheList(people);
    
   dispatchEvent(new CustomEvent('pleaseUpdate'));
};
initLocalStorage();

const updateLs = () => {
    localStorage.setItem('peopleBirthday', JSON.stringify(people));
}

function filter() {
    let filteredPeople = [...people]
    if(filterNameInput.value !== '') { 
        filteredPeople = filteredPeople.filter(person => {
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
        filteredPeople = filteredPeople.filter(person => new Date(person.birthday).getMonth() == filterMonthInput.value)  
    }

    populateTheList(filteredPeople);
}


export function populateTheList(people) {
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
            <div>
                <h3>${person.firstName} ${person.lastName}</h3> 
                 ${daysLeft === 0 ?
                 `<span class="greyText">Today is ${person.firstName}'s birthday</span>`
                 :
                 `<span class="greyText">Turns <b>${age}</b> on ${month} ${date}</span>`}
            </div>
            <div class="daysLeft">
                <p class="greyText">${daysLeft === 0 ? `${birthdayCake} ${birthdayCake} ${birthdayCake}` : `
                in ${daysLeft} days`}</p>
                <p>
                    <button class="edit">
                        ${edit}
                    </button>
                    <button class="delete">
                        ${trash}
                    </button>
                </p>
            </div>
        </article>
        `
    }
       )

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
            <input type="text" name="lastName" required>
		</fieldset>
		<fieldset>
            <label>First name</label>
            <input type="text" name="firstName" required>
        </fieldset>
        <fieldset>
            <label>Birthday</label>
            <input type="date" name="birthday" required>
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
            picture: "https://picsum.photos/100",
            birthday: addForm.birthday.value
        }
        //console.log(newPerson);
        people.unshift(newPerson);
        //console.log(people);
        destroyPopup(addForm);
        main.dispatchEvent(new CustomEvent('pleaseUpdate'));
        populateTheList(people);
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
            <h2>Edit ${personToEdit.firstName} ${personToEdit.lastName}</h2>
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
                <input type="text" name="birthday" value="${new Date(personToEdit.birthday).toLocaleDateString()}">
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
            main.dispatchEvent(new CustomEvent('pleaseUpdate'));
            populateTheList(people);
            destroyPopup(editForm);
               
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
				populateTheList(people);
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


//event listeners
filterNameInput.addEventListener('input', filter);
filterMonthInput.addEventListener('change', filter);
addBtn.addEventListener('click', addPeople);
main.addEventListener('pleaseUpdate', updateLs);
main.addEventListener('click', handleClicks);
window.addEventListener('DOMContentLoaded', populateTheList);