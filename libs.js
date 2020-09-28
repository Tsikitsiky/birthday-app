// this function fetches all the people
export async function fetchData() {
    const response = await fetch('./people.json');
    const data = await response.json();
    localStorage.setItem('peopleBirthday', JSON.stringify(data));
    return data;
}

