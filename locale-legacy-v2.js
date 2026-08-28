(function(global){
'use strict';

const language=()=>global.hhGetLanguage?.()||(()=>{try{return localStorage.getItem('hh-lang')||'ar'}catch(_){return'ar'}})();
const isEnglish=()=>language()==='en';

const ar=new Map([
  ['Dawwar','دوّر'],['Hagz Halletak','دوّر'],['حجز هالتك','دوّر'],
  ['Royal Garden','رويال جاردن'],['Luma Hall','لوما هول'],['Nile Palace','نايل بالاس'],['Garden 37','جاردن 37'],['Palm Palace','بالم بالاس'],['Lake House','ليك هاوس'],
  ['Karim & Aya','محمود وسلمى'],['كريم وآية','محمود وسلمى'],['Karim & Aya Wedding','حفل محمود وسلمى'],
  ['Mahmoud & Salma','محمود وسلمى'],['Mahmoud & Salma Wedding','حفل محمود وسلمى'],
  ['Outdoor','خارجي'],['Indoor','داخلي'],['Parking','موقف سيارات'],['Bridal room','غرفة العروس'],['Valet','خدمة صف السيارات'],['Stage','مسرح'],['Large stage','مسرح كبير'],['Nile view','إطلالة على النيل'],['Lake view','إطلالة على البحيرة'],['Garden','حديقة'],['Sound','نظام صوت'],
  ['Hall Only','القاعة فقط'],['Wedding Plus','باقة الزفاف بلس'],['Signature','الباقة المميزة'],['Essential','أساسي'],['Premium','مميز'],['Popular','الأكثر طلبًا'],['Base','أساسي'],
  ['Home','الرئيسية'],['Explore','استكشف'],['Shortlist','القائمة المختصرة'],['Account','الحساب'],['Customer','العميل'],['Venue','القاعة'],['Venue Owner','صاحب القاعة'],['Platform Admin','إدارة المنصة'],['Investor','المستثمر'],
  ['My Wedding','تخطيط المناسبة'],['Shared planning','تخطيط مشترك'],['Shared shortlist','قائمة مشتركة'],['Family voting','تصويت الأسرة'],
  ['VenueOS','إدارة القاعات'],['VenueOS Lite','إدارة القاعات المبسطة'],['VenueOS Pro','إدارة القاعات الاحترافية'],
  ['Calendar','التقويم'],['Bookings','الحجوزات'],['Booking','الحجز'],['Revenue','الإيرادات'],['Analytics','التحليلات'],['Occupancy','نسبة الإشغال'],['Conversion','التحويل'],['Customers','العملاء'],['Venues','القاعات'],
  ['Open leads','عملاء محتملون مفتوحون'],['Leads','العملاء المحتملون'],['Leads CRM','إدارة العملاء المحتملين'],['إدارة الـLeads','إدارة العملاء المحتملين'],['New Lead','عميل محتمل جديد'],['Lead جديد','عميل محتمل جديد'],['Contacted','تم التواصل'],['Visit Scheduled','زيارة محددة'],['Offer / Hold','عرض / حجز مؤقت'],['Won','تم الحجز'],
  ['Calendar Health','صحة التقويم'],['Latest activity','آخر النشاطات'],['Quick Booking','حجز سريع'],['Fix Calendar','تحديث التقويم'],['Block date','حظر التاريخ'],['Available','متاح'],['Booked','محجوز'],['Visit','زيارة'],['Hold','حجز مؤقت'],
  ['Packages & Pricing','الباقات والأسعار'],['Dynamic Pricing Rules','قواعد التسعير الديناميكي'],['Event mix','توزيع المناسبات'],['Revenue by month','الإيراد حسب الشهر'],['Lost revenue','إيراد مفقود'],
  ['Platform Overview','نظرة عامة على المنصة'],['Venue Operations','تشغيل القاعات'],['Bookings & Payments','الحجوزات والمدفوعات'],['Marketplace Intelligence','تحليلات السوق'],['Demand heatmap · October','خريطة الطلب · أكتوبر'],['Supply gap','فجوة العرض'],['All systems operational','كل الأنظمة تعمل'],['Verification queue · 7','طابور التحقق · 7'],['Verification checks','فحوصات التحقق'],['Accuracy score','دقة التوافر'],['Response score','سرعة الرد'],['Export report','تصدير التقرير'],
  ['Marketplace','السوق'],['Product Vision','رؤية المنتج'],['Future Vision','الرؤية المستقبلية'],['Business Model','نموذج العمل'],['Business model','نموذج العمل'],['Expansion','التوسع'],['Problem → Product','المشكلة ← المنتج'],['Today','اليوم'],
  ['Flexible Dates','تواريخ مرنة'],['DateDrop','عروض التواريخ القريبة'],['Reverse Marketplace','السوق العكسي'],['Family Shortlist','قائمة الأسرة المختصرة'],['Waitlist','قائمة الانتظار'],['Request Offers','اطلب عروضًا'],
  ['Live availability','توافر مباشر'],['Smart booking','حجز ذكي'],['Match','توافق'],['match','توافق'],['Verified','موثقة'],['Confirmation needed','تأكيد مطلوب'],['Details','التفاصيل'],['Checkout','إتمام الحجز'],
  ['Demo','عرض تجريبي'],['Demo only','عرض تجريبي فقط'],['Demo Guide','دليل العرض'],['Guide','الدليل'],['Interactive Product Demo','عرض تفاعلي للمنتج'],['Mock data','بيانات تجريبية'],['No backend','بدون خادم خلفي'],['Presentation demo','عرض توضيحي'],
  ['Admin','الإدارة'],['Dashboard','لوحة المتابعة'],['Admin Dashboard','لوحة إدارة المنصة'],['Pipeline','مسار العمل'],['Status','الحالة'],['Source','المصدر'],['Request','طلب'],['Confirm','تأكيد'],
  ['GMV','إجمالي قيمة الحجوزات'],['MRR','الإيراد الشهري المتكرر'],['CRM','إدارة العملاء'],['BI','ذكاء الأعمال'],['AI','الذكاء الاصطناعي'],['SaaS','البرمجيات كخدمة'],['ROI','العائد التشغيلي'],['P&L','قائمة الأرباح والخسائر'],['SLA','مستوى الخدمة'],
  ['Bank Transfer','تحويل بنكي'],['Cash','نقدًا'],['Card','بطاقة'],['InstaPay','إنستاباي'],['Online','إلكتروني'],['Offline','خارجي'],['Team','الفريق'],['Automation','الأتمتة'],['Pricing','التسعير'],['Package','باقة'],['Packages','الباقات'],
  ['New Cairo','القاهرة الجديدة'],['Sheikh Zayed','الشيخ زايد'],['Maadi','المعادي'],['Nasr City','مدينة نصر'],['Heliopolis','مصر الجديدة'],
  ['Wedding','زفاف'],['Engagement','خطوبة'],['Katb Ketab','كتب كتاب'],['Corporate event','فعالية للشركات'],
  ['Saturday','السبت'],['Sunday','الأحد'],['Monday','الاثنين'],['Tuesday','الثلاثاء'],['Wednesday','الأربعاء'],['Thursday','الخميس'],['Friday','الجمعة'],
  ['January','يناير'],['February','فبراير'],['March','مارس'],['April','أبريل'],['May','مايو'],['June','يونيو'],['July','يوليو'],['August','أغسطس'],['September','سبتمبر'],['October','أكتوبر'],['November','نوفمبر'],['December','ديسمبر']
]);

const en=new Map([
  ['دوّر','Dawwar'],['حجز هالتك','Dawwar'],
  ['رويال جاردن','Royal Garden'],['لوما هول','Luma Hall'],['نايل بالاس','Nile Palace'],['جاردن 37','Garden 37'],['بالم بالاس','Palm Palace'],['ليك هاوس','Lake House'],
  ['كريم وآية','Mahmoud & Salma'],['محمود وسلمى','Mahmoud & Salma'],['حفل محمود وسلمى','Mahmoud & Salma Wedding'],
  ['خارجي','Outdoor'],['داخلي','Indoor'],['موقف سيارات','Parking'],['غرفة العروس','Bridal room'],['خدمة صف السيارات','Valet'],['مسرح','Stage'],['مسرح كبير','Large stage'],['إطلالة على النيل','Nile view'],['إطلالة على البحيرة','Lake view'],['حديقة','Garden'],['نظام صوت','Sound'],
  ['القاعة فقط','Hall Only'],['باقة الزفاف بلس','Wedding Plus'],['الباقة المميزة','Signature'],
  ['الرئيسية','Home'],['استكشف','Explore'],['القائمة المختصرة','Shortlist'],['الحساب','Account'],['العميل','Customer'],['القاعة','Venue'],['صاحب القاعة','Venue Owner'],['إدارة المنصة','Platform Admin'],['المستثمر','Investor'],
  ['تخطيط المناسبة','My Wedding'],['تخطيط مشترك','Shared planning'],['قائمة مشتركة','Shared shortlist'],['تصويت الأسرة','Family voting'],['تصويت العيلة','Family voting'],
  ['إدارة القاعات','VenueOS'],['إدارة القاعات المبسطة','VenueOS Lite'],['إدارة القاعات الاحترافية','VenueOS Pro'],
  ['التقويم','Calendar'],['الحجوزات','Bookings'],['الحجز','Booking'],['الإيرادات','Revenue'],['التحليلات','Analytics'],['نسبة الإشغال','Occupancy'],['التحويل','Conversion'],['العملاء','Customers'],['القاعات','Venues'],
  ['عملاء محتملون مفتوحون','Open leads'],['العملاء المحتملون','Leads'],['إدارة العملاء المحتملين','Leads CRM'],['عميل محتمل جديد','New Lead'],['تم التواصل','Contacted'],['زيارة محددة','Visit Scheduled'],['عرض / حجز مؤقت','Offer / Hold'],['تم الحجز','Won'],
  ['صحة التقويم','Calendar Health'],['آخر النشاطات','Latest activity'],['حجز سريع','Quick Booking'],['تحديث التقويم','Fix Calendar'],['حظر التاريخ','Block date'],['متاح','Available'],['محجوز','Booked'],['زيارة','Visit'],['حجز مؤقت','Hold'],
  ['الباقات والأسعار','Packages & Pricing'],['قواعد التسعير الديناميكي','Dynamic Pricing Rules'],['توزيع المناسبات','Event mix'],['الإيراد حسب الشهر','Revenue by month'],['إيراد مفقود','Lost revenue'],
  ['نظرة عامة على المنصة','Platform Overview'],['تشغيل القاعات','Venue Operations'],['الحجوزات والمدفوعات','Bookings & Payments'],['تحليلات السوق','Marketplace Intelligence'],['خريطة الطلب · أكتوبر','Demand heatmap · October'],['فجوة العرض','Supply gap'],['كل الأنظمة تعمل','All systems operational'],['طابور التحقق · 7','Verification queue · 7'],['فحوصات التحقق','Verification checks'],['دقة التوافر','Accuracy score'],['سرعة الرد','Response score'],['تصدير التقرير','Export report'],
  ['السوق','Marketplace'],['رؤية المنتج','Product Vision'],['الرؤية المستقبلية','Future Vision'],['نموذج العمل','Business model'],['التوسع','Expansion'],['المشكلة ← المنتج','Problem → Product'],['اليوم','Today'],
  ['تواريخ مرنة','Flexible Dates'],['عروض التواريخ القريبة','DateDrop'],['السوق العكسي','Reverse Marketplace'],['قائمة الأسرة المختصرة','Family Shortlist'],['قائمة الانتظار','Waitlist'],['اطلب عروضًا','Request Offers'],
  ['توافر مباشر','Live availability'],['حجز ذكي','Smart booking'],['توافق','Match'],['موثقة','Verified'],['تأكيد مطلوب','Confirmation needed'],['التفاصيل','Details'],['إتمام الحجز','Checkout'],
  ['عرض تجريبي','Demo'],['عرض تجريبي فقط','Demo only'],['دليل العرض','Demo Guide'],['الدليل','Guide'],['عرض تفاعلي للمنتج','Interactive Product Demo'],['بيانات تجريبية','Mock data'],['بدون خادم خلفي','No backend'],['عرض توضيحي','Presentation demo'],
  ['الإدارة','Admin'],['لوحة المتابعة','Dashboard'],['لوحة إدارة المنصة','Admin Dashboard'],['مسار العمل','Pipeline'],['الحالة','Status'],['المصدر','Source'],['طلب','Request'],['تأكيد','Confirm'],
  ['إجمالي قيمة الحجوزات','GMV'],['الإيراد الشهري المتكرر','MRR'],['إدارة العملاء','CRM'],['ذكاء الأعمال','BI'],['الذكاء الاصطناعي','AI'],['البرمجيات كخدمة','SaaS'],['العائد التشغيلي','ROI'],['قائمة الأرباح والخسائر','P&L'],['مستوى الخدمة','SLA'],
  ['تحويل بنكي','Bank Transfer'],['نقدًا','Cash'],['بطاقة','Card'],['إنستاباي','InstaPay'],['إلكتروني','Online'],['خارجي','Offline'],['الفريق','Team'],['الأتمتة','Automation'],['التسعير','Pricing'],['باقة','Package'],['الباقات','Packages'],
  ['القاهرة الجديدة','New Cairo'],['الشيخ زايد','Sheikh Zayed'],['المعادي','Maadi'],['مدينة نصر','Nasr City'],['مصر الجديدة','Heliopolis'],
  ['زفاف','Wedding'],['خطوبة','Engagement'],['كتب كتاب','Katb Ketab'],['فعالية للشركات','Corporate event'],
  ['السبت','Saturday'],['الأحد','Sunday'],['الاثنين','Monday'],['الثلاثاء','Tuesday'],['الأربعاء','Wednesday'],['الخميس','Thursday'],['الجمعة','Friday'],
  ['يناير','January'],['فبراير','February'],['مارس','March'],['أبريل','April'],['مايو','May'],['يونيو','June'],['يوليو','July'],['أغسطس','August'],['سبتمبر','September'],['أكتوبر','October'],['نوفمبر','November'],['ديسمبر','December']
]);

function withWhitespace(original,replacement){
  const start=original.match(/^\s*/)?.[0]||'';
  const end=original.match(/\s*$/)?.[0]||'';
  return start+replacement+end;
}

function dynamicArabic(text){
  let m=text.match(/^(\d+) guests$/i);if(m)return `${m[1]} ضيف`;
  m=text.match(/^(\d+) venues$/i);if(m)return `${m[1]} قاعة`;
  m=text.match(/^Under (\d+)K$/i);if(m)return `أقل من ${m[1]} ألف جنيه`;
  m=text.match(/^(\d+) votes$/i);if(m)return `${m[1]} أصوات`;
  m=text.match(/^(\d+) members online$/i);if(m)return `${m[1]} أعضاء متصلون`;
  m=text.match(/^(\d+) events$/i);if(m)return `${m[1]} مناسبة`;
  return null;
}
function dynamicEnglish(text){
  let m=text.match(/^(\d+) ضيف$/);if(m)return `${m[1]} guests`;
  m=text.match(/^(\d+) قاعة$/);if(m)return `${m[1]} venues`;
  m=text.match(/^أقل من (\d+) ألف جنيه$/);if(m)return `Under EGP ${m[1]}K`;
  m=text.match(/^(\d+) أصوات$/);if(m)return `${m[1]} votes`;
  m=text.match(/^(\d+) أعضاء متصلون$/);if(m)return `${m[1]} members online`;
  m=text.match(/^(\d+) مناسبة$/);if(m)return `${m[1]} events`;
  return null;
}

function translateValue(value){
  const trimmed=value.trim();if(!trimmed)return value;
  const table=isEnglish()?en:ar;
  if(table.has(trimmed))return withWhitespace(value,table.get(trimmed));
  const dynamic=isEnglish()?dynamicEnglish(trimmed):dynamicArabic(trimmed);
  return dynamic?withWhitespace(value,dynamic):value;
}

let applying=false;
function apply(root=document.body){
  if(!root||applying)return;
  applying=true;
  try{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      if(node.parentElement?.closest('script,style,code,pre,[data-i18n-skip]'))continue;
      const next=translateValue(node.nodeValue);
      if(next!==node.nodeValue)node.nodeValue=next;
    }
    document.title=isEnglish()?'Dawwar | Interactive Product Demo':'دوّر | عرض تفاعلي للمنتج';
  }finally{applying=false;}
}

let timer;
function schedule(){clearTimeout(timer);timer=setTimeout(()=>apply(document.body),30)}
const observer=new MutationObserver(schedule);
function start(){apply(document.body);observer.observe(document.body,{subtree:true,childList:true,characterData:true});}

global.dawwarApplyLegacyLocaleV2=apply;
global.addEventListener('hashchange',schedule);
global.addEventListener('hh:languagechange',()=>setTimeout(()=>apply(document.body),60));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})(window);