// Import necessary modules
const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { until } = require("selenium-webdriver");

async function test_case() {
    // Set Chrome options
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('disable-gpu')
    options.setChromeBinaryPath('/usr/bin/google-chrome');

    // Create a Driver
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        // Send driver to website
        await driver.get("https://testing-replica-a66a5.web.app/");

        // Fill in form fields
        await driver.findElement(By.id("lastname")).sendKeys("Voloshyn");
        await driver.findElement(By.id("firstname")).sendKeys("Bohdan");
        await driver.findElement(By.css("td > p:nth-child(4)")).click();
        await driver.findElement(By.id("GroupSize")).sendKeys("10");
        await driver.findElement(By.id("addMemberBtn")).click();

        // Wait for the select element to be populated with members
        let countMembers = await driver.wait(until.elementsLocated(By.css("#members option")), 20000);

        if (countMembers.length > 0) {
            console.log('Test Success');
        } else {
            console.log('Test Failed');
        }
    } catch (error) {
        console.log('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}

test_case();
