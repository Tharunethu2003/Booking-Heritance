function scrollToSection(sectionId) {
    var element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function submitRoomBookingForm() {
    console.log("Room booking form submitted");
}

function submitAdventureBookingForm() {
    console.log("Adventure booking form submitted");
}

/*ROOMS */


function updateTable() {
    
    let numOfDays = calculateNumOfDays(document.getElementById("checkin").value, document.getElementById("checkout").value);
    let checkinDate = document.getElementById("checkin").value;
    let checkoutDate = document.getElementById("checkout").value;
    let numSingleRooms = document.getElementById("numSingleRooms").value;
    let numDoubleRooms = document.getElementById("numDoubleRooms").value;
    let numTripleRooms = document.getElementById("numTripleRooms").value;
    let numAdults = document.getElementById("numAdults").value;
    let numChildren = document.getElementById("numChildren").value;
    let numChildrenAbove5 = document.getElementById("numChildrenAbove5").value;
    let numExtraBeds = document.getElementById("beds").value;
    let viewType = document.getElementById('viewType').value;
    let requirementsCheckboxes = document.querySelectorAll('input[name="requirements"]:checked');
    let requirements = Array.from(requirementsCheckboxes).map(checkbox => checkbox.value);

    // Calculate cost of the rooomss
    let singleRoomCost = 25000;
    let doubleRoomCost = 35000;
    let tripleRoomCost = 40000;
    let extraBedCost = 8000;
    let kidsAbove5Cost = 5000;


    if (!checkinDate || !checkoutDate) {
        // Handle the case if check-in or check-out date is not selected
        console.log("Please select both check-in and check-out dates");


        //the exs and the os
        document.getElementById("duration").innerText = 0;
        document.getElementById("checkinDate").innerText = "Select Check-Out Date";
        document.getElementById("checkoutDate").innerText = "Select Check-In Date";
        document.getElementById("singleCost").innerText = "Rs. 0.00";
        document.getElementById("doubleCost").innerText = "Rs. 0.00";
        document.getElementById("tripleCost").innerText = "Rs. 0.00";
        document.getElementById("numAdultsCost").innerText = 0;
        document.getElementById("numChildrenCost").innerText = 0;
        document.getElementById("numChildrenAbove5Cost").innerText = 0;
        document.getElementById("extraBedsCost").innerText = "Rs. 0.00";
        document.getElementById("kidsAbove5Cost").innerText = "Rs. 0.00";
        document.getElementById('roomView').innerText = "Not selected";
        document.getElementById('otherRequirementsCost').innerText = "No Requirements";
        document.getElementById("totalCost").innerText = "Rs. 0.00";

        return;
    }


    let durationCost = numOfDays;
    let singleCost = numSingleRooms * singleRoomCost * numOfDays;
    let doubleCost = numDoubleRooms * doubleRoomCost * numOfDays;
    let tripleCost = numTripleRooms * tripleRoomCost * numOfDays;
    let extraBedsCost = numExtraBeds * extraBedCost * numOfDays;
    let kidsAbove5CostTotal = numChildrenAbove5 * kidsAbove5Cost * numOfDays;
    let totalCost = singleCost + doubleCost + tripleCost + extraBedsCost + kidsAbove5CostTotal;

  


    // Update table 
    document.getElementById("duration").innerText = numOfDays;
    document.getElementById("checkinDate").innerText = checkinDate;
    document.getElementById("checkoutDate").innerText = checkoutDate;
    document.getElementById("singleCost").innerText = "Rs." + singleCost.toFixed(2);
    document.getElementById("doubleCost").innerText = "Rs." + doubleCost.toFixed(2);
    document.getElementById("tripleCost").innerText = "Rs." + tripleCost.toFixed(2);
    document.getElementById("numAdultsCost").innerText = numAdults;
    document.getElementById("numChildrenCost").innerText = numChildren;
    document.getElementById("numChildrenAbove5Cost").innerText = numChildrenAbove5;
    document.getElementById("extraBedsCost").innerText = "Rs." + extraBedsCost.toFixed(2);
    document.getElementById("kidsAbove5Cost").innerText = "Rs." + kidsAbove5CostTotal.toFixed(2);
    document.getElementById('roomView').innerText = viewType + " View";
    if (requirements.length > 0) {
        document.getElementById('otherRequirementsCost').innerText = requirements.join(", ") + " selected";
    } else {
        document.getElementById('otherRequirementsCost').innerText = "No Requirements";
    }
    document.getElementById("totalCost").innerText = "Rs." + totalCost.toFixed(2);

}

function calculateNumOfDays(checkin, checkout) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds yayyyy me smart
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    const diffDays = Math.round(Math.abs((checkinDate - checkoutDate) / oneDay));

    return diffDays;
}



