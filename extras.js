function extraRoute(){return (location.hash.replace(/^#\/?/,'')||'home').split('/')[0]}

function flexibleDatesPage(){
  const dates=[
    {day:'7 Oct',price:110000,availability:'High availability',cls:'green',saving:35000},
    {day:'13 Oct',price:115000,availability:'8 venues',cls:'green',saving:30000},
    {day:'15 Oct',price:145000,availability:'High demand',cls:'orange',saving:0},
    {day:'16 Oct',price:133000,availability:'12 venues',cls:'green',saving:12000},
    {day:'22 Oct',price:120000,availability:'DateDrop options',cls:'blue',saving:25000},
    {day:'29 Oct',price:125000,availability:'10 venues',cls:'green',saving:20000}
  ];
  return shell(`<section class="section white"><div class="container"><div class="breadcrumb"><a href="#/home">الرئيسية</a> / Flexible Dates</div><div class="section-head"><div><div class="kicker">Flexible Date Search</div><h1 class="title">لو التاريخ مرن، السعر والاختيارات بيتغيروا جدًا</h1><p class="section-copy">بدل ما العميل يبدأ من قاعة، بنخليه يشوف الشهر كله: أنهي يوم أوفر؟ أنهي يوم فيه قاعات أكتر؟ وأنهي يوم عليه ضغط عالي؟</p></div><button class="btn btn-light" onclick="navTo('explore')">ارجع لنتائج 15 أكتوبر</button></div>
  <div class="grid-3">${dates.map(d=>`<div class="card card-pad hover"><div style="display:flex;justify-content:space-between;gap:12px"><div><span class="tiny muted">2027</span><h2 style="margin:2px 0;color:var(--navy)">${d.day}</h2></div><span class="badge ${d.cls}">${d.availability}</span></div><div class="metric-value">${fmt(d.price)}</div>${d.saving?`<div class="text-green tiny">توفر حتى ${fmt(d.saving)} مقارنة بـ15 أكتوبر</div>`:'<div class="tiny text-red">Peak demand date</div>'}<button class="btn btn-soft btn-sm btn-block" style="margin-top:14px" onclick="toast('اتحدد '+ '${d.day}' +' كبداية بحث جديدة')">شوف القاعات</button></div>`).join('')}</div>
  <div class="grid-2" style="margin-top:18px"><div class="card card-pad"><div class="panel-head"><strong>Smart alternative</strong><span class="badge green">Best value</span></div><h3>Royal Garden — 16 أكتوبر</h3><p class="small muted">نفس القاعة، اليوم اللي بعده، وأوفر بحوالي 12,000 ج.م.</p><button class="btn btn-primary btn-sm" onclick="navTo('venue/royal-garden')">افتح القاعة</button></div><div class="card card-pad"><div class="panel-head"><strong>Waitlist</strong><span class="badge orange">#2</span></div><h3>لو لازم 15 أكتوبر</h3><p class="small muted">انضم للـWaitlist. لو Hold اتلغى أو Booking اتفسخ، المنصة تبعتلك إشعار حسب ترتيبك.</p><button class="btn btn-light btn-sm" onclick="toast('اتضافت للـWaitlist — ترتيبك #2')">Join Waitlist</button></div></div></div></section>`)
}

function dateDropPage(){
  const deals=[
    {name:'Lake House',area:'New Cairo',date:'22 أكتوبر',old:150000,now:115000,left:'17h 42m',photo:venuePhotos.lake},
    {name:'Nile Palace',area:'Maadi',date:'29 أكتوبر',old:165000,now:128000,left:'31h 10m',photo:venuePhotos.nile},
    {name:'Garden 37',area:'Sheikh Zayed',date:'8 أكتوبر',old:138000,now:105000,left:'09h 05m',photo:venuePhotos.garden}
  ];
  return shell(`<section class="section soft"><div class="container"><div class="breadcrumb"><a href="#/home">الرئيسية</a> / DateDrop</div><div class="section-head"><div><div class="kicker">Last-minute inventory</div><h1 class="title">DateDrop — اليوم الفاضي مايبقاش خسارة</h1><p class="section-copy">صاحب القاعة ينزل تاريخ فاضي فجأة بسعر خاص لمدة محدودة، والعميل يشوف فرصة حقيقية بدل ما اليوم يعدي بدون Booking.</p></div><span class="badge orange">Live deal simulation</span></div>
  <div class="grid-3">${deals.map((d,i)=>`<article class="card venue-card hover"><div class="venue-photo" style="background-image:url('${d.photo}')"><span class="badge white photo-badge">🔥 DateDrop</span><div class="photo-bottom"><span>${d.date}<br><strong>${d.area}</strong></span><strong>${d.left}</strong></div></div><div class="venue-body"><div class="venue-name">${d.name}</div><div style="display:flex;gap:9px;align-items:center;margin:12px 0"><del class="small muted">${fmt(d.old)}</del><strong style="font-size:21px;color:var(--green)">${fmt(d.now)}</strong></div><span class="badge green">وفر ${fmt(d.old-d.now)}</span><button class="btn btn-primary btn-block" style="margin-top:14px" onclick="${i===0?"navTo('venue/lake-house')":"toast('العرض اتضاف للقائمة')"}">احجز العرض ←</button></div></article>`).join('')}</div>
  <div class="card card-pad" style="margin-top:18px"><div class="section-head" style="margin-bottom:0"><div><strong>Venue-side idea</strong><p class="small muted" style="margin-bottom:0">VenueOS يكتشف الأيام الفاضية في الـ30 يوم الجايين ويقترح DateDrop + نسبة خصم مناسبة حسب الطلب.</p></div><button class="btn btn-soft" onclick="setPersona('venue','venue-os/packages')">شوف Pricing في VenueOS</button></div></div></div></section>`)
}

function requestOffersPage(){
  const offers=[
    {name:'Luma Hall',price:129000,extra:'Free basic decoration',time:'6 min',score:91},
    {name:'Royal Garden',price:135000,extra:'Visit priority + valet',time:'12 min',score:95},
    {name:'Garden 37',price:142000,extra:'Premium sound included',time:'18 min',score:83}
  ];
  return shell(`<section class="section white"><div class="container"><div class="breadcrumb"><a href="#/home">الرئيسية</a> / Request Offers</div><div class="section-head"><div><div class="kicker">Reverse Marketplace</div><h1 class="title">قول أنت عايز إيه، وخلي القاعات تتنافس على الطلب</h1><p class="section-copy">بدل Search طويل، العميل ينشر Brief واضح. القاعات المناسبة فقط تبعت Offer، والمنصة ترتب العروض بالسعر والتطابق والتوافر.</p></div></div><div class="grid-2" style="align-items:start"><div class="card card-pad"><h3>طلب المناسبة</h3><div class="form-grid"><div class="field"><label>التاريخ</label><input value="15 أكتوبر 2027"></div><div class="field"><label>المكان</label><input value="New Cairo"></div><div class="field"><label>الضيوف</label><input value="300"></div><div class="field"><label>الميزانية</label><input value="140,000 EGP"></div><div class="field full"><label>المطلوب</label><textarea>Outdoor preferred, parking, good buffet, visit this week.</textarea></div></div><button class="btn btn-primary btn-block" style="margin-top:12px" onclick="toast('الطلب اتنشر لـ 9 قاعات مناسبة — 3 عروض وصلوا')">انشر الطلب للقاعات المناسبة</button><p class="tiny muted">Demo only — لا يتم إرسال أي طلب حقيقي.</p></div><div><div class="panel-head"><div><strong>3 offers received</strong><div class="tiny muted">مرتبة حسب Best Match</div></div><span class="live">Offers live</span></div>${offers.map((o,i)=>`<div class="card card-pad" style="margin-bottom:10px;${i===0?'border-color:#d7b3cb':''}"><div style="display:flex;justify-content:space-between;gap:12px"><div><strong>${o.name}</strong><div class="tiny muted">رد خلال ${o.time}</div></div><span class="badge ${i===0?'blue':'gray'}">${o.score}% match</span></div><div class="metric-value" style="font-size:21px">${fmt(o.price)}</div><div class="small text-green">+ ${o.extra}</div><div style="display:flex;gap:7px;margin-top:12px"><button class="btn btn-primary btn-sm" onclick="navTo('${i===1?'venue/royal-garden':'compare'}')">راجع العرض</button><button class="btn btn-light btn-sm" onclick="toast('تم إرسال رسالة Mock للقاعة')">Message</button></div></div>`).join('')}</div></div>
  <div class="grid-3" style="margin-top:18px"><div class="card card-pad"><strong>Qualified supply only</strong><p class="small muted">الطلب يروح للقاعات المتاحة والمناسبة للسعة والميزانية فقط.</p></div><div class="card card-pad"><strong>Offer expiry</strong><p class="small muted">كل Offer له مدة، فيقل الـghosting ويزيد القرار السريع.</p></div><div class="card card-pad"><strong>Venue lead source</strong><p class="small muted">كل Request يتحول Lead داخل VenueOS CRM مع source واضح.</p></div></div></div></section>`)
}

function enhanceIdeaCards(){
  document.querySelectorAll('.card.card-pad strong').forEach(el=>{
    const t=el.textContent.trim(); const card=el.closest('.card'); if(!card)return;
    if(t==='Flexible Dates'){card.style.cursor='pointer';card.onclick=()=>navTo('flexible-dates')}
    if(t==='DateDrop'){card.style.cursor='pointer';card.onclick=()=>navTo('datedrop')}
    if(t==='Reverse Marketplace'){card.style.cursor='pointer';card.onclick=()=>navTo('request-offers')}
  });
}

function renderExtra(){
  const r=extraRoute(); let html=null;
  if(r==='flexible-dates') html=flexibleDatesPage();
  if(r==='datedrop') html=dateDropPage();
  if(r==='request-offers') html=requestOffersPage();
  if(html) document.querySelector('#app').innerHTML=html;
  enhanceIdeaCards();
}

window.addEventListener('hashchange',()=>setTimeout(renderExtra,0));
document.addEventListener('DOMContentLoaded',()=>setTimeout(renderExtra,0));
