import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('ทดสอบสุ่มกรอกฟอร์ม RSVP จำนวน 1 ครั้ง', async ({ page }) => {
  test.setTimeout(90000);

  // === Handle alert dialog (จาก form validation) ===
  page.on('dialog', async (dialog) => {
    console.log(`⚠️ Alert: ${dialog.message()}`);
    await dialog.accept();
  });

  // 1. ไปหน้าแรก
  await page.goto('/');
  await page.screenshot({ path: 'test-results/01-homepage.png' });

  // คลิกซองจดหมาย
  await page.getByText(/Tap anywhere to open/i).click({ force: true });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'test-results/02-after-envelope.png' });

  // เลื่อนลงมาที่ส่วน RSVP
  await page.locator('#rsvp').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // สุ่มข้อมูล
  const fakeNickname = faker.person.firstName();
  const fakePhone = faker.phone.number({ style: 'national' });
  // กำหนดตายตัวก่อน attending = YES เพื่อ debug ง่ายขึ้น
  const attending = true;
  const dietaryItems = ['None', 'Vegetarian', 'Vegan', 'Gluten-Free'];
  const randomDiet = faker.helpers.arrayElement(dietaryItems);

  console.log(`Nickname: ${fakeNickname}, Phone: ${fakePhone}`);

  // 2. เลือก Joyfully Attend
  await page.locator('label').filter({ hasText: /(Joyfully Attend|ยินดีเข้าร่วมงาน)/i }).click();
  await page.waitForTimeout(1000);

  // กรอก Nickname
  await page.locator('input[type="text"]').first().fill(fakeNickname);
  // กรอกเบอร์โทร
  await page.locator('input[type="tel"]').first().fill(fakePhone);
  await page.waitForTimeout(1000);

  // เลือก Dietary
  await page.locator('textarea').first().scrollIntoViewIfNeeded();
  await page.locator('textarea').first().fill(randomDiet);

  // เลือก Book by Self (ง่ายที่สุด ไม่ต้องกรอกเพิ่ม)
  const bookSelf = page.locator('label').filter({ hasText: /(Book by Self|จองด้วยตนเอง)/i });
  await bookSelf.scrollIntoViewIfNeeded();
  await bookSelf.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-results/03-form-filled.png' });

  // 3. กดปุ่ม Submit
  const submitBtn = page.locator('button[type="submit"]');
  await submitBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await submitBtn.click();
  console.log('✅ Submit button clicked');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-results/04-after-submit.png' });

  // 4. รอ Ticket Modal โผล่ขึ้นมา
  await page.locator('text=RSVP Summary').waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ Ticket Modal is visible');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'test-results/05-ticket-modal.png' });

  // 5. เลื่อน Slide เพื่อยืนยัน (Slide to Submit)
  await page.waitForFunction(
    () => typeof window.__PLAYWRIGHT_TICKET_CONFIRM === 'function',
    { timeout: 5000 }
  );
  await page.evaluate(() => window.__PLAYWRIGHT_TICKET_CONFIRM());
  console.log('✅ TicketModal confirm triggered via Playwright hook');

  // 6. รอหน้า Thank You และข้อความยืนยันการส่ง RSVP
  const thankYouHeading = page.getByText('Thank You!');
  const successText = page.getByText('We have successfully received your RSVP. See you there!');

  await expect(thankYouHeading).toBeVisible({ timeout: 40000 });
  await expect(successText).toBeVisible({ timeout: 40000 });
  await page.screenshot({ path: 'test-results/06-thank-you.png' });

  console.log('🎉 RSVP fully submitted and Thank You page visible.');
});
