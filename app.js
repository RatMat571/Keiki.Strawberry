'use strict';
const PH='gatito.jpg';
/* ===== Keiki Strawberry · catálogo ===== */
const KEY='keiki.catalogo.v2',CKEY='keiki.carrito.v2',AKEY='keiki.a11y.v2';
const DEFAULT={
 wa:'56900000000',
 ph:'',
 site:{
  abT:'Quiénes somos',
  abP:'Somos Keiki Strawberry, un emprendimiento con cariño por los detalles. Seleccionamos maquillaje y ropa para toda la familia y coordinamos cada entrega directamente contigo.',
  logo:'',
  ann:'Pedidos por WhatsApp · Envíos en Chillán y San Carlos',
  ig:'keiki.strawberry',
  tk:'https://www.tiktok.com/@shopkeiki',
  fb:'https://www.facebook.com/profile.php?id=61594811323224',
  hr:'Lunes a sábado, 10:00 a 19:00',
  ub:'Chillán - San Carlos',
  fs:0,
  pn:3,
  pp:10,
  faq:[
   {id:'f1',q:'¿Cómo hago mi pedido?',a:'Agrega los productos al carrito, completa tus datos y pulsa «Enviar pedido por WhatsApp». Te responderemos para confirmar.'},
   {id:'f2',q:'¿Cómo puedo pagar?',a:'Coordinamos el pago contigo por WhatsApp al confirmar tu pedido.'},
   {id:'f3',q:'¿Cómo son las entregas?',a:'Coordinamos la entrega directamente contigo en Chillán y San Carlos.'}
  ],
  slides:[
   {id:'sl1',img:'',t:'Paleta rosa 9 tonos',d:'Uno de nuestros favoritos'},
   {id:'sl2',img:'',t:'Novedades de temporada',d:'Mira lo último que llegó'}
  ]
 },
 cats:[
  {id:'maq',name:'Maquillaje',icon:'💄',subs:[{id:'ojos',name:'Sombras de ojos',items:[{id:'p1',n:'Paleta rosa 9 tonos',p:5990,s:8,dt:true,d:'Tonos rosados y neutros, acabado satinado.',img:''},{id:'p2',n:'Sombra individual perla',p:2490,s:0,d:'Alta pigmentación.',img:''}]},{id:'lab',name:'Labiales',items:[]}]},
  {id:'nino',name:'Ropa niño',icon:'👦',subs:[{id:'pn',name:'Poleras',items:[]}]},
  {id:'nina',name:'Ropa niña',icon:'👧',subs:[{id:'vn',name:'Vestidos',items:[]}]},
  {id:'muj',name:'Ropa mujer',icon:'👗',subs:[{id:'bl',name:'Blusas',items:[]}]},
  {id:'hom',name:'Ropa hombre',icon:'👕',subs:[{id:'ph',name:'Poleras',items:[]}]}
 ]
};
const mig=o=>{
 const base=o&&typeof o==='object'?o:{};
 base.site={...DEFAULT.site,...(base.site||{})};
 const annVal=String(base.site.ann||'').trim();
 if(!annVal||/env[ií]os?\s+a\s+todo\s+chile/i.test(annVal)){
  base.site.ann=DEFAULT.site.ann;
 }

 const igVal=String(base.site.ig||'').trim();
 if(!igVal||igVal==='keikistrawberry')base.site.ig='keiki.strawberry';
 else base.site.ig=igVal;

 const tkVal=String(base.site.tk||'').trim();
 if(!tkVal||tkVal==='keikistrawberry'||tkVal==='keiki.strawberry')base.site.tk='https://www.tiktok.com/@shopkeiki';
 else base.site.tk=tkVal;

 const fbVal=String(base.site.fb||'').trim();
 if(!fbVal||fbVal==='keikistrawberry'||fbVal==='keiki.strawberry')base.site.fb='https://www.facebook.com/profile.php?id=61594811323224';
 else base.site.fb=fbVal;

 base.site.fs=0;
 if(base.site.ub==='Chile')base.site.ub='Chillán - San Carlos';
 if(!Array.isArray(base.cats)||!base.cats.length)base.cats=structuredClone(DEFAULT.cats);
 return base;
};
const $=(s,r=document)=>r.querySelector(s),clp=n=>'$'+Number(n||0).toLocaleString('es-CL'),uid=()=>Math.random().toString(36).slice(2,9);
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch{return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{toast('No se pudo guardar: almacenamiento lleno')}}};
let S=mig(store.get(KEY)||structuredClone(DEFAULT));
let cart=store.get(CKEY)||{},admin=false;const openIds=new Set();
function h(t,a={},...k){const e=document.createElement(t);for(const[x,v]of Object.entries(a)){if(x==='class')e.className=v;else if(x.startsWith('on'))e.addEventListener(x.slice(2),v);else if(v!=null&&v!==false)e.setAttribute(x,v===true?'':v)}k.flat().forEach(c=>e.append(c instanceof Node?c:document.createTextNode(c??'')));return e}
const all=()=>S.cats.flatMap(c=>c.subs.flatMap(s=>s.items.map(i=>({...i,cat:c.name,sub:s.name}))));
const save=()=>store.set(KEY,S);
save();
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2200)}

/* ---- Fondo de frutillitas parallax ---- */
(function initBerries(){
 const box=$('#bgBerries');if(!box)return;
 const svg='<svg viewBox="0 0 64 64" width="100%" height="100%" fill="none"><path d="M32 16c-12 0-20 8-18 21 2 12 11 21 18 23 7-2 16-11 18-23 2-13-6-21-18-21z" fill="currentColor"/><path d="M20 16c4-6 10-7 12-2 2-5 8-4 12 2-5 2-9 2-12 0-3 2-7 2-12 0z" fill="#2f6b4f"/><path d="M32 6v8" stroke="#2f6b4f" stroke-width="3" stroke-linecap="round"/><circle cx="25" cy="28" r="1.6" fill="#fff"/><circle cx="38" cy="27" r="1.6" fill="#fff"/><circle cx="31" cy="35" r="1.6" fill="#fff"/><circle cx="24" cy="41" r="1.6" fill="#fff"/><circle cx="39" cy="40" r="1.6" fill="#fff"/><circle cx="32" cy="49" r="1.6" fill="#fff"/></svg>';
 const specs=[
  {x:5,y:12,sz:46,sp:.18,r:-14},{x:88,y:18,sz:54,sp:.26,r:18},{x:16,y:46,sz:38,sp:.14,r:22},
  {x:78,y:54,sz:48,sp:.22,r:-20},{x:46,y:28,sz:34,sp:.12,r:10},{x:10,y:78,sz:52,sp:.28,r:-8},
  {x:91,y:82,sz:42,sp:.16,r:15},{x:54,y:72,sz:40,sp:.2,r:-18},{x:30,y:92,sz:44,sp:.24,r:12},{x:68,y:8,sz:36,sp:.15,r:-12}
 ];
 const nodes=specs.map(s=>{
  const d=h('div',{class:'bg-berry'});
  d.style.cssText=`left:${s.x}%;top:${s.y}%;width:${s.sz}px;height:${s.sz}px;transform:rotate(${s.r}deg)`;
  d.innerHTML=svg;box.append(d);return{el:d,sp:s.sp,r:s.r};
 });
 let ticking=false;
 const upd=()=>{const y=window.scrollY;nodes.forEach(n=>{const dy=(y*n.sp)%380;n.el.style.transform=`translate3d(0,${dy}px,0) rotate(${n.r + y*0.02}deg)`});ticking=false};
 addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(upd);ticking=true}},{passive:true});
})();

