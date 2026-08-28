(function(global){
'use strict';

const lang=()=>global.hhGetLanguage?.()||(()=>{try{return localStorage.getItem('hh-lang')||'ar'}catch(_){return 'ar'}})();

const arPairs=[
  ['P&L','قائمة الأرباح والخسائر'],
  ['GMV','إجمالي قيمة الحجوزات'],
  ['MRR','الإيراد الشهري المتكرر'],
  ['LTV/CAC','القيمة طويلة الأجل مقابل تكلفة الاكتساب'],
  ['CAC','تكلفة الاكتساب'],
  ['LTV','القيمة طويلة الأجل'],
  ['SaaS','البرمجيات كخدمة'],
  ['CRM','إدارة العملاء'],
  ['BI','ذكاء الأعمال'],
  ['AI','الذكاء الاصطناعي'],
  ['KPIs','مؤشرات الأداء'],
  ['KPI','مؤشر الأداء'],
  ['SLA','مستوى الخدمة'],
  ['ROI','العائد التشغيلي'],
  ['Admin Dashboard','لوحة إدارة المنصة'],
  ['Dashboard','لوحة المتابعة'],
  ['Bank Transfer','تحويل بنكي'],
  ['InstaPay','إنستاباي'],
  ['Pipeline','مسار العمل'],
  ['Instant','فوري'],
  ['Online','إلكتروني'],
  ['offline','خارجي'],
  ['Offline','خارجي'],
  ['Hold','حجز مؤقت'],
  ['Team','الفريق'],
  ['Automation','الأتمتة'],
  ['Pricing','التسعير'],
  ['Packages','الباقات'],
  ['Package','باقة'],
  ['Customers','العملاء'],
  ['Venues','القاعات'],
  ['Events','المناسبات'],
  ['Event','المناسبة'],
  ['Request','طلب'],
  ['Confirm','تأكيد'],
  ['Source','المصدر'],
  ['Match','توافق'],
  ['match','توافق'],
  ['Status','الحالة'],
  ['Flow','المسار'],
  ['Card','بطاقة'],
  ['Cash','نقدًا'],
  ['Premium','مميز'],
  ['Popular','الأكثر طلبًا'],
  ['Base','أساسي'],
  ['Live','مباشر'],
  ['Mock','تجريبي'],
  ['backend','الخادم الخلفي'],
  ['Backend','الخادم الخلفي'],
  ['Presentation','عرض توضيحي'],
  ['Corporate','شركات'],
  ['Wedding','زفاف'],
  ['Thursday','الخميس'],
  ['Friday','الجمعة'],
  ['Monday','الاثنين'],
  ['Tuesday','الثلاثاء'],
  ['Wednesday','الأربعاء'],
  ['Saturday','السبت'],
  ['Sunday','الأحد']
];

const enPairs=[
  ['قائمة الأرباح والخسائر','P&L'],
  ['إجمالي قيمة الحجوزات','GMV'],
  ['الإيراد الشهري المتكرر','MRR'],
  ['القيمة طويلة الأجل مقابل تكلفة الاكتساب','LTV/CAC'],
  ['تكلفة الاكتساب','CAC'],
  ['القيمة طويلة الأجل','LTV'],
  ['البرمجيات كخدمة','SaaS'],
  ['إدارة العملاء','CRM'],
  ['ذكاء الأعمال','BI'],
  ['الذكاء الاصطناعي','AI'],
  ['مؤشرات الأداء','KPIs'],
  ['مؤشر الأداء','KPI'],
  ['مستوى الخدمة','SLA'],
  ['العائد التشغيلي','ROI'],
  ['لوحة إدارة المنصة','Admin Dashboard'],
  ['لوحة المتابعة','Dashboard'],
  ['تحويل بنكي','Bank Transfer'],
  ['إنستاباي','InstaPay'],
  ['مسار العمل','Pipeline'],
  ['فوري','Instant'],
  ['إلكتروني','Online'],
  ['خارجي','Offline'],
  ['حجز مؤقت','Hold'],
  ['الفريق','Team'],
  ['الأتمتة','Automation'],
  ['التسعير','Pricing'],
  ['الباقات','Packages'],
  ['باقة','Package'],
  ['العملاء','Customers'],
  ['القاعات','Venues'],
  ['المناسبات','Events'],
  ['المناسبة','Event'],
  ['طلب','Request'],
  ['تأكيد','Confirm'],
  ['المصدر','Source'],
  ['توافق','Match'],
  ['الحالة','Status'],
  ['المسار','Flow'],
  ['بطاقة','Card'],
  ['نقدًا','Cash'],
  ['مميز','Premium'],
  ['الأكثر طلبًا','Popular'],
  ['أساسي','Base'],
  ['مباشر','Live'],
  ['تجريبي','Demo'],
  ['الخادم الخلفي','Backend'],
  ['عرض توضيحي','Presentation'],
  ['شركات','Corporate'],
  ['الخميس','Thursday'],
  ['الجمعة','Friday'],
  ['الاثنين','Monday'],
  ['الثلاثاء','Tuesday'],
  ['الأربعاء','Wednesday'],
  ['السبت','Saturday'],
  ['الأحد','Sunday']
];

function translate(text,pairs){
  let value=text;
  for(const [from,to] of pairs){if(value.includes(from))value=value.split(from).join(to);}
  return value;
}

function purifyText(text){return translate(text,lang()==='en'?enPairs:arPairs);}

let applying=false;
function apply(root=document.body){
  if(!root||applying)return;
  applying=true;
  try{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      if(node.parentElement?.closest('script,style,code,pre'))continue;
      const value=purifyText(node.nodeValue);
      if(value!==node.nodeValue)node.nodeValue=value;
    }
  }finally{applying=false;}
}

let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>apply(),60)};
const observer=new MutationObserver(schedule);
function start(){apply();observer.observe(document.body,{subtree:true,childList:true,characterData:true});}
global.dawwarPurifyTerminology=purifyText;
global.addEventListener('hashchange',schedule);
global.addEventListener('hh:languagechange',()=>setTimeout(apply,100));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})(window);
