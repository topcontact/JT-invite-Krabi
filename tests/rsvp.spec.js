import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('ทดสอบสุ่มกรอกฟอร์ม RSVP จำนวน 1 ครั้ง', async ({ page }) => {
  test.setTimeout(90000);

  // === Mock API: สกัดกั้น request ไปยัง /api/rsvp แล้วตอบ success กลับมาเลย ===
  await page.route('**/api/rsvp', async (route) => {
    console.log('🔵 Intercepted RSVP API call — returning mock success');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ result: 'success' }),
    });
  });

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
  const sliderContainer = page.locator('.cursor-grab').first();
  await sliderContainer.waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ Slider is visible');

  // เลื่อน Slider ให้อยู่ในหน้าจอก่อน
  await sliderContainer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800); // รอ scroll animation เสร็จ
  await page.screenshot({ path: 'test-results/05-modal-scrolled.png' });

  // ดึง bounding box หลัง scroll แล้ว
  const box = await sliderContainer.boundingBox();
  console.log(`Slider box: ${JSON.stringify(box)}`);

  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // ลากสไลเดอร์ช้าๆ ทีละ 5px เพื่อให้ Framer Motion จับ drag event ได้
    await page.mouse.move(cx, cy);
    await page.waitForTimeout(100);
    await page.mouse.down();
    await page.waitForTimeout(100);

    const steps = 60;
    const totalDx = 300;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(cx + (totalDx * i / steps), cy);
      await page.waitForTimeout(16); // ~60fps
    }
    await page.waitForTimeout(300);
    await page.mouse.up();
    console.log('✅ Slider dragged');
  }

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/06-after-drag.png' });

  // 5. รอหน้า Success
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test-results/07-final-state.png' });
  await expect(page.getByText('Thank You!')).toBeVisible({ timeout: 20000 });
  console.log('🎉 RSVP submitted successfully!');
});
