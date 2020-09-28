//handle clicks
import {editPeople} from './script.js';
import {deletePeople} from './script.js';

export const handleClicks = (e) => {
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