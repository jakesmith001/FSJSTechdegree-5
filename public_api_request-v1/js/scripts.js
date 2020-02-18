let randomUsers

// Fetch 12 users
async function fetchUsers(url){
    const people = await fetch(url);
    const peopleJSON = await people.json()

    randomUsers = peopleJSON.results.map(res => {
        let names
        names = res.name.first + ' ' + res.name.last

        return names
    })
}

fetchUsers('https://randomuser.me/api/?results=5').then(() => console.log(randomUsers))
