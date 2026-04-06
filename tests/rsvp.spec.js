import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('ทดสอบสุ่มกรอกฟอร์ม RSVP จำนวน 1 ครั้ง', async ({ page }) => {
  // ตั้ง timeout ให้นานขึ้นเผื่อ animation
  test.setTimeout(60000);

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
    console.log(`⚠️ Alert detected: ${dialog.message()}`);
    await dialog.accept();
  });

  // 1. ไปหน้าแรก
  await page.goto('/');

  // คลิกซองจดหมายเพื่อเปิดเข้าไปด้านใน
  await page.getByText(/Tap anywhere to open/i).click({ force: true });
  await page.waitForTimeout(2000); // รอ animation เปิดซอง

  // เลื่อนลงมาที่ส่วน RSVP
  await page.locator('#rsvp').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // สุ่มข้อมูล
  const fakeNickname = faker.person.firstName();
  const fakePhone = faker.phone.number({ style: 'national' });
  const attending = faker.datatype.boolean(); // สุ่มมา (true) หรือ ไม่มา (false)

  // สุ่มเลือกข้อจำกัดอาหาร
  const dietaryItems = ['None', 'Vegetarian', 'Vegan', 'Dairy-Free', 'Nut Allergy', 'Shellfish allergy', 'Halal', 'Gluten-Free'];
  const randomDiet = faker.helpers.arrayElement(dietaryItems);

  console.log(`\n=== RSVP Test Data ===`);
  console.log(`Nickname: ${fakeNickname}`);
  console.log(`Phone: ${fakePhone}`);
  console.log(`Attending: ${attending ? 'YES' : 'NO'}`);
  console.log(`Dietary: ${randomDiet}`);

  // 2. เลือกว่าไป หรือ ไม่ไป
  if (attending) {
    // === กรณี "ยินดีเข้าร่วมงาน" ===
    await page.locator('label').filter({ hasText: /(Joyfully Attend|ยินดีเข้าร่วมงาน)/i }).click();
    await page.waitForTimeout(1000); // รอ FadeInExpand animation

    // กรอก Nickname
    const nicknameInput = page.locator('input[type="text"]').first();
    await nicknameInput.fill(fakeNickname);

    // กรอกเบอร์โทร
    const phoneInput = page.locator('input[type="tel"]').first();
    await phoneInput.fill(fakePhone);

    await page.waitForTimeout(1000); // รอ Extended form โหลด

    // เลือกว่าแพ้อาหารอะไรไหม (textarea ช่องแรกที่เจอ)
    const dietaryTextarea = page.locator('textarea').first();
    await dietaryTextarea.scrollIntoViewIfNeeded();
    await dietaryTextarea.fill(randomDiet);

    // จำลองให้สุ่มจองโรงแรมไหม
    const wantHotel = faker.datatype.boolean();
    console.log(`Want Hotel (Group Rate): ${wantHotel}`);

    if (wantHotel) {
      const groupRateLabel = page.locator('label').filter({ hasText: /(Wait for Group Rate|รอเข้าร่วม Group Rate)/i });
      await groupRateLabel.scrollIntoViewIfNeeded();
      await groupRateLabel.click();
      await page.waitForTimeout(1000); // รอ FadeIn animation

      // กรอกชื่อ นามสกุล ภาษาอังกฤษ (input ที่อยู่หลัง Nickname)
      const allTextInputs = page.locator('input[type="text"]');
      const textInputCount = await allTextInputs.count();
      console.log(`Text input count: ${textInputCount}`);
      if (textInputCount >= 3) {
        // input[0] = nickname, input[1] = firstName, input[2] = lastName
        await allTextInputs.nth(1).scrollIntoViewIfNeeded();
        await allTextInputs.nth(1).fill(faker.person.firstName());
        await allTextInputs.nth(2).fill(faker.person.lastName());
      }

      // เลือกจำนวนห้อง (select ตัวสุดท้ายในฟอร์ม)
      const selects = page.locator('select');
      const selectCount = await selects.count();
      if (selectCount > 0) {
        await selects.last().selectOption({ index: faker.number.int({ min: 0, max: 2 }) });
      }

      // สุ่มเลือกช่วงราคา (Room Range Checkboxes) — ต้องเลือกอย่างน้อย 1 อัน
      const roomCheckboxes = page.locator('input[type="checkbox"]');
      const checkboxCount = await roomCheckboxes.count();
      console.log(`Room checkboxes count: ${checkboxCount}`);
      if (checkboxCount > 0) {
        const howMany = faker.number.int({ min: 1, max: Math.min(2, checkboxCount) });
        for (let i = 0; i < howMany; i++) {
          await roomCheckboxes.nth(i).scrollIntoViewIfNeeded();
          await roomCheckboxes.nth(i).click();
        }
      }

      // ใส่วันที่เช็คอิน-เช็คเอาท์
      const dates = page.locator('input[type="date"]');
      const dateCount = await dates.count();
      console.log(`Date inputs count: ${dateCount}`);
      if (dateCount >= 2) {
        await dates.nth(0).scrollIntoViewIfNeeded();
        await dates.nth(0).fill('2026-12-01');
        await page.waitForTimeout(300);
        await dates.nth(1).fill('2026-12-05');
      }

    } else {
      const bookSelfLabel = page.locator('label').filter({ hasText: /(Book by Self|จองด้วยตนเอง)/i });
      await bookSelfLabel.scrollIntoViewIfNeeded();
      await bookSelfLabel.click();
    }

  } else {
    // === กรณี "ไม่สามารถเข้าร่วมได้" ===
    await page.locator('label').filter({ hasText: /(Declines with Regret|ไม่สามารถเข้าร่วมได้)/i }).click();
    await page.waitForTimeout(1000); // รอ FadeInExpand animation

    // กรอก Nickname (ช่องนี้โชว์ทั้ง yes และ no)
    const nicknameInput = page.locator('input[type="text"]').first();
    await nicknameInput.fill(fakeNickname);

    // กรอกเบอร์โทร
    const phoneInput = page.locator('input[type="tel"]').first();
    await phoneInput.fill(fakePhone);

    await page.waitForTimeout(500);

    // ใส่ข้อความอวยพรบ่าวสาว
    const messageTextarea = page.locator('textarea').first();
    if (await messageTextarea.isVisible().catch(() => false)) {
      await messageTextarea.fill(faker.lorem.paragraph());
    }
  }

  // 3. กดปุ่ม Submit (RSVP)
  const submitBtn = page.locator('button[type="submit"]');
  await submitBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await submitBtn.click();
  console.log('✅ Submit button clicked');

  // 4. เลื่อนสไลด์ยืนยันใน Ticket Modal (Slide to Submit)
  const sliderThumb = page.locator('.cursor-grab').first();
  await sliderThumb.waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ Slider thumb is visible');
  await page.waitForTimeout(800); // รอ modal animation เสร็จ

  // ดึงพิกัดของปุ่มกลมๆ ที่ให้ลาก
  const box = await sliderThumb.boundingBox();
  if (box) {
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    // เอาเมาส์ไปจิ้มตรงกลางปุ่ม แล้วลากไปขวา
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    // ลากแบบค่อยๆ (30 step) เพื่อให้ Framer Motion drag handler รับค่าได้
    for (let i = 1; i <= 30; i++) {
      await page.mouse.move(startX + (i * 10), startY, { steps: 1 });
    }
    await page.waitForTimeout(200);
    await page.mouse.up();
    console.log('✅ Slider dragged');
  } else {
    console.log('❌ Could not get slider bounding box');
  }

  // 5. รอให้เว็บโหลดหน้า Success (Thank You!)
  // RSVPSuccess.jsx แสดงข้อความ "Thank You!" ใน h2
  // ต้องรอนานหน่อยเพราะมี fold animation 600ms + API call + 500ms delay
  await expect(page.getByText('Thank You!')).toBeVisible({ timeout: 20000 });
  console.log('🎉 RSVP submitted successfully!');
});