/* ---- Accesibilidad ---- */
let A=store.get(AKEY)||{fs:100,hc:0,read:0,ul:0,nomo:0};
function applyA(){const r=document.documentElement;r.style.fontSize=A.fs+'%';['hc','read','ul','nomo'].forEach(k=>r.classList.toggle(k,!!A[k]));store.set(AKEY,A)}
document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const k=b.dataset.a;if(k==='plus')A.fs=Math.min(160,A.fs+10);else if(k==='minus')A.fs=Math.max(80,A.fs-10);else if(k==='reset')A={fs:100,hc:0,read:0,ul:0,nomo:0};else A[k]=A[k]?0:1;applyA()});

/* ---- Estado de vista integrada del catálogo ---- */
let catState={mode:'home',key:'home',label:'',catId:null,subId:null,sort:'def',only:false,fn:null};
function setCatView(next){
 catState={...catState,...next};
 if(location.hash!=='#catalogo'){location.hash='#catalogo'}else{renderCatalog();side()}
 if(window.innerWidth<900)$('#sideD').open=false;
}
function resetCatalog(){
 catState={mode:'home',key:'home',label:'',catId:null,subId:null,sort:'def',only:false,fn:null};
 renderCatalog();
 side();
}

/* ---- Inicio y renderizado del Catálogo en página ---- */
function tile(o,txt,fn){return h('button',{class:'tile',onclick:fn},h('img',{class:'tm'+(o.img?'':' pl'),src:o.img||PH,alt:'',loading:'lazy'}),h('strong',{},o.name),h('span',{},txt))}

function renderCatalog(){
 const g=$('#cats'),hd=$('#catHead');
 $('#chips').replaceChildren(...[
  ['home','Secciones'],['all','Todo'],['off','Ofertas'],['new','Nuevos'],['fav','Favoritos ('+fav.length+')']
 ].map(([k,l])=>h('button',{class:'chip'+(catState.key===k?' on':''),onclick:()=>k==='home'?resetCatalog():setCatView({mode:'list',key:k,label:l,fn:null,sort:'def',only:false})},l)));

 if(catState.mode==='home'){
  hd.hidden=true;
  g.className='tiles';
  g.replaceChildren(...S.cats.map(c=>tile(c,c.subs.length+(c.subs.length===1?' categoría':' categorías'),()=>setCatView({mode:'cat',key:'cat-'+c.id,catId:c.id,label:c.name}))));
  return;
 }

 hd.hidden=false;
 if(catState.mode==='cat'){
  const c=S.cats.find(x=>x.id===catState.catId);
  if(!c){resetCatalog();return}
  hd.replaceChildren(
   h('div',{class:'cat-title'},h('button',{class:'btn sm',onclick:resetCatalog},'← Secciones'),h('h3',{},(c.icon||'')+' '+c.name)),
   h('span',{class:'mut'},c.subs.length+' subcategorías')
  );
  g.className='tiles';
  g.replaceChildren(...c.subs.map(s=>tile(s,s.items.length+' productos',()=>setCatView({mode:'sub',key:'cat-'+c.id,catId:c.id,subId:s.id,label:s.name,sort:'def',only:false}))));
  return;
 }

 let list=[],title='',backFn=resetCatalog,backTxt='← Secciones';
 if(catState.mode==='sub'){
  const c=S.cats.find(x=>x.id===catState.catId),s=c?.subs.find(x=>x.id===catState.subId);
  if(!c||!s){resetCatalog();return}
  list=[...s.items];
  title=c.name+' › '+s.name;
  backFn=()=>setCatView({mode:'cat',key:'cat-'+c.id,catId:c.id,label:c.name});
  backTxt='← '+c.name;
 }else{
  title=catState.label;
  list=all().filter(i=>{
   if(catState.fn)return catState.fn(i);
   const k=catState.key;
   return k==='dt'?i.dt:k==='off'?ep(i)<i.p:k==='new'?i.nw:k==='fav'?fav.includes(i.id):true;
  });
 }

 if(catState.only)list=list.filter(i=>i.s>0);
 if(catState.sort==='asc')list.sort((a,b)=>ep(a)-ep(b));
 if(catState.sort==='desc')list.sort((a,b)=>ep(b)-ep(a));

 const sel=h('select',{class:'sort','aria-label':'Ordenar productos',onchange:e=>{catState.sort=e.target.value;renderCatalog()}},
  [['def','Ordenar: destacados'],['asc','Menor precio'],['desc','Mayor precio']].map(([v,l])=>h('option',{value:v,selected:v===catState.sort},l))
 );
 const chk=h('label',{class:'chk'},h('input',{type:'checkbox',checked:catState.only,onchange:e=>{catState.only=e.target.checked;renderCatalog()}}),' Solo con stock');

 hd.replaceChildren(
  h('div',{class:'cat-title'},h('button',{class:'btn sm',onclick:backFn},backTxt),h('h3',{},title),h('span',{class:'mut'},'('+list.length+')')),
  h('div',{class:'cat-tools'},chk,sel)
 );

 g.className=list.length?'prods':'';
 g.replaceChildren(...(list.length?list.map(i=>card(i,renderCatalog)):[h('p',{class:'empty'},catState.key==='fav'?'Toca el corazón ♡ de un producto para guardarlo en tus favoritos.':'No encontramos productos con este filtro.')]));
}

function home(){
 renderCatalog();site();dest();side();
 const n=Object.values(cart).reduce((a,b)=>a+b,0);$('#cartN').textContent=n;
}

function modal(title,body,back,cls=''){const m=$('#modal');m.className=cls;m.replaceChildren(h('div',{class:'dh'},back?h('button',{class:'btn sm',onclick:back},'← Volver'):'',h('h2',{},title),h('button',{class:'btn sm','aria-label':'Cerrar',onclick:()=>m.close()},'✕')),h('div',{class:'db'},body),cmp.length>1&&!modal.nf?h('div',{class:'cmpf'},h('button',{class:'btn pri',onclick:cmpView},'Ver comparación ('+cmp.length+')')):'');modal.nf=0;if(!m.open)m.showModal()}

const ep=i=>i.o>0&&i.o<i.p?i.o:i.p;let fav=store.get('keiki.fav')||[];
const pr=i=>ep(i)<i.p?h('span',{class:'price'},clp(ep(i)),' ',h('s',{class:'old'},clp(i.p))):h('span',{class:'price'},clp(i.p));
const stk=i=>h('span',{class:'tag'+(i.s<=0?' out':'')},i.s<=0?'Agotado':i.s<=3?'Quedan '+i.s:'Stock: '+i.s);
const add=(i,fn)=>{cart[i.id]=(cart[i.id]||0)+1;store.set(CKEY,cart);home();toast(i.n+' agregado al carrito');if(fn)fn()};

