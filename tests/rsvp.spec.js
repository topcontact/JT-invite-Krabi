import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('ทดสอบสุ่มกรอกฟอร์ม RSVP จำนวน 1 ครั้ง', async ({ page }) => {
  test.setTimeout(90000);
  let rsvpRequestLogged = false;
  let rsvpResponseLogged = false;
  let rsvpFailedLogged = false;

  // #region agent log rsvp network observability
  page.on('request', async (request) => {
    const url = request.url();
    if (!rsvpRequestLogged && url.includes('/api/rsvp') && request.method() === 'POST') {
      rsvpRequestLogged = true;
      console.log(`🟦 [debug] RSVP request sent: ${request.method()} ${url}`);
      fetch('http://127.0.0.1:7536/ingest/81c38838-dea3-4894-baba-615350a1da91', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'bf8f3e' },
        body: JSON.stringify({
          sessionId: 'bf8f3e',
          location: 'tests/rsvp.spec.js:request',
          message: 'RSVP request observed',
          hypothesisId: 'H1_wait_for_response_timing',
          data: { method: request.method(), url },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    }
  });

  page.on('response', async (response) => {
    const url = response.url();
    if (!rsvpResponseLogged && url.includes('/api/rsvp') && response.request().method() === 'POST') {
      rsvpResponseLogged = true;
      console.log(`🟩 [debug] RSVP response received: ${response.status()} ${url}`);
      fetch('http://127.0.0.1:7536/ingest/81c38838-dea3-4894-baba-615350a1da91', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'bf8f3e' },
        body: JSON.stringify({
          sessionId: 'bf8f3e',
          location: 'tests/rsvp.spec.js:response',
          message: 'RSVP response observed',
          hypothesisId: 'H2_url_or_method_mismatch',
          data: { status: response.status(), url },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    }
  });

  page.on('requestfailed', async (request) => {
    const url = request.url();
    if (!rsvpFailedLogged && url.includes('/api/rsvp') && request.method() === 'POST') {
      rsvpFailedLogged = true;
      console.log(`🟥 [debug] RSVP request failed: ${url} (error=${request.failure()?.errorText || 'unknown'})`);
      fetch('http://127.0.0.1:7536/ingest/81c38838-dea3-4894-baba-615350a1da91', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'bf8f3e' },
        body: JSON.stringify({
          sessionId: 'bf8f3e',
          location: 'tests/rsvp.spec.js:requestfailed',
          message: 'RSVP request failed',
          hypothesisId: 'H3_cors_or_network_failure',
          data: { method: request.method(), url, error: request.failure()?.errorText || 'unknown' },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    }
  });
  // #endregion

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

  // เลื่อน SlideToConfirm แบบ "ลากเมาส์จริง" เพื่อให้ Framer Motion อัปเดต x
  // แล้วเรียก handleDragEnd ตามเงื่อนไข x >= maxDrag*0.85 ได้แน่นอน
  const drag = await page.evaluate(() => {
    const modal = document.querySelector('.z-\\[100\\]');
    if (!modal) return null;
    const thumb = modal.querySelector('.cursor-grab');
    if (!thumb) return null;

    const container = thumb.parentElement; // ref containerWidth อยู่ที่ parent
    if (!container) return null;

    const thumbRect = thumb.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const thumbWidth = thumbRect.width || 52;
    const containerWidth = containerRect.width || 280;
    const maxDrag = containerWidth - thumbWidth - 8;
    const threshold = maxDrag * 0.85;

    const startX = thumbRect.left + thumbRect.width / 2;
    const startY = thumbRect.top + thumbRect.height / 2;
    const endX = startX + threshold + 15; // เผื่อเข้าเงื่อนไขชัวร์

    return { startX, startY, endX };
  });

  expect(drag, 'Slide thumb not found in TicketModal').not.toBeNull();
  await page.mouse.move(drag.startX, drag.startY);
  await page.mouse.down();
  await page.mouse.move(drag.endX, drag.startY, { steps: 20 });
  await page.mouse.up();

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/05-after-confirm.png' });

  // 5. รอผลลัพธ์หลัง submit: สำเร็จ (Thank You) หรือมี error แสดงใน modal
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test-results/07-final-state.png' });

  const thankYou = page.getByText('Thank You!');
  const submissionError = page.getByText(/เกิดข้อผิดพลาดในการส่งข้อมูล:|Submission Error:/);
  const submitting = page.getByText(/กำลังส่งข้อมูล|Submitting/);

  // รอให้ UI อัปเดตก่อน 1 รอบ
  await Promise.race([
    thankYou.waitFor({ state: 'visible', timeout: 20000 }).then(() => ({ type: 'success' })).catch(() => null),
    submissionError.waitFor({ state: 'visible', timeout: 20000 }).then(() => ({ type: 'error' })).catch(() => null),
    submitting.waitFor({ state: 'visible', timeout: 20000 }).then(() => ({ type: 'submitting' })).catch(() => null),
  ]);

  // ตัดสินผล:
  if (await thankYou.isVisible().catch(() => false)) {
    console.log('🎉 RSVP submitted successfully!');
    expect(true).toBeTruthy();
  } else if (await submissionError.isVisible().catch(() => false)) {
    const msg = await submissionError.textContent().catch(() => '');
    console.log(`❌ RSVP submission error UI: ${msg}`);
    throw new Error(`RSVP submission failed (error shown in modal). ${msg}`);
  } else {
    throw new Error('RSVP flow did not reach success nor visible error message.');
  }
});
