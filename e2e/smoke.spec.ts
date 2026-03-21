import { type Page, expect, test } from "@playwright/test";

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function expectSuccessfulPageLoad(page: Page, path: string) {
  const response = await page.goto(path);

  expect(response?.ok(), `Expected ${path} to return a successful response`).toBeTruthy();
  await expect(page).toHaveURL(new RegExp(`${escapeForRegExp(path)}/?$`));
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
}

test("the home page opens", async ({ page }) => {
  await expectSuccessfulPageLoad(page, "/");
  await expect(page).toHaveTitle(/Matthew Shan/i);
});

test("the blog index opens", async ({ page }) => {
  await expectSuccessfulPageLoad(page, "/blog");
  await expect(page.locator('a[href^="/blog/"]').first()).toBeVisible();
});

test("each blog page linked from the blog index opens", async ({ page }) => {
  await expectSuccessfulPageLoad(page, "/blog");

  const postPaths = await page
    .locator('a[href^="/blog/"]')
    .evaluateAll((links) =>
      Array.from(
        new Set(
          links
            .map((link) => link.getAttribute("href") ?? "")
            .filter((href) => href.startsWith("/blog/") && href !== "/blog/"),
        ),
      ),
    );

  expect(postPaths.length, "Expected at least one blog post link on /blog").toBeGreaterThan(0);

  for (const postPath of postPaths) {
    await expectSuccessfulPageLoad(page, postPath);
    await expect(page.locator("article")).toBeVisible();
  }
});
