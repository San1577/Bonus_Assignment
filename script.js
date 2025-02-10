const form = {
    initial: document.getElementById('initial'),
    monthly: document.getElementById('monthly'),
    years: document.getElementById('years'),
    interest: document.getElementById('interest'),
    calculateBtn: document.getElementById('calculateBtn'),
    results: document.getElementById('results'),
    resultBody: document.getElementById('resultBody')
};

function validateInput(value, min = 0) {
    return value >= min && !isNaN(value);
}

function formatMoney(amount) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

function calculateInvestment() {
    const initial = parseFloat(form.initial.value);
    const monthly = parseFloat(form.monthly.value);
    const years = parseInt(form.years.value);
    const interest = parseFloat(form.interest.value);

    if (!validateInput(initial) || !validateInput(monthly) || 
        !validateInput(years, 1) || !validateInput(interest)) {
        alert('Please enter valid values for all fields');
        return;
    }

    form.resultBody.innerHTML = '';
    
    let currentValue = initial;
    let totalContributions = initial;
    
    for (let year = 0; year <= years; year++) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>Year ${year}</td>
            <td>${formatMoney(currentValue)}</td>
            <td>${formatMoney(totalContributions)}</td>
        `;
        
        form.resultBody.appendChild(row);

        if (year < years) {
            currentValue = (currentValue + (monthly * 12)) * (1 + interest / 100);
            totalContributions = totalContributions + (monthly * 12);
        }
    }

    form.results.style.display = 'block';
}

form.calculateBtn.addEventListener('click', calculateInvestment);
