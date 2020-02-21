//HTML element selectors
const galleryId = document.querySelector('#gallery');
const galleryClass = document.querySelector('.gallery');

//Variable which will hold an array of randomly generated users.
let randomUsers;

//Target url for fetch request
let apiURL = 'https://randomuser.me/api/?results=12';

// Fetches 12 users from randomuser API
async function fetchUsers(url){
    const people = await fetch(url);
    const peopleJSON = await people.json()

    randomUsers = peopleJSON.results.map(res => {
        const dobRegex = /\d\d\d\d-\d\d-\d\d/g;
        let dob = dobRegex.exec(res.dob.date);

        let person = {
            name: res.name.first + ' ' + res.name.last,
            email: res.email,
            location: {
                city: res.location.city, 
                state: res.location.state,
                street: res.location.street.number + ' ' + res.location.street.name,
                postcode: res.location.postcode,
            },
            phone: res.phone,
            birthday: dob,
            pictureURL: res.picture.large,
        }
        // console.log(peopleJSON)
        return person
    });
}

//Executes fetchUsers() and loops thru randomUsers array and creates gallery cards
function createGallery(){
    fetchUsers(apiURL).then(() => {
        randomUsers.forEach(element => {
            let card = document.createElement('div');
            card.className = "card";
            card.innerHTML = 
                    `<div class="card-img-container">
                        <img class="card-img" src="${element.pictureURL}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${element.name}</h3>
                        <p class="card-text">${element.email}</p>
                        <p class="card-text cap">${element.location.city}</p>
                    </div>`;
            galleryClass.appendChild(card)    
        });
    })
    .catch(err => {
        let errMsg = document.createElement('h3');
        errMsg.innerHTML = `Something went wrong. Please try reloading the page.`;
        console.log(err);

        galleryClass.appendChild(errMsg);
    })
}

createGallery();

//Gallery card click event handler
galleryClass.addEventListener('click', e => {
    //console.log(e)

    for(let i = 0; i < randomUsers.length; i++){
        if(e.target.parentElement.innerText.includes(randomUsers[i].name)){
            //console.log(randomUsers[i].name)

            let modal = document.createElement('div');
            modal.className = "modal-container";
            modal.innerHTML = 
                `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${randomUsers[i].pictureURL}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${randomUsers[i].name}</h3>
                        <p class="modal-text">${randomUsers[i].email}</p>
                        <p class="modal-text cap">${randomUsers[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${randomUsers[i].phone}</p>
                        <p class="modal-text">${randomUsers[i].location.street + ', ' + randomUsers[i].location.city + ', ' + randomUsers[i].location.state + ' ' + randomUsers[i].location.postcode}</p>
                        <p class="modal-text">${randomUsers[i].birthday}</p>
                    </div>
                </div>`;
            galleryClass.insertAdjacentElement('afterend', modal)
            break
        }
    }
    document.querySelector('.modal-close-btn').addEventListener('click', e => {
        let modal = document.querySelector('.modal-container');
        modal.remove();
    })

})

