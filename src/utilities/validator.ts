import Joi from "joi";

// helper func to check if client is  >= 18
const isOlderThan18 = (value: Date) : boolean => {
    const today = new Date();
    const age = today.getFullYear() - value.getFullYear();
    console.log(`The client is ${age} years old.`);
    
    // Check if age is 18 or older
    return age >= 18;
}

const clientSchemaValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com'] }
    }).required(),
    dateOfBirth: Joi.date()
        .required()
        .custom((value, helpers) => {
            if (!isOlderThan18(value)) {
                return helpers.error('any.invalid', {message : "Client must be atleast 18 years old."})
            }
            return value;
        }),
    address: Joi.string().required()
});

export default clientSchemaValidator;