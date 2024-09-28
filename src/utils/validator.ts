import Joi from "joi";
import { CustomHelpers } from "joi";
import { isValid, differenceInYears } from "date-fns";

import { policyTypeEnum } from "../data/data";

// helper func to check if client is  >= 18
const isOlderThan18 = (value: Date) : boolean => {
    // check if DOB is a valid date
    if (!isValid(value)) {
        return false;
    }

    // calculate age
    const age = differenceInYears(new Date(), value);
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
        .custom((value : Date, helpers : CustomHelpers) => {
            console.log(value);
            
            // Check if the date is valid 
            if (!isValid(value)) {
                return helpers.error('any.invalid', { message: 'Invalid date format.' });
            }
            
            // Check if the client is older than 18
            if (!isOlderThan18(value)) {
                return helpers.error('any.invalid', { message: 'Client must be at least 18 years old.' });
            }
            
            return value;
        }),
    address: Joi.string().required()
});


const policySchemaValidator = Joi.object({
    clientId: Joi.string().required(),
    policyType: Joi.string().valid(...Object.values(policyTypeEnum)).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    premiumAmount: Joi.number().positive().required(),
    coverageAmount: Joi.number().positive().required(),
});

const submitClaimSchemaValidator = Joi.object({
    policyNumber: Joi.string().required(),
    claimAmount: Joi.number().positive().required(),
    description : Joi.string().required()
});


export { clientSchemaValidator, policySchemaValidator, submitClaimSchemaValidator };