const formElement = document.querySelector("form");
const inputElements = document.querySelectorAll("input");

const validators = {
    notEmpty: (value) => value.length > 0,
    zipCode: (value) => value.match(/^[0-9]{5}$/),
    email: (value) =>
        value.match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        ),
};

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;
    inputElements.forEach((element) => {
        if (!validateElement(element)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // submit your valid form here
        console.log("Form is valid");
    }
});

function validateElement(element) {
    const validatorName = element.dataset.validate || "";
    if (validatorName === "") return true;

    const validatorFunction = validators[validatorName];
    const isValid = validatorFunction(element.value);
    const errorElement = document.querySelector(`.error[name=${element.id}]`);

    if (isValid) {
        errorElement.classList.add("hidden");
    } else {
        errorElement.classList.remove("hidden");
    }

    return isValid;
}

inputElements.forEach((element) => {
    element.addEventListener("focusout", () => validateElement(element));
});