// Attach event listeners to input fields
let dateInputs = document.querySelectorAll('input[type="date"]');
dateInputs.forEach(function(input) {
    input.addEventListener('change', updateTable);
});

let numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach(function(input) {
    input.addEventListener('input', updateTable);
    input.addEventListener('change', updateTable);
});




//prmo


function applyPromoCode() {

    event.preventDefault();

   
    let promoCodeInput = document.getElementById("promoCode").value;

    // Check if the entered promo code is valid ("Promo123")
    if (promoCodeInput === "Promo123") {
        // 5% to the total cost
        let totalCostElement = document.getElementById("totalCost");
        let currentTotalCost = parseFloat(totalCostElement.innerText.replace("Rs.", ""));
        let discountedCost = currentTotalCost * 0.95;

        // total cost in the table...updateee
        totalCostElement.innerText = "Rs." + discountedCost.toFixed(2);
    } else {
        // Display an error message or handle invalid promo code
        alert("Invalid promo code. Please enter a valid code.");
    }



let applyButton = document.querySelector('button[onclick="applyPromoCode()"]');
applyButton.addEventListener('click', applyPromoCode);
}





//ADVENTUREEEEEE BOOOKINGGG//function updateTable() {
    // Get input values
    //diving for Sri Lankan Adults = 5000
    //diving for Sri lankan Children = 2000
    //diving for other Adults = 10000
    //diving for other Children = 5000

    //this should show on the table while table is being filled so 
    //if nationality ==Sri Lankan:
    //diving for Sri Lankan Adults = 5000
    ///diving for Sri lankan Children = 2000

    ///if nationality == other:
    //diving for other Adults = 10000
    //diving for other Children = 5000//

    function updateAdventureTable() {
        let numDivingAdults = parseInt(document.getElementById("numDivingAdults").value) || 0;
        let numDivingChildren = parseInt(document.getElementById("numDivingChildren").value) || 0;
        let needGuide = document.getElementById("needGuide").value;
        let needGuideChild = document.getElementById("needGuideChild").value;
        let nationality = document.getElementById("nationality").value;
        let numDivingHours = parseInt(document.getElementById("numDivingHours").value) || 1;

        // Initial Diving Costs before guides and such
        let initialDivingCostSriLankanAdults = 5000;
        let initialDivingCostSriLankanChildren = 2000;
        let initialDivingCostOtherAdults = 10000;
        let initialDivingCostOtherChildren = 5000;
    
        // Set initial diving costs based on nationality...racistt but valid?
        document.getElementById("initialDivingCostSriLankanAdults").innerText = "Rs. " + initialDivingCostSriLankanAdults.toFixed(2);
        document.getElementById("initialDivingCostSriLankanChildren").innerText = "Rs. " + initialDivingCostSriLankanChildren.toFixed(2);
        document.getElementById("initialDivingCostOtherAdults").innerText = "Rs. " + initialDivingCostOtherAdults.toFixed(2);
        document.getElementById("initialDivingCostOtherChildren").innerText = "Rs. " + initialDivingCostOtherChildren.toFixed(2);
        document.getElementById("totalCostAv").innerText = "Rs. 0.00";
    
        // Diving Costs
        let divingAdultCost = 0;
        let divingChildrenCost = 0;
    
        if (nationality === 'sriLankan') {
            divingAdultCost = initialDivingCostSriLankanAdults;
            divingChildrenCost = initialDivingCostSriLankanChildren;
        } else if (nationality === 'other') {
            divingAdultCost = initialDivingCostOtherAdults;
            divingChildrenCost = initialDivingCostOtherChildren;
        }
    
        let numDivingAdultsCost = numDivingAdults * divingAdultCost * numDivingHours;
        let numDivingChildrenCost = numDivingChildren * divingChildrenCost * numDivingHours;
    
        // Guide Charges
        let guideCharge = needGuide === 'yes' ? 1000 : 0;
        let guideChargeChild = needGuideChild === 'yes' ? 500 : 0;
        let totalCostAv = numDivingAdultsCost + numDivingChildrenCost + guideCharge + guideChargeChild;
    
        // Update the adventure table
        document.getElementById("numDivingAdultsCost").innerText = "Rs. " + numDivingAdultsCost.toFixed(2);
        document.getElementById("numDivingChildrenCost").innerText = "Rs. " + numDivingChildrenCost.toFixed(2);
        document.getElementById("guideCharges").innerText = "Rs. " + guideCharge.toFixed(2);
        document.getElementById("guideChargesChild").innerText = "Rs. " + guideChargeChild.toFixed(2);
    
        document.getElementById("totalCostAv").innerText = "Rs. " + totalCostAv.toFixed(2);
    
       

    }

    
    
    // Attach event listeners to adventure form fields
    let adventureInputs = document.querySelectorAll('#adventureBookingForm input, #adventureBookingForm select');
    adventureInputs.forEach(function (input) {
        input.addEventListener('input', updateAdventureTable);
    });
    
    
    updateAdventureTable();
    

    //LOYALTY

 
    function checkLoyalty() {
        
        var numSingleRooms = parseInt(document.getElementById("numSingleRooms").value);
        var numDoubleRooms = parseInt(document.getElementById("numDoubleRooms").value);
        var numTripleRooms = parseInt(document.getElementById("numTripleRooms").value);

       
        var totalRooms = numSingleRooms + numDoubleRooms + numTripleRooms;

        // (20 points per room for bookings of more than 3 rooms)
        var loyaltyPoints = totalRooms > 3 ? 20 * totalRooms : 0;

        
        document.getElementById("loyaltyPointsDisplay").textContent = "Earned Loyalty Points: " + loyaltyPoints;

        // Storinggg loyalty points in local storage
        localStorage.setItem("loyaltyPoints", loyaltyPoints);
    }













    //FAvorites buttonnnn

