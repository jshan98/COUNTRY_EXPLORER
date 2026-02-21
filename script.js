// Listens for the DOMContentLoaded event to trigger the populateCards function.
document.addEventListener("DOMContentLoaded", populateCountryCards(data, 12));

var searchInput = document.getElementById("search-input");
var regionInput = document.getElementById("region-select");
var populationInput = document.getElementById("population-input");
searchInput.addEventListener("input", filterData);
regionInput.addEventListener("change", filterData);
populationInput.addEventListener("input", filterData);

/**
 * Function: filterData
 * @param none
 * Description: This function filters the data (By calling applyFiltersSearch & applyFiltersNoSearch) 
 * before calling and passing the filtered data to populateCards.
 * @returns none (void)
 */
function filterData(){
    let filteredCountries = [];
    let regex = new RegExp (/^[a-zA-Z -]*$/);
    if (!regex.test (searchInput.value) && !stringIsBlank(searchInput.value)){
        console.log("Enter valid Country Name.");
        return false;
    } else if (!stringIsBlank(searchInput.value)){
        console.log("1- I found the input: " + searchInput.value);
        filteredCountries = applyFiltersSearch(searchInput.value.toLowerCase(), isAllRegions(regionInput.value), regionInput.value, populationInput.valueAsNumber);
        populateCountryCards(filteredCountries, filteredCountries.length);
    } else if (stringIsBlank(searchInput.value)){
        console.log("2- I found the input: " + populationInput.valueAsNumber);
        filteredCountries = applyFiltersNoSearch(isAllRegions(regionInput.value), regionInput.value, populationInput.valueAsNumber);
    } else if (populationInput.valueAsNumber > 1500000000){
        console.log("Invalid population number");
        return false;
    }
    populateCountryCards(filteredCountries, filteredCountries.length);
}

/**
 * Function: applayFiltersNoSearch
 * @param {*} allRegions 
 * @param {*} regionIn 
 * @param {*} populationIn 
 * Description: Filters for results that do not have a search parameter based on allRegions(boolean),
 * regionIn(selection), populationIn(integer value).
 * @returns filtered array
 */
function applyFiltersNoSearch(allRegions, regionIn, populationIn){
    let filtered = [];
    if(allRegions){
        for(let index = 0; index < data.length; index++){
            if(data[index].population >= populationIn) {
                filtered.push(data[index]);
            }
        }
    } else {
        for(let index = 0; index < data.length; index++){
            if(data[index].region == regionIn && data[index].population >= populationIn) {
                filtered.push(data[index]);
            }
        }
    }
    return filtered;
}

/**
 * Function: applyFiltersSearch
 * @param {*} searchIn 
 * @param {*} allRegions 
 * @param {*} regionIn 
 * @param {*} populationIn
 * Description: Filters for results that have a search parameter based on the searchIn(string value), allRegions(boolean),
 * regionIn (selection), and populationIn(integer value). 
 * @returns filtered array
 */
function applyFiltersSearch(searchIn, allRegions, regionIn, populationIn){
    let filtered = [];
    if(allRegions){
        for(let index = 0; index < data.length; index++){
            if(data[index].name.official.toLowerCase().includes(searchIn) && data[index].population >= populationIn) {
                filtered.push(data[index]);
            }
        }
    } else {
        for(let index = 0; index < data.length; index++){
            if(data[index].name.official.toLowerCase().includes(searchIn)) {
                if(data[index].region == regionIn && data[index].population >= populationIn){
                    filtered.push(data[index]);
                }
            }
        }
    }
    return filtered;
}

/**
 * Function: stringIsBlank
 * @param {*} string 
 * Description: Checks whether the passes string value is blank or not then returns true or false.
 * @returns boolean value (true or false)
 */
function stringIsBlank(string){
    if(string.length == 0){
        return true;
    }
    else {
        return false;
    }
}

/**
 * Function: isAllRegions
 * @param {*} regionSelection
 * Description: Checks if region selection is set to all regions or not then returns true or false. 
 * @returns boolean value (true or false)
 */
function isAllRegions(regionSelection) {
    if(regionSelection == "All Regions"){
        return true;
    }
    else {
        return false;
    }
}

/**
 * Function: populateCards
 * Params: countriesArray, total
 * Description: Checks whether the countries array has a length of 0.
 * If the length is not 0, then the function creates the country cards and their elements.
 * Which then populates the page .
 * @returns none (void)
 */
function populateCountryCards(countriesArray, total) {
    document.getElementById("country-cards-container") .innerHTML= "";
    let countryCardsContainer = document.getElementById("country-cards-container");
    let displayCount = total;
    let countries = countriesArray;

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