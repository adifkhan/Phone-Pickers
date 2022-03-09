const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const error = document.getElementById('error');
    if (searchText == '') {
        error.style.display = 'block';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
        error.style.display = 'none';
    }
    searchField.value = '';
}

const displaySearchResult = phones => {
    const showMoreButton = document.getElementById('show-more-btn');
    if (phones[0] == null) {
        const error = document.getElementById('error');
        error.style.display = 'block';
    }
    else if (phones.length > 20) {
        phones.length = 20;
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 back-color">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text fw-bold">${phone.brand}</p>
            </div>
            <button id="more-btn" type="button" class="btn btn-primary w-50 mx-auto my-2" onclick = "loadPhoneId('${phone.slug}')">More</button>
        </div>
        `;
            searchResult.appendChild(div);
        });
        showMoreButton.style.display = 'block';
    }
    else {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 back-color">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text fw-bold">${phone.brand}</p>
            </div>
            <button id="more-btn" type="button" class="btn btn-primary w-50 mx-auto my-2" onclick = "loadPhoneId('${phone.slug}')">More</button>
        </div>
        `;
            searchResult.appendChild(div);

        });
        showMoreButton.style.display = 'none';
    }
}

const loadPhoneId = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => singlePhoneDetails(data.data))
}

const singlePhoneDetails = phone => {
    const singlePhoneDetails = document.getElementById('single-phone-details');
    singlePhoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p class="card-text"><span class="fw-bold">Sensors: </span>${phone.mainFeatures.sensors}</p>
        <p class="card-text"><span class="fw-bold">Others:</span> </br> USB: ${phone.others.USB}</p>  
    </div>
    `;
    singlePhoneDetails.appendChild(div);
}