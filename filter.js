//filter
import {populateTheList} from './script.js';

export const filterList = e => {
    populateTheList(e,filterNameInput.value, filterMonthInput.value)
};

filterNameInput.addEventListener('keyup', filterList);
filterMonthInput.addEventListener('change', filterList);
