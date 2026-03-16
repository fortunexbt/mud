import { test, expect } from "@playwright/test";

test.describe("Gallery Slideshow", () => {
  test("should display gallery slideshow with navigation", async ({ page }) => {
    await page.goto("http://localhost:3000/pt");

    const gallerySection = page.locator("section").filter({ hasText: "Galeria" }).first();
    await expect(gallerySection).toBeVisible();

    const slideshow = gallerySection.locator('[class*="aspect-"]');
    await expect(slideshow).toBeVisible();

    const prevButton = page.getByLabel("Previous image");
    await expect(prevButton).toBeVisible();

    const nextButton = page.getByLabel("Next image");
    await expect(nextButton).toBeVisible();
  });

  test("should navigate between slides", async ({ page }) => {
    await page.goto("http://localhost:3000/pt");

    const gallerySection = page.locator("section").filter({ hasText: "Galeria" }).first();
    const slideshow = gallerySection.locator('[class*="aspect-"]');

    const counter = slideshow.locator(".tabular-nums").first();
    await expect(counter).toContainText("01");

    const nextButton = page.getByLabel("Next image");
    await nextButton.click();

    await expect(counter).toContainText("02");

    const prevButton = page.getByLabel("Previous image");
    await prevButton.click();

    await expect(counter).toContainText("01");
  });
});