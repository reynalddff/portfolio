document.getElementById('yr').textContent=new Date().getFullYear();
const root=document.documentElement,tb=document.getElementById('themeBtn');
tb.onclick=()=>{const d=root.dataset.theme==='dark';root.dataset.theme=d?'light':'dark';
  tb.setAttribute('aria-pressed',String(!d));tb.setAttribute('aria-label',d?'Switch to dark mode':'Switch to light mode');};

document.getElementById('mq').innerHTML=(()=>{const s='<span>Usability Testing</span><span>·</span><span>Design systems</span><span>·</span><span>Vibe Coding</span><span>·</span><span>Prototyping</span><span>·</span><span>AI Mindset</span><span>·</span>';return s+s+s+s;})();

const P=[
 {n:'Case 01',t:'Solving the 15% Conversion Bottleneck',p:'FLIK Checkout: Buy or Walk Away.',s:'kin1'},
 {n:'Case 02',t:'Generated Rp 6 Billion with Smart Offline Sales',p:'FLIK O2O: Where Offline Meets Online.',s:'kin2'},
 {n:'Case 03',t:'Redesign Pricing, Unlocked 200% More Subscriptions',p:'SIRCLO: Redesign Billing & Plans.',s:'kin3'},
 {n:'Case 04',t:'Exposing Cart Abandonment at UNIQLO ID',p:'UNIQLO: Cart Abandonment.',s:'kin4'}
];
document.getElementById('grid').innerHTML=P.map(x=>`
<article class="proj reveal">
 <div class="img"><img loading="lazy" alt="" src="https://picsum.photos/seed/${x.s}/900/620"></div>
 <div class="b"><div class="n">${x.n}</div><h3><a href="#work">${x.t}</a></h3><p>${x.p}</p>
</article>`).join('');

const STAR='<svg viewBox="0 0 20 20"><path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L10 15l-5.6 3.1 1.4-6.3L1 8.5l6.4-.6z"/></svg>';
const stars=n=>`<div class="stars">${STAR.repeat(n)}</div>`;
const T=[
 {n:'Sarah Kinanti',r:'Head of Product, SIRCLO',s:'kin1',rate:5,
  q:'Reynald turned our messy billing flow into something the team could actually ship. Subscriptions jumped 200% within the quarter.'},
 {n:'Bagas Herlambang',r:'CEO, FLIK',s:'kin2',rate:5,
  q:'He does not just design screens, he designs for the metric. The O2O flow he built moved Rp6B in GMV.'},
 {n:'Dinda Prameswari',r:'Engineering Lead, FLIK',s:'kin3',rate:5,
  q:'Handoff with Reynald is painless. His files survive contact with engineering, which is rarer than it should be.'},
 {n:'Farrel Nugroho',r:'PM, UNIQLO Digital',s:'kin4',rate:4,
  q:'Cut our cart abandonment meaningfully in one sprint cycle. Sharp on both research and execution.'},
//  {n:'Michelle Adisty',r:'Design Director, Rakamin',s:'kin5',rate:5,
//   q:'As a mentor he pushed our juniors to defend decisions with data, not opinion. That habit stuck.'},
//  {n:'Yusuf Pratama',r:'CTO, SKILVUL',s:'kin6',rate:5,
//   q:'Rare mix: strong enterprise UX instincts plus enough engineering fluency to argue scope honestly.'},
];
const av=s=>`https://picsum.photos/seed/${s}/120/120`;
document.getElementById('t1').innerHTML=T.slice(0,6).map(t=>`
<div class="card">
  ${stars(t.rate)}
  <p>&ldquo;${t.q}&rdquo;</p>
  <div class="who"><img loading="lazy" alt="" src="${av(t.s)}"><div><b>${t.n}</b><span>${t.r}</span></div></div>
</div>`).join('');

const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* hero: magnetic tile field pushed by cursor */
const cv=document.getElementById('tiles'),cx=cv.getContext('2d');
let W,H,cells=[],mx=-9999,my=-9999,dpr=Math.min(devicePixelRatio||1,2);
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function css(v){return getComputedStyle(root).getPropertyValue(v).trim()}
function build(){
  W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
  const s=Math.max(48,Math.min(76,W/18));cells=[];
  for(let y=0;y<H+s;y+=s)for(let x=0;x<W+s;x+=s){
    cells.push({hx:x,hy:y,x,y,vx:0,vy:0,s:s*0.62,r:Math.random()*6.283,vr:0,
      c:['--pop','--pop2','--pop3'][Math.floor(Math.random()*3)],fill:Math.random()>.62});
  }
}
function frame(){
  cx.clearRect(0,0,W,H);
  const edge=css('--edge');
  for(const c of cells){
    const dx=c.x-mx,dy=c.y-my,d=Math.hypot(dx,dy);
    if(d<190&&d>0.01){const f=(1-d/190)*3.4;c.vx+=dx/d*f;c.vy+=dy/d*f;c.vr+=f*0.012;}
    c.vx+=(c.hx-c.x)*0.045;c.vy+=(c.hy-c.y)*0.045;
    c.vx*=0.86;c.vy*=0.86;c.vr*=0.9;
    c.x+=c.vx;c.y+=c.vy;c.r+=c.vr;
    const disp=Math.hypot(c.x-c.hx,c.y-c.hy);
    const a=0.10+Math.min(0.75,disp/58);
    cx.save();cx.translate(c.x,c.y);cx.rotate(c.r);cx.globalAlpha=a;
    if(c.fill){cx.fillStyle=css(c.c);cx.fillRect(-c.s/2,-c.s/2,c.s,c.s);}
    cx.strokeStyle=edge;cx.lineWidth=2;cx.strokeRect(-c.s/2,-c.s/2,c.s,c.s);
    cx.restore();
  }
  requestAnimationFrame(frame);
}
addEventListener('resize',build);
addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
addEventListener('pointerleave',()=>{mx=my=-9999});
build();
if(!reduce)frame();else{const edge=css('--edge');cells.forEach(c=>{cx.globalAlpha=.12;cx.strokeStyle=edge;cx.lineWidth=2;cx.strokeRect(c.x-c.s/2,c.y-c.s/2,c.s,c.s)})}
