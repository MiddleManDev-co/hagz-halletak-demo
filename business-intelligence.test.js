const fs=require('fs');const assert=require('assert');
const js=fs.readFileSync('business-intelligence.js','utf8');
const css=fs.readFileSync('business-intelligence.css','utf8');
const index=fs.readFileSync('index.html','utf8');
const workflow=fs.readFileSync('.github/workflows/pages.yml','utf8');
for(const marker of ["a==='business-center'","a==='revenue-intelligence'","a==='action-center'","a==='economics'","a==='marketplace-health'","p==='strategy-simulator'"])assert(js.includes(marker),`missing BI route ${marker}`);
for(const concept of ['Break-even','Pricing Simulator','Platform Economics','LTV/CAC','Marketplace Health','Availability reliability','Strategic Simulator','Business Intelligence Tour'])assert(js.includes(concept),`missing BI concept ${concept}`);
assert(js.includes("qs.get('tour')==='business'"),'business share tour missing');
assert(js.includes('hhStopTour'),'business tour must stop existing navigator tour');
assert(css.includes('@media(max-width:760px)'),'tablet/mobile responsive marker missing');
assert(css.includes('@media(max-width:520px)'),'small mobile responsive marker missing');
assert(index.includes('business-intelligence.css'),'index missing BI css');
assert(index.includes('business-intelligence.js'),'index missing BI js');
assert(workflow.includes('node --check business-intelligence.js'),'workflow missing BI syntax check');
assert(workflow.includes('node business-intelligence.test.js'),'workflow missing BI test');

// The investor CTA is a full-size panel. It must land in page content, never in
// the header: `.topbar-inner` carries class="container topbar-inner", so an
// unscoped '.main-panel,.container' lookup matched the top bar first and
// injected a 200px panel into a 70px chrome row.
{
  const target=/if\(p==='investor'\)\{const t=document\.querySelector\('([^']+)'\)/.exec(js);
  assert(target,'investor CTA target lookup not found');
  const sel=target[1];
  for(const part of sel.split(',')){
    assert(part.trim().startsWith('#app '),`investor CTA target must be scoped under #app, got: ${part.trim()}`);
  }
  assert(!/(^|,)\s*\.container/.test(sel),'investor CTA target must not match a bare .container (the top bar is one)');
  assert(!/topbar|header/i.test(sel),'investor CTA target must never reference the header/topbar');
  // structural guarantee: the header is outside #app in the document
  const app=index.indexOf('id="app"'), bar=index.indexOf('class="topbar"');
  assert(bar>-1&&app>-1&&bar<app,'topbar must precede #app so an #app-scoped selector cannot reach it');
  assert(/<div id="app"/.test(index),'#app must be a distinct container element');
}

console.log('business intelligence tests passed');