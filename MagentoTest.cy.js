/// <reference types="cypress" />
import 'cypress-xpath';

class HomePage {
    static visitHomePage() {
        cy.visit('https://magento.softwaretestingboard.com/');
    }

    static clickTeesCategory() {
        cy.get('#ui-id-4 > .ui-menu-icon').click();
        cy.contains('You can’t have too many tees').click();
    }

    static selectRandomTeeProduct() {
        cy.get('.product-item-link').each(($element, index) => {
            cy.wrap($element).invoke('text').then((TheHeadLine) => {
                if (TheHeadLine.includes('Tee')) {
                    cy.get('.product-item-link').eq(index).click();
                    return false; 
                }
            });
        });
    }
}

describe('Test suite description', () => {
    it('Test case description', () => {
        HomePage.visitHomePage();
        HomePage.clickTeesCategory();
        HomePage.selectRandomTeeProduct();

        cy.get('.size').then(($els) => {
            const sizeElements = $els.toArray();
            const randomIndex = Math.floor(Math.random() * sizeElements.length);
            const randomSizeElement = sizeElements[randomIndex];
            cy.wrap(randomSizeElement).click();
        });

        cy.xpath('//div[@class="swatch-attribute color"]/div/div').then(($color) => {
            const colorElements = $color.toArray();
            const randomIndex = Math.floor(Math.random() * colorElements.length);
            const randomColorElement = colorElements[randomIndex];
            cy.wrap(randomColorElement).click();
        });

        cy.go(-1);
    });
});
