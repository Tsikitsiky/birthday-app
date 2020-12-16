// this function fetches all the people
const endPoint = "https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json";
export async function fetchData() {
    const response = await fetch(endPoint);
    const data = await response.json();
    localStorage.setItem('peopleBirthday', JSON.stringify(data));
    return data;
}

