const quotation = {
    'USD': 254,
    'EUR': 263.47
}

const inputData = []

const showLoader = () => {
    return `
    <div class="spinner-border text-primary d-block m-auto mb-2" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`
}

document.querySelector("#amount").addEventListener('input', (e) => {
    const amount = e.target.value;

    if (amount < 0) {
        e.target.value = 0
        document.querySelector("#currency-amount-usd").innerText = "0.000"
        document.querySelector("#currency-amount-eur").innerText = "0.000"
    }

    document.querySelector("#currency-amount-usd").innerText = (amount / quotation.USD).toFixed(3)
    document.querySelector("#currency-amount-eur").innerText = (amount / quotation.EUR).toFixed(3)
})

const showMessage = (message, type = 'danger') => {

    return `
    <div class='alert alert-${type} alert-dismissible fade show' role='alert'>
        <small>${message}</small>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
}

document.querySelector(".formMessage").addEventListener('submit', (e) => {
    e.preventDefault()
    const $statusMessage = document.querySelector("#statusMessage")
    $statusMessage.innerHTML = showLoader()

    const $inputName = document.querySelector("#name");
    const $inputEmail = document.querySelector("#email");
    const $inputPhone = document.querySelector("#phone");
    const $inputAmount = document.querySelector("#amount");
    const $inputMessage = document.querySelector("#message");

    //Validaciones
    if (!isNaN($inputName.value)) {
        $statusMessage.innerHTML = showMessage('El nombre ingresado es inválido')
        return
    }

    if ($inputAmount.value <= 0) {
        $statusMessage.innerHTML = showMessage('El sueldo minimo no puede ser menor o igual a cero')
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test($inputEmail.value)) {
        $statusMessage.innerHTML = showMessage('El email ingresado es inválido')
        return
    }

    if (isNaN($inputPhone.value)) {
        $statusMessage.innerHTML = showMessage('El télefono ingresado es inválido')
        return
    }

    if ($inputPhone.value.length < 10 || $inputPhone.value.length > 14) {
        $statusMessage.innerHTML = showMessage('El télefono debe tener entre 10 y 14 dígitos')
        return
    }

    inputData.push({
        name: $inputName.value,
        email: $inputEmail.value,
        phone: $inputPhone.value,
        amount: $inputAmount.value,
        message: $inputMessage.value
    })

    $statusMessage.innerHTML = showMessage('Agregado correctamente', 'success')

    orderArray(document.querySelector("#selectOrder").value)

    renderData()
    clearInputData()
})

const clearInputData = () => {
    document.querySelector("#name").value = ""
    document.querySelector("#email").value = ""
    document.querySelector("#phone").value = ""
    document.querySelector("#amount").value = ""
    document.querySelector("#message").value = ""
    document.querySelector("#currency-amount-usd").innerText = "0.000"
    document.querySelector("#currency-amount-eur").innerText = "0.000"
}


const renderData = () => {
    const $bodyTable = document.querySelector("#bodyTable")
    let rowsTable = "";

    inputData.map((data) => {
        rowsTable += `
        <tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.amount}</td>
            <td>${(data.amount / quotation.USD).toFixed(3)}</td>
            <td>${(data.amount / quotation.EUR).toFixed(3)}</td>
            <td>${data.message}</td>
        </tr>
        `
    })

    $bodyTable.innerHTML = rowsTable
}

const orderArray = (key) => {
    if (key == "amount") {
        inputData.sort((a, b) => {
            return b[key] - a[key]
        })
    } else {
        inputData.sort((a, b) => {
            const valueA = a[key].toUpperCase()
            const valueB = b[key].toUpperCase()

            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0
        })
    }
}

document.querySelector("#selectOrder").addEventListener('change', (e) => {
    orderArray(e.target.value)
    renderData()
})