function card(i,rerender){const left=i.s-(cart[i.id]||0),f=fav.includes(i.id);
 return h('article',{class:'prod'},h('div',{class:'imw'},h('button',{class:'imb','aria-label':'Ver detalle de '+i.n,onclick:()=>detail(i,null)},h('img',{class:'im'+(i.img?'':' pl'),src:i.img||PH,alt:'',loading:'lazy'})),
  h('button',{class:'hrt','aria-label':f?'Quitar de favoritos':'Guardar en favoritos','aria-pressed':String(f),onclick:()=>{fav=f?fav.filter(x=>x!==i.id):[...fav,i.id];store.set('keiki.fav',fav);home();if(rerender)rerender()}},f?'♥':'♡'),
  h('div',{class:'bg'},ep(i)<i.p?h('b',{class:'bo'},'-'+Math.round(100-ep(i)/i.p*100)+'%'):'',i.nw?h('b',{class:'bn'},'Nuevo'):'')),
  h('div',{class:'bd'},h('h3',{},i.n),pr(i),stk(i),cmpBtn(i,rerender),i.d?h('p',{},i.d):''),
  i.s<=0?h('a',{class:'btn',target:'_blank',rel:'noopener',href:'https://wa.me/'+S.wa+'?text='+encodeURIComponent('Hola, avísame cuando vuelva a haber stock de: '+i.n)},'Avísame cuando llegue'):h('button',{class:'btn pri',disabled:left<=0,onclick:()=>add(i,rerender)},left<=0?'Máximo en carrito':'Agregar al carrito'))}

function detail(i,back){const left=i.s-(cart[i.id]||0);
 modal(i.n,h('div',{class:'det'},h('img',{class:i.img?'':'pl',src:i.img||PH,alt:i.img?i.n:'Imagen de ejemplo'}),h('div',{class:'f'},pr(i),stk(i),h('p',{},i.d||'Sin descripción.'),h('button',{class:'btn pri big',disabled:left<=0,onclick:()=>add(i,()=>detail(i,back))},left<=0?'No disponible':'Agregar al carrito'),h('a',{class:'btn',target:'_blank',rel:'noopener',href:'https://wa.me/'+S.wa+'?text='+encodeURIComponent('Hola, me interesa: '+i.n+' ('+clp(ep(i))+')')},'Consultar por WhatsApp'),h('button',{class:'btn',onclick:()=>{const t=i.n+' · '+clp(ep(i))+' en Keiki Strawberry',u=location.href.split('#')[0];if(navigator.share)navigator.share({title:i.n,text:t,url:u}).catch(()=>{});else window.open('https://wa.me/?text='+encodeURIComponent(t+' '+u),'_blank','noopener')}},'Compartir'))),back)}

/* ---- Buscador predictivo y filtrado directo en catálogo ---- */
const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const lev=(a,b)=>{if(Math.abs(a.length-b.length)>1)return 9;let p=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){const c=[i];for(let j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[b.length]};
const hit=(i,T)=>{const x=norm(i.n+' '+i.d+' '+i.sub+' '+i.cat),W=x.split(/\s+/);return T.every(t=>x.includes(t)||(t.length>3&&W.some(w=>lev(t,w)<=1)))};
const sug=h('div',{class:'sug',hidden:true});$('.search').append(sug);const hideS=()=>{sug.hidden=true};
$('#q').addEventListener('input',e=>{const raw=e.target.value.trim();if(raw.length<3){hideS();return}const T=norm(raw).split(/\s+/),r=all().filter(i=>hit(i,T)).slice(0,5);
 sug.replaceChildren(...(r.length?r.map(i=>h('button',{type:'button',class:'sg1',onclick:()=>{hideS();detail(i,null)}},h('img',{src:i.img||PH,alt:''}),h('span',{},h('b',{},i.n),h('small',{},clp(ep(i))+' · '+(i.s>0?'Stock: '+i.s:'Agotado'))))):[h('p',{class:'mut'},'Sin coincidencias. Pulsa Buscar para ver más.')]));sug.hidden=false});
document.addEventListener('click',e=>{if(!e.target.closest('.search'))hideS()});$('#q').addEventListener('keydown',e=>{if(e.key==='Escape')hideS()});
$('.search').addEventListener('submit',e=>{
 hideS();e.preventDefault();
 const raw=$('#q').value.trim();if(!raw){toast('Escribe qué quieres buscar');return}
 const T=norm(raw).split(/\s+/);
 setCatView({mode:'list',key:'search',label:'Resultados para «'+raw+'»',fn:i=>hit(i,T),sort:'def',only:false});
 $('#q').blur();
});
$('#modal').addEventListener('close',()=>{delete $('#modal').dataset.s;$('#modal').className='';home()});

/* ---- Carrito (sin entrega ni costo de envío) ---- */
const ck=store.get('keiki.ck')||{n:'',nt:''};
function cartView(){
 const d=$('#cart'),L=all(),ids=Object.keys(cart).filter(k=>cart[k]>0&&L.find(i=>i.id===k)),b=h('div',{class:'db'}),sv=(k,v)=>{ck[k]=v;store.set('keiki.ck',ck)};
 let t=0,lines='';const cf=h('div',{class:'cart-ft'});
 if(!ids.length)b.append(h('p',{class:'empty'},'Tu carrito está vacío. Explora el catálogo y agrega tus favoritos.'));
 ids.forEach(k=>{
  const i=L.find(x=>x.id===k),q=cart[k];
  t+=ep(i)*q;
  lines+='• '+q+' × '+i.n+' ('+clp(ep(i))+' c/u)\n';
  b.append(h('div',{class:'line'},
   h('strong',{},i.n),
   h('span',{},clp(ep(i)*q)),
   h('div',{class:'qty'},
    h('button',{class:'btn sm','aria-label':'Quitar uno',onclick:()=>{cart[k]--;store.set(CKEY,cart);cartView()}},'−'),
    h('span',{'aria-live':'polite'},q),
    h('button',{class:'btn sm','aria-label':'Agregar uno',disabled:q>=i.s,onclick:()=>{cart[k]++;store.set(CKEY,cart);cartView()}},'+')
   ),
   h('button',{class:'link',onclick:()=>{delete cart[k];store.set(CKEY,cart);cartView()}},'Quitar')
  ));
 });
 const units=ids.reduce((a,k)=>a+cart[k],0),disc=S.site.pp>0&&units>=S.site.pn?Math.round(t*S.site.pp/100):0,tot=t-disc;
 if(ids.length){
  const nm=h('input',{type:'text',autocomplete:'name',placeholder:'Tu nombre',value:ck.n||''});
  const nt=h('textarea',{rows:2,placeholder:'Ej: talla, tono o sector en Chillán / San Carlos…'});
  nt.value=ck.nt||'';
  nm.oninput=()=>sv('n',nm.value);
  nt.oninput=()=>sv('nt',nt.value);
  b.append(
   S.site.pp>0&&units<S.site.pn?h('p',{class:'mut'},'Lleva '+S.site.pn+' productos y ahorra '+S.site.pp+'% (te faltan '+(S.site.pn-units)+').'):'',
   h('div',{class:'f'},h('label',{},'Tu nombre',nm),h('label',{},'Comentarios (talla, color, sector…)',nt)),
  );
  cf.append(
   disc?h('div',{class:'line'},h('span',{},'Descuento pack ('+S.site.pp+'%)'),h('strong',{},'−'+clp(disc))):'',
   h('div',{class:'tot'},h('span',{},'Total'),h('span',{},clp(tot))),
   h('button',{class:'btn pri big',onclick:()=>{
    const m='Hola Keiki Strawberry 🍓, quiero hacer este pedido:\n'+lines+'\n'+(disc?'Descuento pack: -'+clp(disc)+'\n':'')+'Total: '+clp(tot)+'\n'+(ck.n?'Nombre: '+ck.n+'\n':'')+(ck.nt?'Comentarios: '+ck.nt:'');
    window.open('https://wa.me/'+S.wa+'?text='+encodeURIComponent(m),'_blank','noopener');
   }},'Enviar pedido por WhatsApp'),
   h('button',{class:'link',onclick:()=>{cart={};store.set(CKEY,cart);cartView()}},'Vaciar carrito')
  );
 }
 d.replaceChildren(h('div',{class:'dh'},h('h2',{},'Tu carrito'),h('button',{class:'btn sm','aria-label':'Cerrar',onclick:()=>d.close()},'✕')),b,...(ids.length?[cf]:[]));
 if(!d.open)d.showModal();
 home();
}
$('#cartBtn').onclick=cartView;

/* ---- Administración (Rediseñada: clara, bonita y fácil en PC y móvil) ---- */
let adminTab='prod',admQ='';
async function sha(s){const x=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(x)].map(v=>v.toString(16).padStart(2,'0')).join('')}
function login(){
 const first=!S.ph;
 const pw=h('input',{type:'password',minlength:6,placeholder:'Mínimo 6 caracteres',autocomplete:first?'new-password':'current-password'});
 const err=h('p',{role:'alert',style:'color:#b01c46;font-weight:700;margin:0'});
 const go=async()=>{
  if(pw.value.length<6){err.textContent='Usa al menos 6 caracteres.';return}
  const x=await sha(pw.value);
  if(first){S.ph=x;save()}
  else if(x!==S.ph){err.textContent='Contraseña incorrecta. Inténtalo de nuevo.';return}
  admin=true;adminView();
 };
 pw.onkeydown=e=>{if(e.key==='Enter')go()};
 modal('Acceso Administrador',h('div',{class:'f',style:'max-width:400px;margin:auto;padding:.5rem 0'},
  h('p',{class:'mut',style:'margin:0'},first?'Crea una contraseña para proteger la edición de tu tienda.':'Ingresa tu contraseña para administrar el catálogo.'),
  h('label',{},'Contraseña',pw),
  err,
  h('button',{class:'btn pri big',onclick:go},first?'Crear contraseña y entrar':'Entrar al panel')
 ));
 pw.focus();
}

