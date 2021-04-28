import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
    Key,
  } from "selenium-webdriver";
  const chromedriver = require("chromedriver");

  const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  const header: By = By.name("hdrHeader");
  const submitButton: By = By.id("saveBtn");
  const error: By = By.id("errorList");

  describe("Header Count", () => {
    beforeEach(async () => {
      await driver.get(
        "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html"
      );
    });
    afterAll(async () => {
      await driver.quit();
    });
    test("shows an error message for an empty header field", async () => {
    await driver.findElement(header).click();
    await driver.wait(
      until.elementIsVisible(await driver.findElement(header))
    );
    await driver.findElement(header).clear();
    await driver.findElement(header).sendKeys(Key.SPACE, Key.BACK_SPACE);
    await driver.findElement(submitButton).click();
    await driver.wait(until.elementLocated(error));
    expect(await (await driver.findElement(error)).getText()).toBe(
      "The name field must be between 9 and 19 characters long."
    );
    /**https://dmutah.atlassian.net/browse/Q12DL-31 */
    });
