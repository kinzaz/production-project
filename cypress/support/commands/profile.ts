export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('ProfilePageHeader.EditButton').click();
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
    cy.getByTestId('ProfileCard.lastname');
    cy.getByTestId('ProfilePageHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: 'http://localhost:8000/profile/' + profileId,
        headers: { authorization: 'qwda' },
        body: {
            id: '4',
            first: 'admin',
            lastname: 'test',
            age: 22,
            currency: 'RUB',
            country: 'Россия',
            city: 'Москва',
            username: 'test',
            avatar: 'https://sun9-24.userapi.com/impf/c638124/v638124331/19985/whWFLRGBfew.jpg?size=320x213&quality=96&sign=f3e3461decc86ce12bfdfee3b7818147&c_uniq_tag=Z-F1txANKlGWsvRS-2klu0jpYjBIrh5TQ478MQ7rFYs&type=album',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