function fld(o,k,l,type,area,ph='',onUpd){
 const e=h(area?'textarea':'input',{type:area?null:type||'text',min:type==='number'?0:null,rows:area?2:null,placeholder:ph||null});
 e.value=o[k]??'';
 e.oninput=()=>{
  o[k]=type==='number'?Math.max(0,+e.value||0):e.value;
  save();home();
  if(onUpd)onUpd(o[k]);
 };
 return h('label',{class:'adm-fld'},h('span',{class:'adm-lbl'},l),e);
}
function del(fn,lbl='Eliminar'){
 const b=h('button',{type:'button',class:'btn sm danger'},lbl);
 let a=0;
 b.onclick=()=>{
  if(a){fn();save();adminView();toast('Eliminado')}
  else{a=1;b.textContent='¿Seguro? Pulsa de nuevo';setTimeout(()=>{a=0;b.textContent=lbl},3000)}
 };
 return b;
}
function det(id,t,badge,forceOpen,...k){
 const d=h('details',{class:'adm-sec',ontoggle:e=>{if(e.target===d)d.open?openIds.add(id):openIds.delete(id)}},
  h('summary',{},h('span',{class:'adm-sec-t'},t),badge?h('span',{class:'adm-badge'},badge):''),
  h('div',{class:'adm-sec-body'},...k)
 );
 d.open=forceOpen||openIds.has(id);
 return d;
}
function resize(file,mx=700,png){return new Promise((ok,no)=>{const im=new Image();im.onload=()=>{const k=Math.min(1,mx/Math.max(im.width,im.height)),c=h('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);ok(png?c.toDataURL('image/png'):c.toDataURL('image/jpeg',.8))};im.onerror=no;im.src=URL.createObjectURL(file)})}
function imgFld(o,k,l,st,mx,png){
 const v=o[k];
 const inp=h('input',{type:'file',accept:'image/*',hidden:true,onchange:async e=>{
  const f=e.target.files[0];
  if(f){try{o[k]=await resize(f,mx,png);save();home();adminView();toast('Foto actualizada')}catch{st.textContent='⚠ No se pudo leer la imagen.'}}
 }});
 return h('div',{class:'adm-fld'},
  h('span',{class:'adm-lbl'},l),
  h('div',{class:'img-box'},
   v?h('img',{class:'thumb',src:v,alt:''}):h('div',{class:'thumb-empty'},'Sin foto'),
   h('div',{class:'img-acts'},
    h('button',{type:'button',class:'btn sm soft',onclick:()=>inp.click()},v?'Cambiar foto':'Subir foto'),
    v?h('button',{type:'button',class:'link sm',onclick:()=>{delete o[k];save();home();adminView();toast('Foto quitada')}},'Quitar'):''
   ),
   inp
  )
 );
}

function adminView(){
 const sc=$('#modal .db')?.scrollTop||0;
 const st=h('span',{class:'adm-status',role:'status'},'● Cambios guardados automáticamente');
 const AL=all(),outN=AL.filter(i=>i.s<=0).length,lowN=AL.filter(i=>i.s>0&&i.s<=3).length;

 const top=h('div',{class:'adm-top'},
  h('div',{class:'adm-bar'},
   st,
   h('button',{type:'button',class:'btn sm',onclick:()=>{admin=false;$('#modal').close()}},'Salir del panel')
  ),
  h('div',{class:'adm-kpis'},
   h('div',{class:'kpi'},h('b',{},S.cats.length),h('span',{},'Secciones')),
   h('div',{class:'kpi'},h('b',{},AL.length),h('span',{},'Productos')),
   h('div',{class:'kpi warn'},h('b',{},lowN),h('span',{},'Poco stock')),
   h('div',{class:'kpi bad'},h('b',{},outN),h('span',{},'Agotados'))
  ),
  h('div',{class:'adm-tabs',role:'tablist'},
   [['prod','🛍️ Productos'],['site','🏪 Tienda e inicio'],['cfg','⚙️ Respaldo y clave']].map(([k,l])=>
    h('button',{type:'button',class:'adm-tab',role:'tab','aria-selected':String(adminTab===k),onclick:()=>{adminTab=k;adminView()}},l)
   )
  )
 );

 const body=h('div');

 if(adminTab==='prod'){
  const qNorm=norm(admQ.trim());
  const qInp=h('input',{type:'search',placeholder:'Buscar producto por nombre...',value:admQ,oninput:e=>{admQ=e.target.value;adminView();const el=$('#modal input[type=search]');if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length)}}});
  body.append(
   h('div',{class:'adm-toolbar'},
    h('div',{class:'adm-search'},qInp,admQ?h('button',{type:'button',class:'link sm',onclick:()=>{admQ='';adminView()}},'Limpiar'):''),
    h('button',{type:'button',class:'btn pri',onclick:()=>{const id=uid();S.cats.push({id,name:'Nueva sección',icon:'🍓',subs:[]});openIds.add(id);save();adminView();toast('Sección creada')}},'+ Nueva sección')
   )
  );

  let shownCats=0;
  S.cats.forEach(c=>{
   const matchCat=!qNorm||norm(c.name).includes(qNorm)||c.subs.some(s=>norm(s.name).includes(qNorm)||s.items.some(i=>norm(i.n+' '+i.d).includes(qNorm)));
   if(!matchCat)return;
   shownCats++;

   const totalProds=c.subs.reduce((n,s)=>n+s.items.length,0);
   const secBody=[];

   if(!qNorm){
    secBody.push(h('div',{class:'adm-sec-cfg'},
     h('div',{class:'adm-grid'},
      fld(c,'name','Nombre de la sección'),
      fld(c,'icon','Emoji decorativo',null,false,'Ej: 💄'),
      imgFld(c,'img','Foto de portada de la sección',st)
     ),
     h('div',{class:'adm-row-end'},del(()=>{S.cats=S.cats.filter(x=>x!==c)},'Eliminar sección completa'))
    ));
   }

   c.subs.forEach(s=>{
    const itemsToShow=qNorm?s.items.filter(i=>norm(i.n+' '+i.d+' '+s.name+' '+c.name).includes(qNorm)):s.items;
    if(qNorm&&!itemsToShow.length&&!norm(s.name).includes(qNorm))return;

    const subBox=h('div',{class:'adm-sub'},
     h('div',{class:'adm-sub-head'},
      h('div',{class:'adm-sub-title'},
       h('span',{class:'adm-pill'},'Subcarpeta'),
       h('strong',{},s.name+' ('+s.items.length+')')
      ),
      !qNorm?del(()=>{c.subs=c.subs.filter(x=>x!==s)},'Eliminar subcarpeta'):''
     )
    );

    if(!qNorm){
     subBox.append(h('div',{class:'adm-grid'},
      fld(s,'name','Nombre de la subcarpeta'),
      imgFld(s,'img','Foto de la subcarpeta',st)
     ));
    }

    itemsToShow.forEach(i=>{
     const titleEl=h('strong',{class:'adm-prod-name'},i.n||'Producto sin nombre');
     const pillsEl=h('div',{class:'adm-pills'});
     const syncPills=()=>{
      pillsEl.replaceChildren(
       i.s<=0?h('span',{class:'adm-pill bad'},'Agotado'):i.s<=3?h('span',{class:'adm-pill warn'},'Stock: '+i.s):h('span',{class:'adm-pill ok'},'Stock: '+i.s),
       i.o>0&&i.o<i.p?h('span',{class:'adm-pill pk'},'Oferta '+clp(i.o)):'',
       i.nw?h('span',{class:'adm-pill'},'Nuevo'):'',
       i.dt?h('span',{class:'adm-pill'},'★ Destacado'):''
      );
     };
     syncPills();

     subBox.append(h('div',{class:'adm-prod'},
      h('div',{class:'adm-prod-top'},
       h('img',{class:'adm-prod-img'+(i.img?'':' pl'),src:i.img||PH,alt:''}),
       h('div',{class:'adm-prod-head'},titleEl,pillsEl)
      ),
      h('div',{class:'adm-prod-fields'},
       fld(i,'n','Nombre del producto',null,false,'Ej: Labial matte rosa',v=>{titleEl.textContent=v||'Producto sin nombre'}),
       fld(i,'p','Precio normal ($)','number',false,'',syncPills),
       fld(i,'o','Precio oferta ($ · 0 = normal)','number',false,'',syncPills),
       fld(i,'s','Cantidad en stock','number',false,'',syncPills),
       imgFld(i,'img','Foto del producto',st),
       h('div',{class:'adm-flags'},
        h('label',{},h('input',{type:'checkbox',checked:!!i.nw,onchange:e=>{i.nw=e.target.checked;save();home();syncPills()}}),'Etiqueta «Nuevo»'),
        h('label',{},h('input',{type:'checkbox',checked:!!i.dt,onchange:e=>{i.dt=e.target.checked;save();home();syncPills()}}),'Mostrar en Destacados')
       ),
       h('div',{class:'adm-prod-full'},fld(i,'d','Descripción corta (opcional)',null,true,'Ej: Tonos rosados, tela suave, tallas disponibles...')),
       h('div',{class:'adm-actions'},
        h('button',{type:'button',class:'btn sm',onclick:()=>{s.items.splice(s.items.indexOf(i)+1,0,{...i,id:uid(),n:i.n+' (copia)'});save();adminView();toast('Producto duplicado')}},'Duplicar'),
        del(()=>{s.items=s.items.filter(x=>x!==i)},'Eliminar')
       )
      )
     ));
    });

    subBox.append(h('button',{type:'button',class:'btn pri sm adm-add-btn',onclick:()=>{s.items.push({id:uid(),n:'Nuevo producto',p:5000,s:5,d:'',img:''});openIds.add(c.id);save();adminView();toast('Producto agregado')}},'+ Agregar producto en «'+s.name+'»'));
    secBody.push(subBox);
   });

   if(!qNorm){
    secBody.push(h('button',{type:'button',class:'btn soft adm-add-btn',onclick:()=>{c.subs.push({id:uid(),name:'Nueva subcarpeta',items:[]});openIds.add(c.id);save();adminView();toast('Subcarpeta agregada')}},'+ Nueva subcarpeta en «'+c.name+'»'));
   }
   body.append(det(c.id,(c.icon||'🍓')+' '+c.name,c.subs.length+' subcarpetas · '+totalProds+' productos',!!qNorm,...secBody));
  });

  if(!shownCats){
   body.append(h('p',{class:'empty'},'No encontramos productos o secciones con «'+admQ+'».'));
  }
 }

 if(adminTab==='site'){
  body.append(
   h('div',{class:'adm-card'},
    h('h3',{},'📱 Contacto, redes y promoción Pack'),
    h('p',{class:'mut',style:'margin:0'},'Configura a qué WhatsApp llegan los pedidos y tus redes sociales.'),
    h('div',{class:'adm-grid'},
     fld(S,'wa','WhatsApp pedidos (con 569...)'),
     fld(S.site,'ann','Texto barra superior de anuncios'),
     fld(S.site,'hr','Horario de atención'),
     fld(S.site,'ub','Ciudad o zona de entrega'),
     fld(S.site,'ig','Instagram (usuario o enlace)'),
     fld(S.site,'tk','TikTok (usuario o enlace)'),
     fld(S.site,'fb','Facebook (enlace)'),
     fld(S.site,'pn','Cantidad mínima para descuento Pack','number'),
     fld(S.site,'pp','Porcentaje descuento Pack % (0 = apagar)','number')
    )
   ),
   h('div',{class:'adm-card'},
    h('h3',{},'🍓 Sección «Quiénes somos» y Logo'),
    h('div',{class:'adm-grid'},
     fld(S.site,'abT','Título de la sección'),
     imgFld(S.site,'logo','Logo de la tienda (PNG sin fondo ideal)',st,500,true),
     h('div',{class:'adm-prod-full'},fld(S.site,'abP','Descripción de tu emprendimiento',null,true))
    )
   ),
   h('div',{class:'adm-card'},
    h('h3',{},'🖼️ Carrusel de portada («Nuestros favoritos»)'),
    h('p',{class:'mut',style:'margin:0'},'Sube fotos horizontales para destacar tus productos o promociones en el inicio.'),
    ...S.site.slides.map((s,k)=>h('div',{class:'adm-slide-row'},
     h('strong',{class:'adm-slide-num'},'Diapositiva '+(k+1)),
     h('div',{class:'adm-grid'},
      imgFld(s,'img','Imagen del banner',st,1400),
      fld(s,'t','Título principal'),
      fld(s,'d','Subtítulo corto')
     ),
     h('div',{class:'adm-row-end'},del(()=>{S.site.slides=S.site.slides.filter(x=>x!==s)},'Quitar diapositiva'))
    )),
    h('button',{type:'button',class:'btn soft adm-add-btn',onclick:()=>{S.site.slides.push({id:uid(),img:'',t:'Nueva promoción',d:''});save();adminView();toast('Diapositiva agregada')}},'+ Agregar imagen al carrusel')
   ),
   h('div',{class:'adm-card'},
    h('h3',{},'❓ Preguntas frecuentes (FAQ)'),
    ...S.site.faq.map((f,k)=>h('div',{class:'adm-slide-row'},
     h('strong',{class:'adm-slide-num'},'Pregunta '+(k+1)),
     h('div',{class:'adm-grid'},
      fld(f,'q','Pregunta'),
      fld(f,'a','Respuesta',null,true)
     ),
     h('div',{class:'adm-row-end'},del(()=>{S.site.faq=S.site.faq.filter(x=>x!==f)},'Quitar pregunta'))
    )),
    h('button',{type:'button',class:'btn soft adm-add-btn',onclick:()=>{S.site.faq.push({id:uid(),q:'Nueva pregunta',a:''});save();adminView();toast('Pregunta agregada')}},'+ Agregar pregunta frecuente')
   )
  );
 }

 if(adminTab==='cfg'){
  const imp=h('input',{type:'file',accept:'application/json',hidden:true,onchange:async e=>{try{const j=JSON.parse(await e.target.files[0].text());if(!Array.isArray(j.cats))throw 0;S=mig(j);save();home();adminView();toast('Catálogo restaurado con éxito')}catch{st.textContent='⚠ El archivo seleccionado no es válido.'}}});
  const newPw=h('input',{type:'password',placeholder:'Escribe la nueva contraseña (mín. 6)',autocomplete:'new-password'});
  body.append(
   h('div',{class:'adm-card'},
    h('h3',{},'💾 Copia de seguridad'),
    h('p',{class:'mut',style:'margin:0'},'Tus cambios se guardan en este navegador. Descarga un archivo de respaldo cada vez que agregues varios productos para no perderlos.'),
    h('div',{class:'adm-cfg-btns'},
     h('button',{type:'button',class:'btn pri',onclick:()=>{const a=h('a',{href:URL.createObjectURL(new Blob([JSON.stringify(S,null,1)],{type:'application/json'})),download:'respaldo-keiki-'+new Date().toISOString().slice(0,10)+'.json'});a.click();toast('Respaldo descargado')}},'Descargar respaldo (.json)'),
     h('button',{type:'button',class:'btn',onclick:()=>imp.click()},'Cargar respaldo (.json)'),
     imp
    )
   ),
   h('div',{class:'adm-card'},
    h('h3',{},'🔒 Cambiar contraseña de administrador'),
    h('div',{class:'adm-grid'},
     h('label',{class:'adm-fld'},h('span',{class:'adm-lbl'},'Nueva contraseña'),newPw),
     h('div',{style:'display:flex;align-items:end'},
      h('button',{type:'button',class:'btn pri',onclick:async()=>{
       if(newPw.value.length>=6){S.ph=await sha(newPw.value);save();newPw.value='';toast('Contraseña actualizada')}
       else toast('Usa al menos 6 caracteres');
      }},'Guardar nueva contraseña')
     )
    )
   )
  );
 }

 modal('Panel de administración',h('div',{},top,body),null,'adm-dialog');
 $('#modal .db').scrollTop=sc;
}

/* ---- Inicio: nosotros, carrusel y footer ---- */
const lnk=(v,p)=>{
 const clean=String(v||'').trim();
 if(!clean)return '';
 if(/^https?:\/\//i.test(clean))return clean;
 return p+encodeURIComponent(clean.replace(/^@/,''))
};

function site(){
 const T=S.site,w='https://wa.me/'+S.wa;
 const igU=lnk(T.ig||'keiki.strawberry','https://instagram.com/');
 const tkU=lnk(T.tk||'https://www.tiktok.com/@shopkeiki','https://www.tiktok.com/@');
 const fbU=lnk(T.fb||'https://www.facebook.com/profile.php?id=61594811323224','https://facebook.com/');
 $('#abT').textContent=T.abT;
 $('#abP').textContent=T.abP;
 $('#abLogo').replaceChildren(T.logo?h('img',{src:T.logo,alt:'Logo de Keiki Strawberry'}):h('div',{class:'berry','aria-hidden':'true'}));
 $('#ann').textContent=T.ann;$('#ann').hidden=!T.ann;
 soc(w,igU,tkU,fbU);faqs();
 $('#packB').hidden=!(T.pp>0);
 $('#packP').textContent='Elige '+T.pn+' productos y ahorra '+T.pp+'%.';
 $('#ftWa').href=w;
 $('#ftIg').href=igU;$('#ftIg').hidden=!igU;
 $('#ftTk').href=tkU;$('#ftTk').hidden=!tkU;
 $('#ftFb').href=fbU;$('#ftFb').hidden=!fbU;
 $('#ftHr').textContent=T.hr;
 $('#ftUb').textContent=T.ub;
 carousel();
}
let ci=0,ct,paused=false;
function carousel(){
 const L=S.site.slides,c=$('#car');clearTimeout(ct);
 if(!L.length){c.hidden=true;return}
 c.hidden=false;ci=Math.min(ci,L.length-1);
 const tr=h('div',{class:'trk'},L.map((s,k)=>h('figure',{class:'sl','aria-hidden':k!==ci,role:'group','aria-label':(k+1)+' de '+L.length},
  h('img',{class:s.img?'':'pl',src:s.img||PH,alt:s.img?s.t||'':''}),
  (s.t||s.d)?h('figcaption',{},s.t?h('strong',{},s.t):'',s.d?h('span',{},s.d):''):''
 )));
 tr.style.transform=`translate3d(-${ci*100}%,0,0)`;
 c.replaceChildren(tr,h('button',{class:'cb prev','aria-label':'Anterior',onclick:()=>go(-1)},'‹'),h('button',{class:'cb next','aria-label':'Siguiente',onclick:()=>go(1)},'›'),h('button',{class:'cb pz','aria-label':paused?'Reanudar carrusel':'Pausar carrusel',onclick:()=>{paused=!paused;carousel()}},paused?'▶':'⏸'),h('div',{class:'dots'},L.map((_,k)=>h('button',{class:k===ci?'on':'','aria-label':'Ir a la imagen '+(k+1),onclick:()=>{ci=k;carousel()}}))));
 if(!paused&&L.length>1&&!A.nomo&&!matchMedia('(prefers-reduced-motion:reduce)').matches)ct=setTimeout(()=>go(1),5000);
}
function go(d){const n=S.site.slides.length;ci=(ci+d+n)%n;carousel()}

/* ---- Destacados y barra lateral ---- */
function dest(){const L=all().filter(i=>i.dt).slice(0,8),rr=()=>{if($('#modal').open)$('#modal').close();dest()};$('#dest').hidden=!L.length;$('#destL').replaceChildren(...L.map(i=>card(i,rr)))}
let pmin='',pmax='';
function side(){
 const a=h('input',{type:'number',min:0,placeholder:'Mínimo','aria-label':'Precio mínimo',value:pmin}),b=h('input',{type:'number',min:0,placeholder:'Máximo','aria-label':'Precio máximo',value:pmax});
 a.oninput=()=>pmin=a.value;b.oninput=()=>pmax=b.value;
 $('#side').replaceChildren(
  h('div',{class:'sg'},h('h3',{},'Secciones'),
   h('button',{class:'sl2'+(catState.mode==='home'?' on':''),onclick:resetCatalog},'Ver todas las secciones',h('span',{},S.cats.length)),
   ...S.cats.map(c=>h('button',{class:'sl2'+(catState.catId===c.id?' on':''),onclick:()=>setCatView({mode:'cat',key:'cat-'+c.id,catId:c.id,label:c.name})},c.name,h('span',{},c.subs.reduce((n,s)=>n+s.items.length,0))))
  ),
  h('div',{class:'sg'},h('h3',{},'Listas'),...[['dt','Destacados'],['off','Ofertas'],['new','Nuevos'],['fav','Favoritos ('+fav.length+')'],['all','Todo el catálogo']].map(([k,l])=>h('button',{class:'sl2'+(catState.key===k?' on':''),onclick:()=>setCatView({mode:'list',key:k,label:l,fn:null,sort:'def',only:false})},l))),
  h('div',{class:'sg'},h('h3',{},'Precio'),h('div',{class:'two'},a,b),h('button',{class:'btn pri',onclick:()=>{
   const lo=+pmin||0,hi=+pmax||Infinity;
   setCatView({mode:'list',key:'price',label:'Productos entre '+clp(lo)+(hi<Infinity?' y '+clp(hi):' o más'),fn:i=>ep(i)>=lo&&ep(i)<=hi,sort:'def',only:false});
  }},'Filtrar por precio')),
  h('div',{class:'sg'},h('h3',{},'¿Necesitas ayuda?'),h('p',{},'Escríbenos y te asesoramos.'),h('a',{class:'btn',target:'_blank',rel:'noopener',href:'https://wa.me/'+S.wa},'Hablar por WhatsApp'),h('small',{class:'mut'},S.site.hr))
 );
}

/* ---- Comparador, pack, asistente con aviso de presupuesto y guía de tallas ---- */
let cmp=[];
const cmpBtn=(i,rr)=>h('button',{class:'cmpb','aria-pressed':String(cmp.includes(i.id)),onclick:()=>{if(cmp.includes(i.id))cmp=cmp.filter(x=>x!==i.id);else if(cmp.length>=3){toast('Puedes comparar hasta 3 productos');return}else cmp.push(i.id);cmpUI();if(rr)rr()}},cmp.includes(i.id)?'✓ Comparando':'Comparar');
function cmpUI(){const b=$('#cmpBar');b.hidden=!cmp.length;b.replaceChildren(h('span',{},'Comparando '+cmp.length+(cmp.length<2?' (elige otro)':'')),cmp.length>1?h('button',{class:'btn pri sm',onclick:cmpView},'Ver comparación'):'',h('button',{class:'link',onclick:()=>{cmp=[];cmpUI();renderCatalog()}},'Limpiar'))}
function cmpView(){const L=all().filter(i=>cmp.includes(i.id));if(L.length<2){toast('Elige al menos 2 productos');return}
 const rows=[['Precio',i=>clp(ep(i))],['Sección',i=>i.cat+' › '+i.sub],['Disponibilidad',i=>i.s<=0?'Agotado':i.s+' disponibles'],['Descripción',i=>i.d||'—']];
 const t=h('table',{class:'cmpt'},h('thead',{},h('tr',{},h('th',{}),...L.map(i=>h('th',{},h('img',{src:i.img||PH,alt:'',class:'cth'}),h('div',{},i.n))))),h('tbody',{},...rows.map(([l,f])=>h('tr',{},h('th',{scope:'row'},l),...L.map(i=>h('td',{},f(i)))))),h('tfoot',{},h('tr',{},h('td',{}),...L.map(i=>h('td',{},h('button',{class:'btn pri sm',disabled:i.s<=0,onclick:()=>add(i,()=>{})},'Agregar'))))));
 modal.nf=1;modal('Comparador',h('div',{},h('div',{class:'cmpw'},t),h('button',{class:'link',onclick:()=>{cmp=[];cmpUI();$('#modal').close()}},'Limpiar selección')))}

function packView(){const L=all().filter(i=>i.s>0),n=S.site.pn||3,pp=S.site.pp||0,sel=new Set(),sm=h('p',{role:'status',class:'price'}),ad=h('button',{class:'btn pri big',disabled:true},'Agregar pack al carrito');
 const upd=()=>{const t=[...sel].reduce((a,id)=>a+ep(L.find(i=>i.id===id)),0);sm.textContent='Elegiste '+sel.size+' de '+n+' · '+clp(t)+(pp&&sel.size>=n?' → con descuento: '+clp(Math.round(t*(100-pp)/100)):'');ad.disabled=sel.size<n};
 ad.onclick=()=>{sel.forEach(id=>{cart[id]=Math.min((cart[id]||0)+1,L.find(i=>i.id===id).s)});store.set(CKEY,cart);$('#modal').close();cartView()};
 modal('Arma tu pack',h('div',{},h('p',{class:'mut'},'Elige '+n+' o más productos'+(pp?' y obtén '+pp+'% de descuento':'')+'.'),h('div',{class:'packl'},L.length?L.map(i=>h('label',{class:'pk'},h('input',{type:'checkbox',onchange:e=>{e.target.checked?sel.add(i.id):sel.delete(i.id);upd()}}),h('img',{src:i.img||PH,alt:'',class:'pth'}),h('span',{},i.n),h('b',{},clp(ep(i))))):h('p',{class:'empty'},'No hay productos disponibles ahora.')),sm,ad));upd()}

const BUDGETS=[
 {l:'Hasta $10.000',lo:0,hi:10000,cap:10000},
 {l:'$10.000 a $20.000',lo:10000,hi:20000,cap:20000},
 {l:'$20.000 a $35.000',lo:20000,hi:35000,cap:35000},
 {l:'Más de $35.000',lo:35000,hi:Infinity,cap:null}
];

function quizView(a={}){
 if(a.c==null){
  return modal('Te ayudo a elegir (1/2)',h('div',{class:'f'},
   h('p',{},'¿Qué estás buscando?'),
   ...S.cats.map((c,k)=>h('button',{class:'btn',onclick:()=>quizView({c:k})},(c.icon||'')+' '+c.name))
  ));
 }
 if(a.b==null){
  return modal('Te ayudo a elegir (2/2)',h('div',{class:'f'},
   h('p',{},'¿Cuál es tu presupuesto?'),
   ...BUDGETS.map((b,idx)=>h('button',{class:'btn',onclick:()=>quizView({c:a.c,b:idx})},b.l))
  ),()=>quizView());
 }
 const c=S.cats[a.c],bg=BUDGETS[a.b];
 const catItems=all().filter(i=>i.cat===c.name&&i.s>0);
 const overCap=bg.cap!=null?catItems.filter(i=>ep(i)>bg.cap):[];
 const L=catItems.filter(i=>ep(i)>=bg.lo&&ep(i)<=bg.hi).sort((x,y)=>(y.dt?1:0)-(x.dt?1:0)||ep(x)-ep(y));

 const draw=()=>{
  const nodes=[];
  if(overCap.length){
   nodes.push(h('div',{class:'budget-alert',role:'alert'},
    h('strong',{},'⚠ Hay '+overCap.length+(overCap.length===1?' producto':' productos')+' en '+c.name+' que superan '+clp(bg.cap)),
    h('span',{},'Si te interesa alguno de estos, pasará del presupuesto elegido:'),
    h('ul',{},...overCap.slice(0,4).map(x=>h('li',{},x.n+' ('+clp(ep(x))+')')))
   ));
  }
  if(L.length){
   nodes.push(h('div',{class:'prods'},L.map(i=>card(i,draw))));
  }else{
   nodes.push(h('p',{class:'empty'},'No hay productos dentro del tramo «'+bg.l+'» en esta sección'+(overCap.length?', pero sí opciones sobre ese monto en el aviso de arriba.':' prueba con otro presupuesto.')));
  }
  modal('Recomendaciones · '+c.name+' ('+bg.l+')',h('div',{},...nodes),()=>quizView({c:a.c}));
 };
 draw();
}

function sizeView(){
 const t=h('select',{},['Mujer','Hombre','Niña o niño'].map(o=>h('option',{value:o},o)));
 const a=h('input',{type:'number',min:40,max:220,placeholder:'Ej: 165'});
 const w=h('input',{type:'number',min:3,max:200,placeholder:'Ej: 62'});
 const wWrap=h('label',{},'Peso (kg)',w);
 const box=h('div',{class:'size-res',role:'status','aria-live':'polite'},h('span',{class:'mut'},'Ingresa los datos y pulsa «Calcular mi talla».'));

 const syncKid=()=>{
  const isKid=t.value==='Niña o niño';
  wWrap.querySelector('span')?.remove();
  wWrap.firstChild.textContent=isKid?'Peso (kg, opcional)':'Peso (kg)';
  w.placeholder=isKid?'Ej: 24 (opcional)':'Ej: 62';
 };
 t.onchange=syncKid;syncKid();

 const calc=()=>{
  const H=+a.value,W=+w.value,k=t.value,isKid=k==='Niña o niño';
  if(!H||H<40||H>220){
   box.replaceChildren(h('strong',{},'Revisa la estatura'),h('span',{},'Ingresa una estatura válida en centímetros (entre 40 y 220 cm).'));
   return;
  }
  if(!isKid&&(!W||W<15||W>220)){
   box.replaceChildren(h('strong',{},'Revisa el peso'),h('span',{},'Ingresa tu peso aproximado en kilogramos para calcular tu talla.'));
   return;
  }
  let res='',nota='';
  if(isKid){
   const byH=[[92,'Talla 2'],[104,'Talla 4'],[116,'Talla 6'],[128,'Talla 8'],[140,'Talla 10'],[152,'Talla 12']];
   res=(byH.find(x=>H<x[0])||[0,'Talla 14'])[1];
   if(W>0){
    const byW=[[14,'Talla 2'],[18,'Talla 4'],[22,'Talla 6'],[27,'Talla 8'],[33,'Talla 10'],[40,'Talla 12']];
    const rW=(byW.find(x=>W<x[0])||[0,'Talla 14'])[1];
    const ord=['Talla 2','Talla 4','Talla 6','Talla 8','Talla 10','Talla 12','Talla 14'];
    const idx=Math.max(ord.indexOf(res),ord.indexOf(rW));
    res=ord[Math.min(ord.length-1,idx)];
   }
   nota='Referencia infantil según estatura'+ (W?' y peso.':'.');
  }else{
   const Z=['XS','S','M','L','XL','XXL'];
   const cut=k==='Mujer'?[52,60,68,78,90]:[58,68,78,88,100];
   let idx=cut.findIndex(c=>W<c);
   if(idx<0)idx=5;
   if(H>=(k==='Mujer'?172:183))idx=Math.min(5,idx+1);
   if(H<=(k==='Mujer'?153:163)&&idx>0)idx=Math.max(0,idx-1);
   res=Z[idx];
   nota='Sugerencia referencial para '+k.toLowerCase()+' ('+H+' cm · '+W+' kg).';
  }

  const waBtn=h('a',{
   class:'btn pri sm',
   target:'_blank',
   rel:'noopener',
   href:'https://wa.me/'+S.wa+'?text='+encodeURIComponent('Hola Keiki Strawberry, calculé '+res+' en la guía de tallas ('+k+', '+H+' cm'+(W?', '+W+' kg':'')+'). ¿Me ayudas a confirmar medidas?')
  },'Consultar talla '+res+' por WhatsApp');

  box.replaceChildren(h('strong',{},'Talla sugerida: '+res),h('span',{},nota),waBtn);
 };

 modal('Guía de tallas',h('div',{class:'f'},
  h('label',{},'¿Para quién es?',t),
  h('label',{},'Estatura (cm)',a),
  wWrap,
  h('button',{class:'btn pri',onclick:calc},'Calcular mi talla'),
  box,
  h('small',{class:'mut'},'Las medidas pueden variar según el modelo o tela. Si dudas, escríbenos por WhatsApp.')
 ));
}

/* ---- Redes, preguntas frecuentes, subir ---- */
const IC={wa:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9.5 8.5c0 3 2 5 5 5.5"/>',ig:'<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r=".6"/>',tk:'<path d="M14 3v11a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.5 2 4 4.5 4.2"/>',fb:'<path d="M14 21v-8h3l.5-3.5H14V7.5c0-1 .5-1.7 1.8-1.7H18V3c-.5 0-1.600-.2-2.800-.2-2.700 0-4.200 1.600-4.200 4.300v2.400H8V13h3v8z"/>'};
function soc(w,igU,tkU,fbU){
 const box=$('#soc');if(!box)return;
 const was=box.classList.contains('open');
 const L=[['wa','WhatsApp',w],['ig','Instagram',igU],['tk','TikTok',tkU],['fb','Facebook',fbU]].filter(x=>x[2]);
 const t=h('button',{class:'soc-t',type:'button','aria-label':'Contacto y redes sociales','aria-expanded':String(was)});
 t.innerHTML='<svg class="i-c" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg><svg class="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
 const set=o=>{box.classList.toggle('open',o);t.setAttribute('aria-expanded',String(o))};
 t.onclick=()=>set(!box.classList.contains('open'));
 box.replaceChildren(t,...L.map(([k,n,href],j)=>{
  const a=h('a',{class:'sb '+k,href,target:'_blank',rel:'noopener noreferrer','aria-label':n,title:n});
  a.style.animationDelay=j*.4+'s';
  a.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[k]+'</svg>';
  return a;
 }));
 set(was);
 if(!soc.b){soc.b=1;document.addEventListener('click',e=>{const x=$('#soc');if(x&&!x.contains(e.target)){x.classList.remove('open');x.querySelector('.soc-t')?.setAttribute('aria-expanded','false')}});addEventListener('keydown',e=>{if(e.key==='Escape')$('#soc')?.classList.remove('open')})}
}
function faqs(){const L=S.site.faq||[];$('#faq').hidden=!L.length;$('#faqL').replaceChildren(...L.map(f=>h('details',{class:'fq'},h('summary',{},f.q),h('p',{},f.a))))}
addEventListener('scroll',()=>{$('#up').hidden=scrollY<600},{passive:true});$('#up').onclick=()=>scrollTo({top:0});

/* ---- Páginas y acceso oculto ---- */
let page='home';
function route(){
 const x=location.hash;
 if(x==='#catalogo')page='cat';
 else if(x===''||x==='#inicio')page='home';
 $('#pgHome').hidden=page!=='home';
 $('#pgCat').hidden=page!=='cat';
 document.querySelectorAll('.nav a').forEach(a=>a.setAttribute('aria-current',(a.hash==='#catalogo')===(page==='cat')?'page':'false'));
 if(page==='cat'){renderCatalog();side()}
 if(x==='#catalogo'||x===''||x==='#inicio')scrollTo(0,0);
}
addEventListener('hashchange',route);
let lc=0,lt;$('.logo').addEventListener('click',()=>{lc++;clearTimeout(lt);lt=setTimeout(()=>lc=0,2500);if(lc>=5){lc=0;admin?adminView():login()}});
addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='a'){e.preventDefault();admin?adminView():login()}});
$('#packB').onclick=packView;$('#quizB').onclick=()=>quizView();$('#sizeB').onclick=sizeView;
const mq=matchMedia('(min-width:900px)'),sd=$('#sideD');sd.open=mq.matches;mq.addEventListener('change',e=>{sd.open=e.matches});
applyA();home();route();