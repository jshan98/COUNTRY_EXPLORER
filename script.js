// Listend for the DOMContentLoaded event to trigger the populateCards function.
document.addEventListener("DOMContentLoaded", populateCards);

/**
 * Function: populateCards
 * Params: None
 * Description: Checks whether the countries array has a length of 0.
 * If the length is not 0, then the function creates the country cards and their elements.
 * Which then populates the page .
 */
function populateCards() {
    document.getElementById("country-cards-container") .innerHTML= "";
    let countryCardsContainer = document.getElementById("country-cards-container");
    let displayCount = 12
    let countries = data;

    /* 
    First checks if the length of the containers array is 0.
    If the length is not 0, then creates the country cards to populate the page
    */
    if(countries.length == 0){
        console.log("No countries found");
    } else {
        let loopCounter = displayCount;
        for (let loop = 0; loop < loopCounter; loop++){

            // Creates div element for each new country card
            let newCard = document.createElement("div");
            newCard.name = 'card';
            newCard.className = 'country-card';

            // Creates each image element for each new flag
            let flag = document.createElement("img");
            flag.src = countries[loop].flags.svg;

            // Creates each heading element for each country name
            let countryName = document.createElement("h2");
            countryName.innerHTML = countries[loop].name.official;

            /*
            Creates a span and paragrah for each country's population.
            Then prepends the span to the population paragraph
            */
            let popSpan = document.createElement("span");
            popSpan.textContent = "Population: ";
            let population = document.createElement("p");
            population.textContent = countries[loop].population;
            population.prepend(popSpan);

            /*
            Creates a span and paragrah for each country's capital.
            Then prepends the span to the capital paragraph
            */
            let capitalSpan = document.createElement("span");
            capitalSpan.textContent = "Capital: ";
            let capital = document.createElement("p");
            capital.textContent = countries[loop].capital;
            capital.prepend(capitalSpan);

            /*
            Creates a span and paragrah for each country's region.
            Then prepends the span to the region paragraph
            */
            let regionSpan = document.createElement("span");
            regionSpan.textContent = "Region: ";
            let region = document.createElement("p");
            region.textContent = countries[loop].region;
            region.prepend(regionSpan);

            // Appends each element to the new country card div
            newCard.appendChild(flag);
            newCard.appendChild(countryName);
            newCard.appendChild(population);
            newCard.appendChild(capital);
            newCard.appendChild(region);

            // Append each new country card to the countryCardContainer
            countryCardsContainer.appendChild(newCard);
        }
    }
}