document.addEventListener('DOMContentLoaded', function () {
        
        let addToFavoritesBtn = document.getElementById('favbtn');
        let table = document.getElementById('currentRoomBookings');

        // Add click event listener to the "Add to Favorites" button
        addToFavoritesBtn.addEventListener('click', function () {
            // Create an object to store the details
            let favoritesDetails = {
                duration: document.getElementById('duration').textContent, 
                checkinDate: document.getElementById('checkinDate').textContent,
                checkoutDate: document.getElementById('checkoutDate').textContent,
                singleCost: document.getElementById('singleCost').textContent,
                doubleCost: document.getElementById('doubleCost').textContent,
                tripleCost: document.getElementById('tripleCost').textContent,
                numAdultsCost: document.getElementById('numAdultsCost').textContent,
                numChildrenCost: document.getElementById('numChildrenCost').textContent,
                numChildrenAbove5Cost: document.getElementById('numChildrenAbove5Cost').textContent,
                extraBedsCost: document.getElementById('extraBedsCost').textContent,
                kidsAbove5Cost: document.getElementById('kidsAbove5Cost').textContent,
                roomView: document.getElementById('roomView').textContent,
                otherRequirementsCost: document.getElementById('otherRequirementsCost').textContent,
                promoApplied: document.getElementById('promoApplied').textContent,
                totalCost: document.getElementById('totalCost').textContent
            };

            // Convert the object to a JSON stringgggg
            let favoritesDetailsJSON = JSON.stringify(favoritesDetails);

            // Save the JSON string to local storage, overwriting any existing favorite already theree
            localStorage.setItem('favoritesDetails', favoritesDetailsJSON);

            // Alert user that the details have been added to favorites
            alert('Your details have been added to favorites!');
        });
    });



    ///***********************************Overall booking summary */
    // Overall Booking Summary
    


    let bookingCounter = 1; // Counter to keep track of the number of bookings so we can make multiplee

