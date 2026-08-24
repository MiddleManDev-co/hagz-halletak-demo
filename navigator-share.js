(function(){
'use strict';
const valid=['full','customer','venue','admin','investor','business'];
const en=()=>window.hhGetLanguage?.()==='en';
const L=(ar,enText)=>en()?enText:ar;
const requested=new URLSearchParams(location.search).get('tour');
if(valid.includes(requested)){try{localStorage.setItem('hh-guide-welcome','1')}catch(_){}}

function tourLabel(id){
 const labels={
  full:[L('الجولة الكاملة','Full story'),'◎'],
  customer:[L('العميل','Customer'),'💍'],
  venue:[L('القاعة','Venue'),'🏛'],
  admin:[L('الإدارة','Admin'),'🛡'],
  investor:[L('المستثمر','Investor'),'📈'],
  business:[L('الماليات والاستراتيجية','Business intelligence'),'₤']
 };
 return labels[id];
}
function tourUrl(id){return `${location.origin}${location.pathname}?tour=${encodeURIComponent(id)}#/home`}
function copy(id){
 const url=tourUrl(id);
 const done=()=>window.toast?.(L('تم نسخ رابط الجولة','Tour link copied'));
 if(navigator.clipboard?.writeText)navigator.clipboard.writeText(url).then(done).catch(()=>window.prompt(L('انسخ الرابط','Copy this link'),url));
 else window.prompt(L('انسخ الرابط','Copy this link'),url);
}
function inject(){
 const launcher=document.querySelector('.dn-launcher');if(!launcher)return;
 let row=launcher.querySelector('.dn-share-row');
 if(!row){row=document.createElement('div');row.className='dn-share-row';const foot=launcher.querySelector('.dn-launcher-foot');launcher.insertBefore(row,foot)}
 row.innerHTML=`<span>${L('روابط مباشرة للعرض','Direct presentation links')}</span>${valid.map(id=>{const [label,icon]=tourLabel(id);return `<button type="button" onclick="hhCopyTourLink('${id}')">${icon} ${label}</button>`}).join('')}`;
 const foot=launcher.querySelector('.dn-launcher-foot');
 const buttons=foot?.querySelectorAll('button')||[];
 if(buttons[0])buttons[0].onclick=()=>{window.hhStopTour?.();window.biStopTour?.();window.hhCloseDemoNavigator?.();window.navTo?.('home')};
 if(buttons[1])buttons[1].onclick=()=>{window.hhStopTour?.();window.biStopTour?.();window.hhCloseDemoNavigator?.();window.auditToggleGuide?.(true)};
}
window.hhCopyTourLink=copy;
const baseReset=window.hhResetGuidedDemo;
window.hhResetGuidedDemo=()=>{
 if(location.search)history.replaceState(null,'',location.pathname+location.hash);
 window.biStopTour?.();
 baseReset?.();
};
const obs=new MutationObserver(()=>requestAnimationFrame(inject));
document.addEventListener('DOMContentLoaded',()=>{
 obs.observe(document.body,{childList:true,subtree:true});
 inject();
 if(valid.includes(requested)&&requested!=='business')setTimeout(()=>window.hhStartTour?.(requested),260);
});
window.addEventListener('hh:languagechange',()=>setTimeout(inject,30));
})();