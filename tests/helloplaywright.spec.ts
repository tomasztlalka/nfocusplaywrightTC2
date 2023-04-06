import { test, expect } from '@playwright/test';

test.use({
    viewport: {
        height: 1080,
        width: 1920
    }
})


test('orderNumber', async({page})=>{
    test.setTimeout(20 * 1000);
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/');

    
    await page.locator('#menu-item-46 > a').click();
    await page.locator('#username').fill('tomasz.tlalka@nfocus.co.uk');
    await page.locator('#password').fill('Edgewords420Training');
    await page.locator('#customer_login > div.u-column1.col-1 > form > p:nth-child(3) > button').click();

    await page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Cap Sale! £16.00' }).click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('#menu-item-44').getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('link', { name: 'Dismiss' }).click();
    await page.getByRole('link', { name: 'Proceed to checkout' }).click();

    
    await page.locator('#billing_first_name').fill('John'); 
    await page.locator('#billing_last_name').fill('Smith');
    await page.getByRole('textbox', { name: 'Street address *' }).fill('London Road');
    await page.getByRole('textbox', { name: 'Town / City *' }).fill('London');
    await page.getByRole('textbox', { name: 'Postcode *' }).fill('LD166GB');
    await page.getByLabel('Phone *').fill('07544544540');
    await page.getByRole('button', { name: 'Place order' }).click();

    const orderNumAtCheckout = '#' + await page.locator('#post-6 > div > div > div > ul > li.woocommerce-order-overview__order.order > strong').textContent();
  
    await page.getByRole('navigation', { name: 'breadcrumbs' }).click();
    await page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click();
    await page.getByRole('link', { name: ' Orders' }).click(); 

    const orderNumFromHistory = await page.locator('#post-7 > div > div > div > table > tbody > tr:nth-child(1) > td.woocommerce-orders-table__cell.woocommerce-orders-table__cell-order-number > a').textContent();
    
    expect(orderNumFromHistory).toContain(orderNumAtCheckout);
})