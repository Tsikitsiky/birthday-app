//import {differenceInYears} from 'date-fns';

const main = document.querySelector('main');
const addBtn = document.querySelector('.add');

// this function fetches all the people
async function fetchData() {
    const response = await fetch('/people.json');
    const data = await response.json();
    return data;
}

let people = Array.from(fetchData());

//get the array from ls
const initLocalStorage = () => {
    const stringFromLs = localStorage.getItem('peopleBirthday');
    const lsItems = JSON.parse(stringFromLs);
    if(lsItems) {
        people = lsItems
    } else {
        people = [];
    }
    main.dispatchEvent(new CustomEvent('pleaseUpdate'));
};

const updateLs = () => {
    localStorage.setItem('peopleBirthday', JSON.stringify(people));
}
console.log(people)

async function populateTheList() {
     people = await fetchData();
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

        main.insertAdjacentHTML("beforeend",html.join(''));
        //store the data in local storage
        localStorage.setItem('peopleBirthday', JSON.stringify(people));
}


// var result = differenceInYears(
//     new Date(2015, 1, 11),
//     new Date(2013, 11, 31)
//   )
//   console.log(result)

populateTheList();

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
        console.log(newPerson);
        people.push(newPerson);
        console.log(people);
        populateTheList();
        destroyPopup(addForm);
        main.dispatchEvent(new CustomEvent('pleaseUpdate'));
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
    let personToEdit = people.find(person => person.id === id);
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
            console.log(people)
            populateTheList(people);
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

//handle clicks
const handleClicks = (e) => {
    if(e.target.closest('button.edit')) {
        const article = e.target.closest('article');
        const id = article.dataset.id;
        editPeople(id);
    }
}


//event listeners
addBtn.addEventListener('click', addPeople);
main.addEventListener('pleaseUpdate', updateLs);
main.addEventListener('click', handleClicks);
initLocalStorage();