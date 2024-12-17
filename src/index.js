import { createStore } from "redux";
import profileReducer from "./profileReducer";
import { addProfile, removeProfile, calculateAverageAge } from "./action";

const store = createStore(profileReducer);

store.subscribe(() => {
    console.log(store.getState());
    renderProfiles();
    updateAverageAge();
});

const profileList = document.querySelector("#profileList");
const addProfileForm = document.querySelector("#addProfileForm");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const idInput = document.querySelector("#idInput");
const removeId = document.querySelector("#removeId");
const removeBtn = document.querySelector("#removeBtn");
const averageAgeElement = document.querySelector("#averageAge");

let showAverageAge = false; 

const renderProfiles = () => {
    const state = store.getState();
    profileList.innerHTML = ""; 

    profileList.innerHTML = state.profiles.map(profile => {
        return `<li>${profile.id}. ${profile.name} (${profile.age} years old)</li>`;
    }).join("");
};

const updateAverageAge = () => {
    const state = store.getState();
    if (showAverageAge) {
        averageAgeElement.textContent = `Average Age: ${state.averageAge.toFixed(2)}`;
    } else {
        averageAgeElement.textContent = ""; 
    }
};

addProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = parseInt(idInput.value);
    const name = nameInput.value;
    const age = parseInt(ageInput.value);

    //console.log("Adding profile:", { id, name, age });

    if (name && age && id) {
        store.dispatch(addProfile({ id, name, age }));
        store.dispatch(calculateAverageAge());
        idInput.value = "";
        nameInput.value = "";
        ageInput.value = ""; 

        showAverageAge = true; 
        updateAverageAge(); 
    }
});

removeBtn.addEventListener("click", () => {
    const id = parseInt(removeId.value);
    //console.log("Removing profile with ID:", id);

    if (id) {
        store.dispatch(removeProfile(id));
        store.dispatch(calculateAverageAge());
        

        updateAverageAge(); 
    }
});


renderProfiles();
updateAverageAge();

   

   
    
    
 