function bookNow() {
    // Get the values from the existing table
   
    let checkinDate = document.getElementById("checkinDate").textContent;
    let checkoutDate = document.getElementById("checkoutDate").textContent;
    let singleCost = document.getElementById("singleCost").textContent;
    let doubleCost = document.getElementById("doubleCost").textContent;
    let tripleCost = document.getElementById("tripleCost").textContent;
    let extraBedsCost = document.getElementById("extraBedsCost").textContent;
    let kidsAbove5Cost = document.getElementById("kidsAbove5Cost").textContent;
    let roomView = document.getElementById("roomView").textContent;
    let otherRequirementsCost = document.getElementById("otherRequirementsCost").textContent;
    let promoApplied = document.getElementById("promoApplied").textContent;
    let totalCost = document.getElementById("totalCost").textContent;

    // Create a new table row with the extracted details everytome
    let newRow = "<tr>";
    newRow += "<td>" + bookingCounter + "</td>";
    
    newRow += "<td>" + checkinDate + "</td>";
    newRow += "<td>" + checkoutDate + "</td>";
    newRow += "<td>" + singleCost + "</td>";
    newRow += "<td>" + doubleCost + "</td>";
    newRow += "<td>" + tripleCost + "</td>";
    newRow += "<td>" + extraBedsCost + "</td>";
    newRow += "<td>" + kidsAbove5Cost + "</td>";
    newRow += "<td>" + roomView + "</td>";
    newRow += "<td>" + otherRequirementsCost + "</td>";
    newRow += "<td>" + promoApplied + "</td>";
    newRow += "<td>" + totalCost + "</td>";
    newRow += "</tr>";

    // Append the new row to the existing table
    document.getElementById("overallBookingTableBody").innerHTML += newRow;

    // Increment the booking counter for the next booking
    bookingCounter++;

    // Reset the current booking details
    resetBookingDetails();
}

function resetBookingDetails() {
    document.getElementById("duration").textContent = "0";
    document.getElementById("checkinDate").textContent = "-";
    document.getElementById("checkoutDate").textContent = "-";
    document.getElementById("singleCost").textContent = "Rs.0.00";
    document.getElementById("doubleCost").textContent = "Rs.0.00";
    document.getElementById("tripleCost").textContent = "Rs.0.00";
    document.getElementById("numAdultsCost").textContent = "0";
    document.getElementById("extraBedsCost").textContent = "Rs. 0.00";
    document.getElementById("kidsAbove5Cost").textContent = "Rs.0.00";
    document.getElementById("roomView").textContent = "View Not Selected";
    document.getElementById("otherRequirementsCost").textContent = "No Requirements";
    document.getElementById("promoApplied").textContent = "No";
    document.getElementById("totalCost").textContent = "Rs. 0.00";


    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
    document.getElementById("numSingleRooms").value = "";
    document.getElementById("numDoubleRooms").value = "";
    document.getElementById("numTripleRooms").value = "";
    document.getElementById("numAdults").value = "";
    document.getElementById("numChildren").value = "";
    document.getElementById("beds").value = "";
    document.getElementById("numChildrenAbove5").value = "";
    document.getElementById("viewType").value = "pool"; 
    document.getElementById("wifiCheckbox").checked = false;
    document.getElementById("tvCheckbox").checked = false;
    document.getElementById("fridgeCheckbox").checked = false;
    document.getElementById("bathtubCheckbox").checked = false;
}



/*Book adventuresssssssssssssssssss*/////////////

function displayBookingDetails() {
    // Get the relevant elements from the table
    var date = document.getElementById("Date").innerText;
    var numDivingAdultsCost = document.getElementById("numDivingAdultsCost").innerText;
    var numDivingChildrenCost = document.getElementById("numDivingChildrenCost").innerText;
    var guideCharges = document.getElementById("guideCharges").innerText;
    var guideChargesChild = document.getElementById("guideChargesChild").innerText;
    var totalCostAv = document.getElementById("totalCostAv").innerText;

    // Create a message with the details
    var message = "Thank you for booking!\n\n";
    message += "Date: " + date + "\n";
    message += "Number of Diving Adults Cost: " + numDivingAdultsCost + "\n";
    message += "Number of Diving Children Cost: " + numDivingChildrenCost + "\n";
    message += "Guide Charges: " + guideCharges + "\n";
    message += "Guide Charges (For Children): " + guideChargesChild + "\n";
    message += "Total Cost: " + totalCostAv + "\n";

    // Display the message to the user
    alert(message);

    location.reload();

}

// Add an event listener to the "BOOK ADVENTURES" button
document.getElementById("advbtn").addEventListener("click", displayBookingDetails);