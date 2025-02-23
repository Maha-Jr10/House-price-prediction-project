function getBathValue() {
    let uiBathrooms = document.getElementsByName("uiBathrooms");
    for (let i of uiBathrooms) {
        if (i.checked) return parseInt(i.value);
    }
    return -1;
}

function getBHKValue() {
    let uiBHK = document.getElementsByName("uiBHK");
    for (let i of uiBHK) {
        if (i.checked) return parseInt(i.value);
    }
    return -1;
}

function onClickedEstimatePrice() {
    let sqft = parseFloat(document.getElementById("uiSqft").value);
    let bhk = getBHKValue();
    let bathrooms = getBathValue();
    let location = document.getElementById("uiLocations").value;
    let estPrice = document.getElementById("uiEstimatedPrice");

    let url = "http://127.0.0.1:5000/predict_home_price";

    if (isNaN(sqft) || location === "") {
        alert("Please enter valid inputs");
        return;
    }

    $.post(url, {
        total_sqft: sqft,
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function (data) {
        estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
    });
}

function onPageLoad() {
    let url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function (data) {
        if (data) {
            let locations = data.locations;
            let uiLocations = document.getElementById("uiLocations");
            $(`#uiLocations`).empty();
            for (let loc of locations) {
                let opt = new Option(loc);
                $(uiLocations).append(opt);
            }
        }
    });
}

window.onload = onPageLoad;

