// gen-lavoro.js — costruisce lavoro.html (questionario 25 domande "Squadra ReadBall")
// riusando head/style/logo di index.html. Raccolta risposte via WhatsApp (come il quiz partite).
const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
const cut = idx.indexOf('</h1></div>') + '</h1></div>'.length;
let head = idx.slice(0, cut)
  .replace('<title>Quiz Pre-Partita ReadBall</title>', '<title>Squadra ReadBall — Candidatura</title>')
  .replace('<h1>Quiz Pre-Partita</h1>', '<h1>Entra nella Squadra</h1>');

const sec = (t, s) => `<div class="sec">${t}${s ? `<small>${s}</small>` : ''}</div>`;
const radio = (n, q, opts) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="radio"><label class="ql">${n}. ${q}</label>${opts.map(o => `<label class="opt"><input type="radio" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const check = (n, q, opts, max) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="check"><label class="ql">${n}. ${q}${max ? ` <small style="color:#9fb0c0;font-weight:500">(max ${max})</small>` : ''}</label>${opts.map(o => `<label class="opt"><input type="checkbox" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const text = (n, q) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}"><label>${n}. ${q}</label><input type="text" name="q${n}" autocomplete="off"></div>`;

const form = `<form id="f">
${sec('⏰ DISPONIBILITÀ')}
${radio(1, 'Quante ore AL GIORNO puoi dedicarci?', ['Meno di 1h', '1–2h', '2–4h', 'Più di 4h'])}
${radio(2, 'Quanti giorni a settimana?', ['1–2', '3–4', '5–6', 'Tutti i giorni'])}
${check(3, 'In che fasce orarie rendi meglio?', ['Mattina', 'Pomeriggio', 'Sera', 'Notte'], 2)}
${radio(4, 'Riesci a rispettare scadenze precise (es. "post pronto entro le 18")?', ['Sempre', 'Quasi sempre', 'Dipende', 'Faccio fatica'])}
${radio(5, 'Per quanto pensi di tenere questo impegno?', ['Provo e vedo', 'Qualche mese', 'A lungo', 'Tutto il Mondiale e oltre'])}
${sec('💻 DISPOSITIVI & STRUMENTI')}
${radio(6, 'Che computer hai?', ['PC Windows', 'Mac', 'Portatile base', 'Non ho un PC'])}
${radio(7, 'Che smartphone hai?', ['iPhone recente', 'iPhone vecchio', 'Android top', 'Android base'])}
${check(8, 'Cosa hai per fare/montare video?', ['Buona fotocamera del telefono', 'Microfono decente', 'Luci / ring light', 'Niente di particolare'])}
${check(9, 'Quali AI/abbonamenti hai?', ['ChatGPT Plus', 'Gemini Pro', 'Canva Pro', 'CapCut Pro', 'Nessuno'])}
${radio(10, 'Sai usare app di montaggio video?', ['CapCut bene', 'Premiere / DaVinci', 'Solo le basi', 'No'])}
${radio(11, 'Sai usare strumenti grafici (Canva/Photoshop)?', ['Ottimo', 'Discreto', 'Le basi', 'No'])}
${sec('🛠️ LE TUE COMPETENZE', 'Sii sincero: serve a darti il ruolo giusto, non a giudicarti.')}
${radio(12, 'Scrittura / caption che catturano', ['Punto di forza', 'Discreto', 'Scarso'])}
${radio(13, 'Grafica / senso estetico', ['Punto di forza', 'Discreto', 'Scarso'])}
${radio(14, 'Montaggio video', ['Punto di forza', 'Discreto', 'Scarso'])}
${radio(15, 'Trovare storie/curiosità/dati interessanti', ['Punto di forza', 'Discreto', 'Scarso'])}
${radio(16, 'Stare DAVANTI alla camera / parlare in video', ['A mio agio', 'Così così', 'No grazie'])}
${radio(17, 'Faresti la VOCE per i video (voice-over)?', ['Sì volentieri', 'Si può provare', 'No'])}
${radio(18, 'Quanto conosci il calcio?', ['Espertissimo', 'Buona', 'Media', 'Scarsa'])}
${text(19, 'Inglese / altre lingue (quali e che livello?)')}
${radio(20, 'Conosci come "funzionano" TikTok/IG/Telegram (trend, orari, hashtag)?', ['Molto bene', 'Abbastanza', 'Poco'])}
${sec('🎯 COSA TI PIACEREBBE FARE')}
${radio(21, 'Quale piattaforma ti attira di più?', ['Instagram', 'TikTok', 'Telegram', 'Mi è uguale'])}
${check(22, 'Che ruolo ti piacerebbe avere?', ['Creare video', 'Fare grafiche', 'Scrivere le caption', 'Cercare contenuti & curiosità', 'Pubblicare e gestire i social', 'Gestire la community Telegram', 'Analisi partite / giocate', 'Stare in video (volto della pagina)'], 2)}
${radio(23, 'Come preferisci lavorare?', ['Da solo, coi miei tempi', 'In coppia', 'Coordinando altri'])}
${sec('🔥 TU')}
${text(24, 'I tuoi 2 punti di forza più grandi')}
${text(25, 'Hai esperienza (social/montaggio/grafica) o idee per la pagina? Raccontala')}
</form>`;

const intro = `<p class="intro">Vuoi entrare nella squadra <b style="color:#15e37c">ReadBall</b> (Instagram, TikTok, Telegram)? Rispondi sincero a queste 25 domande: servono a darti il ruolo più adatto a te. Ci vogliono 3 minuti.</p>
<div class="id"><input id="nome" placeholder="Il tuo nome" autocomplete="off"></div>`;

const script = `<div class="bar"><div class="err" id="err">Scrivi il tuo nome e completa le domande a scelta 👆</div><button id="send">📲 Invia la candidatura</button></div>
<script>
document.getElementById('send').onclick=function(){
  var nome=document.getElementById('nome').value.trim();
  var cards=[...document.querySelectorAll('.card')];
  var lines=[], ok=!!nome;
  for(var c of cards){
    var q=c.getAttribute('data-q'), t=c.getAttribute('data-type');
    if(t==='radio'){var sel=c.querySelector('input:checked');if(!sel){ok=false;continue}lines.push(q+' -> '+sel.value);}
    else if(t==='check'){var s=[...c.querySelectorAll('input:checked')].map(x=>x.value);if(!s.length){ok=false}lines.push(q+' -> '+(s.join(', ')||'-'));}
    else{var tx=c.querySelector('input[type=text]').value.trim();lines.push(q+' -> '+(tx||'-'));}
  }
  if(!ok){var e=document.getElementById('err');e.style.display='block';window.scrollTo(0,0);return;}
  var msg='📋 CANDIDATURA Squadra ReadBall\\n👤 '+nome+'\\n\\n'+lines.join('\\n');
  window.location.href='https://wa.me/?text='+encodeURIComponent(msg);
};
</script></body></html>`;

fs.writeFileSync('lavoro.html', head + intro + form + script);
console.log('lavoro.html scritto:', (head + intro + form + script).length, 'bytes');
