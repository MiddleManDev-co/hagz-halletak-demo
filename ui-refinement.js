(function(){
'use strict';
const en=()=>window.hhGetLanguage?.()==='en';
const L=(ar,enText)=>en()?enText:ar;
const path=()=>location.hash.replace(/^#\/?/,'')||'home';
const once=(root,cls)=>root&&!root.querySelector('.'+cls);

function home(){
 if(path()!=='home')return;
 const hero=document.querySelector('.hero-grid');if(!hero)return;
 const copy=hero.children[0];
 if(copy&&once(copy,'ux-value-points')){
  const box=document.createElement('div');box.className='ux-value-points';
  box.innerHTML=`
   <div class="ux-value-point"><span>✓</span><div><strong>${L('توافر موثوق قبل ما تتصل','Reliable availability before you call')}</strong><small>${L('ابدأ من التاريخ مش من عشرات المكالمات','Start from the date, not dozens of calls')}</small></div></div>
   <div class="ux-value-point"><span>◎</span><div><strong>360° ${L('جولة لكل قاعة','tour for every venue')}</strong><small>${L('شوف المكان من كل الاتجاهات قبل الزيارة','Inspect the space before a physical visit')}</small></div></div>
   <div class="ux-value-point"><span>₤</span><div><strong>${L('سعر وعربون واضحين','Clear price and deposit')}</strong><small>${L('قارن واتخذ قرارك بثقة أكبر','Compare and decide with more confidence')}</small></div></div>`;
  copy.appendChild(box);
 }
}

function explore(){
 if(path()!=='explore')return;
 const top=document.querySelector('.results-top');
 if(top&&once(top,'ux-result-intel')){
  const summary=top.querySelector('.result-summary');
  const intel=document.createElement('div');intel.className='ux-result-intel';
  intel.innerHTML=`<span><strong>4</strong> ${L('متاحين الآن','available now')}</span><span><strong>6</strong> ${L('بجولة 360°','with 360° tours')}</span><span><strong>3</strong> ${L('أفضل Match','top matches')}</span>`;
  summary?.appendChild(intel);
  const toggle=document.createElement('button');toggle.className='btn btn-light ux-filter-toggle';toggle.type='button';toggle.textContent=L('فلترة متقدمة','Advanced filters');toggle.onclick=()=>document.querySelector('.filter-panel')?.classList.toggle('ux-open');top.appendChild(toggle);
 }
}

function venue(){
 const p=path();if(!p.startsWith('venue/'))return;
 const id=p.split('/')[1]||'royal-garden';
 const details=document.querySelector('.detail-layout>div');
 if(details&&once(details,'ux-venue-trust')){
  const nav=details.querySelector('.detail-nav');
  const block=document.createElement('div');block.className='ux-venue-trust';
  block.innerHTML=`
   <div><strong>✓ ${L('توافر موثق','Verified availability')}</strong><span>${L('متزامن مع VenueOS','Synced with VenueOS')}</span></div>
   <div><strong>◎ 360° ${L('جولة','Tour')}</strong><span>${L('مشاهد متعددة + Hotspots','Multiple scenes + hotspots')}</span></div>
   <div><strong>18 ${L('دقيقة','min')}</strong><span>${L('متوسط وقت الرد','Average response time')}</span></div>
   <div><strong>★ 4.9</strong><span>${L('من حجوزات موثقة','Verified booking reviews')}</span></div>`;
  nav?.before(block);
 }
 if(!document.querySelector('.ux-mobile-booking')){
  const price=document.querySelector('.booking-box .price-lg')?.textContent?.trim()||L('السعر واضح بالداخل','See price');
  const bar=document.createElement('div');bar.className='ux-mobile-booking';
  bar.innerHTML=`<div><span>${L('يبدأ من','Starts from')}</span><strong>${price}</strong></div><button class="btn btn-light ux-secondary-mobile" onclick="navTo('visits')">${L('زيارة','Visit')}</button><button class="btn btn-primary" onclick="navTo('booking/${id}')">${L('احجز','Book')}</button>`;
  document.body.appendChild(bar);
 }
}

function addExecStrip(items){
 const panel=document.querySelector('.main-panel');const head=panel?.querySelector('.dash-head');if(!panel||!head||!once(panel,'ux-exec-strip'))return;
 const el=document.createElement('div');el.className='ux-exec-strip';
 el.innerHTML=items.map(([icon,title,note])=>`<div class="ux-exec-item"><span class="ux-exec-icon">${icon}</span><div><strong>${title}</strong><small>${note}</small></div></div>`).join('');
 head.after(el);
}
function addPriority(items){
 const panel=document.querySelector('.main-panel');if(!panel||!once(panel,'ux-priority-card'))return;
 const stats=panel.querySelector('.stats-grid');const card=document.createElement('section');card.className='ux-priority-card';
 card.innerHTML=`<div class="ux-priority-head"><strong>${L('الأهم دلوقتي','What needs attention now')}</strong><span>${L('مرتبة حسب التأثير','Prioritized by impact')}</span></div><div class="ux-priority-list">${items.map(([t,v,a])=>`<div class="ux-priority"><div><strong>${t}</strong><br>${v}</div><button onclick="${a}">${L('افتح','Open')}</button></div>`).join('')}</div>`;
 (stats||panel.querySelector('.ux-exec-strip'))?.after(card);
}

function venueOverview(){
 if(path()!=='venue-os/overview')return;
 addExecStrip([
  ['↗',L('الإيراد أعلى 14%','Revenue up 14%'),L('لكن راقب تكلفة Signature package','Watch Signature package costs')],
  ['◎',L('11 Lead محتاجين رد','11 leads need a reply'),L('فرصة تقديرية 410K ج.م','Illustrative opportunity: 410K EGP')],
  ['◷',L('3 Holds قربوا ينتهوا','3 holds expire soon'),L('خلال 24 ساعة','Within 24 hours')]
 ]);
 addPriority([
  [L('تابع الـLeads المتأخرة','Follow up overdue leads'),L('11 عميل محتمل','11 qualified leads'),"navTo('venue-os/leads')"],
  [L('راجع التحصيل','Review receivables'),L('120K مستحق هذا الأسبوع','120K due this week'),"navTo('venue-os/business-center')"],
  [L('املأ يوم 22 أكتوبر','Fill October 22'),L('DateDrop مقترح','DateDrop suggested'),"navTo('venue-os/datedrop')"]
 ]);
}

function adminOverview(){
 if(path()!=='admin/overview')return;
 addExecStrip([
  ['✓',L('94.2% دقة توافر','94.2% availability reliability'),L('المؤشر التشغيلي الأهم','Core operational health metric')],
  ['◎',L('81% تغطية الطلب','81% demand coverage'),L('أفضل فرصة توسع: زايد','Best expansion opportunity: Zayed')],
  ['⚠',L('12 تقويم قديم','12 stale calendars'),L('يحتاجوا تدخل قبل ما يضروا الثقة','Intervene before trust is affected')]
 ]);
 addPriority([
  [L('راجع القاعات القديمة','Review stale venues'),L('12 Venue > 72h','12 venues > 72h'),"navTo('admin/marketplace-health')"],
  [L('Verification queue','Verification queue'),L('7 قاعات منتظرة','7 venues pending'),"navTo('admin/verification')"],
  [L('نزاعات الدفع','Payment disputes'),L('3 حالات نشطة','3 active cases'),"navTo('admin/disputes')"]
 ]);
}

function investor(){
 if(path()!=='investor')return;
 const app=document.querySelector('#app');if(!app||!once(app,'ux-thesis'))return;
 const target=app.querySelector('.section-head')||app.querySelector('.dash-head')||app.querySelector('.container');if(!target)return;
 const thesis=document.createElement('div');thesis.className='ux-thesis';
 thesis.innerHTML=`
  <div class="ux-thesis-main"><span>${L('الفرضية الاستثمارية','Investment thesis')}</span><strong>${L('Marketplace يجيب الطلب، VenueOS يملك التوافر، والمدفوعات والبيانات يبنوا الـmoat.','Marketplace acquires demand, VenueOS owns availability, and transactions plus data build the moat.')}</strong></div>
  <div class="ux-thesis-point"><span>${L('النمو','Growth')}</span><strong>${L('Supply + demand flywheel','Supply + demand flywheel')}</strong></div>
  <div class="ux-thesis-point"><span>${L('الربح','Economics')}</span><strong>${L('Commission + SaaS + payments','Commission + SaaS + payments')}</strong></div>
  <div class="ux-thesis-point"><span>${L('الدفاعية','Moat')}</span><strong>${L('Live availability + operating data','Live availability + operating data')}</strong></div>`;
 target.after(thesis);
}

function cleanup(){
 if(!path().startsWith('venue/'))document.querySelector('.ux-mobile-booking')?.remove();
}
function render(){cleanup();home();explore();venue();venueOverview();adminOverview();investor();window.hhApplyLanguage?.(document.body)}
window.addEventListener('hashchange',()=>setTimeout(render,120));
window.addEventListener('hh:languagechange',()=>setTimeout(render,60));
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,280));
})();
