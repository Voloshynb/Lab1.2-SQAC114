const { By, Key, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function test_case() {

    //Set Chrome option
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('disable-gpu')
    options.setChromeBinaryPath('/usr/bin/google-chrome');

    // Create a Driver
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        //Send driver to website
        await driver.get("https://devops-proj-testing.web.app/");

        //Grab an element from the page
        await driver.findElement(By.id("lastname")).click()
        // 4 | type | id=lastname | valencia
        await driver.findElement(By.id("lastname")).sendKeys("valencia")
        // 5 | click | id=firstname | 
        await driver.findElement(By.id("firstname")).click()
        // 6 | type | id=firstname | washington
        await driver.findElement(By.id("firstname")).sendKeys("washington")
        // 7 | click | css=td > p:nth-child(4) | 
        await driver.findElement(By.css("td > p:nth-child(4)")).click()
        // 8 | type | id=GroupSize | 10
        await driver.findElement(By.id("GroupSize")).sendKeys("10")
        // 9 | click | id=addMemberBtn | 
        await driver.findElement(By.id("addMemberBtn")).click()

        //Check the result

        let countMembers = len(WebDriverWait(driver, 20).until(EC.visibility_of_all_elements_located((By.XPATH, "//select[@id='members']//option"))))

        if (countMembers > 0) {
            console.log('Test Success');
        } else {
            console.log('Test Failed');
        }
    } catch (error) {
        console.log('An error accurred:', error);
    } finally {
        await driver.quit();
    }

}
test_case();