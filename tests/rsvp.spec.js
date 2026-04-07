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
  const isAttending = faker.datatype.boolean(); // Randomly True (Yes) or False (No)

  console.log(`Nickname: ${fakeNickname}, Phone: ${fakePhone}, Attending: ${isAttending ? 'Yes' : 'No'}`);

  if (isAttending) {
    // 2a. เลือก Joyfully Attend
    await page.locator('label').filter({ hasText: /(Joyfully Attend|ยินดีเข้าร่วมงาน)/i }).click();
  } else {
    // 2b. เลือก Declines with Regret
    await page.locator('label').filter({ hasText: /(Declines with Regret|ไม่สามารถเข้าร่วมได้)/i }).click();
  }
  await page.waitForTimeout(1000);

  // กรอก Nickname
  await page.locator('input[type="text"]').first().fill(fakeNickname);
  // กรอกเบอร์โทร
  await page.locator('input[type="tel"]').first().fill(fakePhone);
  await page.waitForTimeout(500);

  if (isAttending) {
    // === กรองฟอร์มฝั่งเข้าร่วมงาน (Yes) ===
    
    // สุ่มจำนวนผู้ใหญ่ 1-10 คน
    const adultsCount = faker.number.int({ min: 1, max: 10 }).toString();
    const selects = page.locator('select');
    await selects.first().selectOption(adultsCount);

    // สุ่มจำนวนเด็ก
    const hasChildren = faker.datatype.boolean();
    if (hasChildren) {
      await page.locator('label').filter({ hasText: /^(Yes|มี)$/i }).click();
      await page.waitForTimeout(300);
      
      const childrenUnder7 = faker.number.int({ min: 0, max: 10 }).toString();
      const children7To12 = faker.number.int({ min: 0, max: 10 }).toString();
      const childrenOver12 = faker.number.int({ min: 0, max: 10 }).toString();
      
      await selects.nth(1).selectOption(childrenUnder7);
      await selects.nth(2).selectOption(children7To12);
      await selects.nth(3).selectOption(childrenOver12);
    } else {
      await page.locator('label').filter({ hasText: /^(No|ไม่มี)$/i }).click();
    }

    // สุ่ม Dietary
    const dietaryItems = ['', 'None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Seafood Allergy', 'Nut Allergy'];
    const randomDiet = faker.helpers.arrayElement(dietaryItems);
    await page.locator('textarea').first().fill(randomDiet);

    // สุ่มการจัดการที่พัก
    const waitGroupRate = faker.datatype.boolean();
    if (waitGroupRate) {
      await page.locator('label').filter({ hasText: /(Wait for Group Rate|รอเข้าร่วม Group Rate)/i }).click();
      await page.waitForTimeout(500);

      // กรอกชื่อ-นามสกุลภาษาอังกฤษ
      const inputs = page.locator('input[type="text"]');
      await inputs.nth(1).fill(faker.person.firstName());
      await inputs.nth(2).fill(faker.person.lastName());

      // สุ่มลักษณะห้อง
      const roomsOptions = ['1', '2', '3', '4', '5', 'แชร์ห้องกับผู้อื่น'];
      const randomRoom = faker.helpers.arrayElement(roomsOptions);
      // Accommodation dropdown is the last select if hasChildren=no, or 5th if yes. Best to select by label context.
      const roomSelect = page.locator('label:has-text("Number of Rooms"), label:has-text("จำนวนห้อง")').locator('..').locator('select');
      await roomSelect.selectOption(randomRoom);

      if (randomRoom === 'แชร์ห้องกับผู้อื่น') {
        const isShareNotSure = faker.datatype.boolean();
        if (isShareNotSure) {
          // กด Checkbox Not sure yet
          await page.locator('label').filter({ hasText: /(Not sure yet|ยังไม่แน่ใจ)/i }).click();
        } else {
          // กรอกชื่อคนแชร์
          await page.locator('label:has-text("Share with"), label:has-text("แชร์ห้องกับ")').locator('..').locator('input[type="text"]').fill(faker.person.fullName());
        }
      }

      // สุ่มช่วงราคา
      const rangeCheckboxes = page.locator('input[type="checkbox"]').locator('..').filter({ hasText: /บาท \/ คืน|THB \/ night/i });
      const countRanges = await rangeCheckboxes.count();
      if (countRanges > 0) {
        // Randomly check some ranges
        let checkedCount = 0;
        for (let i = 0; i < countRanges; i++) {
          if (faker.datatype.boolean()) {
            await rangeCheckboxes.nth(i).click();
            checkedCount++;
          }
        }
        // Ensure at least 1 is selected to avoid validation error
        if (checkedCount === 0) {
          const randomIndex = faker.number.int({ min: 0, max: countRanges - 1 });
          await rangeCheckboxes.nth(randomIndex).click();
        }
      }

      // สุ่มวันเช็คอิน-เช็คเอาท์
      const checkInInput = page.locator('input[type="date"]').first();
      const checkOutInput = page.locator('input[type="date"]').last();
      
      const checkInDate = '2026-12-0' + faker.number.int({ min: 1, max: 4 });
      await checkInInput.fill(checkInDate);
      
      await page.waitForTimeout(300);
      const checkOutDate = '2026-12-0' + faker.number.int({ min: 5, max: 7 });
      await checkOutInput.fill(checkOutDate);

    } else {
      await page.locator('label').filter({ hasText: /(Book by Self|จองด้วยตนเอง)/i }).click();
    }
    
  } else {
    // === กรองฟอร์มฝั่งไม่เข้าร่วมงาน (No) ===
    const randomMessage = faker.lorem.paragraph();
    await page.locator('textarea').first().fill(randomMessage);
  }

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
