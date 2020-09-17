//import {  } from 'date-fns'

const main = document.querySelector('main');
const addBtn = document.querySelector('.add');

let people = [];


// this function fetches all the people
async function fetchData() {
    const response = await fetch('./people.json');
    const data = await response.json();
    updateLs();
    return data;
}

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

function populateTheList() {
     //people = await fetchData();
     //console.log(people);
    //sort by their birthdays
    const peopleSorted = people.sort((person1, person2) => person2.birthday - person1.birthday);
    const html = peopleSorted.map(person => 
        `
        <article data-id="${person.id}">
            <img src="${person.picture}" alt="${person.firstName} ${person.lastName}">
            <p>${person.firstName} ${person.lastName} <br> Turns ${person.birthday} on ${person.birthday}</p>
            <p>${person.birthday}Days</p>
            <p>
                <button class="edit">
                    <img src="../assets/edit.svg">
                </button>
            </p>
            <p>
                <button class="delete">
                    <img src="../assets/trash.svg">
                </button>
            </p>
        </article>
        `);

        main.innerHTML = html.join('');
       
}


// var result = formatDistance(
//     new Date(2015, 1, 11),
//     new Date(2013, 11, 31)
//   )
//   console.log(result)



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
            <input type="text" name="birthday">
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
        people.push(newPerson);
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
    console.log(addForm)
}

const editPeople = (id) => {
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
                <input type="text" name="birthday" value="${personToEdit.birthday}">
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
            //debugger;
            populateTheList();
            destroyPopup(editForm);
            main.dispatchEvent(new CustomEvent('pleaseUpdate'));

            console.log(people)     
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
const deletePeople = (id) => {
    const personToDelete = people.find(person => person.id === id || person.id === Number(id));
    console.log(personToDelete );
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
                people = people.filter(person => person.id !== id);
                main.dispatchEvent(new CustomEvent('pleaseUpdate'));
				populateTheList();
                destroyPopup(deletePopup);
				console.log(people)
			}

			if(e.target.matches('button.cancel')){
				destroyPopup(deletePopup);
			}
		})
		resolve();
		document.body.appendChild(deletePopup)
        deletePopup.classList.add('open');
        // main.dispatchEvent(new CustomEvent('pleaseUpdate'));
	});
}

//handle clicks
const handleClicks = (e) => {
    if(e.target.closest('button.edit')) {
        const article = e.target.closest('article');
        const id = article.dataset.id;
        editPeople(id);
    }
    if(e.target.closest('button.delete')) {
        const article = e.target.closest('article');
        const id = article.dataset.id;
        deletePeople(id);
    }
}


//event listeners
addBtn.addEventListener('click', addPeople);
main.addEventListener('pleaseUpdate', updateLs);
main.addEventListener('click', handleClicks);
window.addEventListener('DOMContentLoaded', populateTheList);
// initLocalStorage();