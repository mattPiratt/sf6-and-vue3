import {ref} from 'vue';

const isFormValid = ref(true);

const validateForm = (form) => {
    isFormValid.value = true;
    Object.keys(form).forEach((key) => {
        validateOneField(key, form);
    });
    return isFormValid.value;
};

const validateOneField = (fieldName, form) => {
    if (form[fieldName].validator !== null || form[fieldName].validator === undefined) {
        form[fieldName].isValid = form[fieldName].validator(form[fieldName]);
        if (form[fieldName].isValid === false) {
            isFormValid.value = false;
        }
    }
};

export {validateForm, validateOneField};





