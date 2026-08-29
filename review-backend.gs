/**
 * Dawwar — feature review backend (Google Apps Script)
 *
 * كل صوت بيتسجّل كصف جديد، ومبنمسحش حاجة — فلو اتنين صوّتوا في نفس اللحظة
 * محدش بيضيع، وبنقدر نشوف الرأي اتغيّر إمتى. عند القراءة بناخد آخر صف
 * لكل (شخص + فيتشر).
 *
 * التنصيب:
 *   1. اعمل Google Sheet جديد.
 *   2. Extensions → Apps Script، والصق الملف ده مكان اللي موجود.
 *   3. غيّر PASSCODE تحت.
 *   4. Deploy → New deployment → Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. انسخ رابط الـ Web app وابعتهولي.
 */

var PASSCODE = 'dawwar2026';   // ← غيّرها، ودي اللي الفريق هيكتبها مرة واحدة
var SHEET_NAME = 'votes';
var MAX_NOTE = 2000;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return json({ ok: false, error: 'busy' });
  }
  try {
    var body = JSON.parse(e.postData.contents);
    if (String(body.pass || '') !== PASSCODE) return json({ ok: false, error: 'bad_pass' });

    var person = String(body.person || '').trim().slice(0, 60);
    if (!person) return json({ ok: false, error: 'no_person' });

    var items = body.items || [];
    if (!items.length) return json({ ok: true, saved: 0 });

    var now = new Date();
    var rows = items.slice(0, 500).map(function (it) {
      return [
        now,
        person,
        String(it.id || '').slice(0, 20),
        String(it.v || '').slice(0, 20),
        String(it.note || '').slice(0, MAX_NOTE)
      ];
    });

    var sh = sheet();
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, 5).setValues(rows);
    return json({ ok: true, saved: rows.length });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (String((e.parameter || {}).pass || '') !== PASSCODE) {
    return json({ ok: false, error: 'bad_pass' });
  }
  try {
    var sh = sheet();
    var last = sh.getLastRow();
    if (last < 2) return json({ ok: true, rows: [] });

    var vals = sh.getRange(2, 1, last - 1, 5).getValues();
    var rows = [];
    for (var i = 0; i < vals.length; i++) {
      var r = vals[i];
      if (!r[1] || !r[2]) continue;
      rows.push({
        t: (r[0] && r[0].getTime) ? r[0].getTime() : 0,
        person: String(r[1]),
        id: String(r[2]),
        v: String(r[3] || ''),
        note: String(r[4] || '')
      });
    }
    return json({ ok: true, rows: rows });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function sheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['الوقت', 'الشخص', 'الفيتشر', 'القرار', 'الملاحظة']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
