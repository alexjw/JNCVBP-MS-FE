import { gql } from "apollo-boost";

const allFieldsFragment = gql`
    fragment dutyAllFields on Duty {
        _id, name, isDeletable, description
    }
`;

export const GET_DUTIES = gql`
    query getDuties {
        duties {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const FIND_DUTY = gql`
    query findDuty($_id: String!) {
        duty(_id: $_id) {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const EDIT_DUTY = gql`
    mutation editDuty($_id: String!, $name: String!, $isDeletable: Boolean, $description: String){
        editDuty(_id: $_id, name: $name, description: $description) {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const CREATE_DUTY = gql`
    mutation createDuty($input: CreateDutyInput!) {
        createDuty(createDutyInput: $input) {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const DELETE_DUTY = gql`
    mutation deleteDuty($_id: String!) {
        deleteDuty(_id: $_id)
    }
`;
