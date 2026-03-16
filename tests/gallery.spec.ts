import { test, expect } from "@playwright/test";

test.describe("Gallery Slideshow", () => {
  test("should display gallery slideshow with navigation", async ({ page }) => {
    await page.goto("http://localhost:3000/pt");

    const slideshow = page.locator('[class*="aspect-"]').first();
    await expect(slideshow).toBeVisible();

    const prevButton = page.getByLabel("Previous image");
    await expect(prevButton).toBeVisible();

    const nextButton = page.getByLabel("Next image");
    await expect(nextButton).toBeVisible();

    const dots = page.locator('[class*="rounded-full"]').filter({ hasText: "" }).first();
    await expect(dots).toBeVisible();

    const counter = page.locator("text=/\\d{2} \\/ \\d{2}/");
    await expect(counter).toBeVisible();
  });

  test("should navigate between slides", async ({ page }) => {
    await page.goto("http://localhost:3000/pt");

    const counter = page.locator("text=/\\d{2} \\/ \\d{2}/");
    await expect(counter).toContainText("01 / 23");

    const nextButton = page.getByLabel("Next image");
    await nextButton.click();

    await expect(counter).toContainText("02 / 23");

    const prevButton = page.getByLabel("Previous image");
    await prevButton.click();

    await expect(counter).toContainText("01 / 23");
  });
});