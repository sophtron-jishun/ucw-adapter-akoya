import { expect, test } from "@playwright/test";

test("connects to mikomo bank with oAuth", async ({ page }) => {
  test.setTimeout(240000);

  const userId = crypto.randomUUID();

  await page.goto(
    `http://localhost:8080/widget?job_type=aggregate&user_id=${userId}`,
  );

  await page.getByPlaceholder("Search").fill("Mikomo Bank");

  await page.getByLabel("Add account with Mikomo Bank").click();

  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Continue" }).click();

  const authorizeTab = await popupPromise;

  await authorizeTab.locator("input[type='text']").fill('mikomo_1');
  await authorizeTab.locator("input[type='password']").fill('mikomo_1');
  await authorizeTab.locator("button[type='submit']").click();

  await expect(
    authorizeTab.locator("div.terms-disclaimer"),
  ).toBeVisible();

  await authorizeTab.locator("button[value='#accounts']" ).click();

  await expect(
    authorizeTab.locator("button[id='accounts-approve']"),
  ).toBeVisible();

    
  await authorizeTab.locator("label.form-check-label").last().click();
  await authorizeTab.locator("button[id='accounts-approve']").click();

  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible({
    timeout: 120000,
  });

  const apiRequest = page.context().request;
  await apiRequest.delete(
    `http://localhost:8080/api/aggregator/akoya_sandbox/user/${userId}`,
  );
});
