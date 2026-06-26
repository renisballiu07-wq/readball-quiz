// gen-match-report.js — REPORT PARTITA del Match Watcher (da compilare a fine partita).
// Riusa head/style/logo di index.html. Submit: copia negli appunti -> incolla nel gruppo ReadBall (entra nel motore via bot).
const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
const cut = idx.indexOf('</h1></div>') + '</h1></div>'.length;
let head = idx.slice(0, cut)
  .replace('<title>Quiz Pre-Partita ReadBall</title>', '<title>Report Partita — ReadBall</title>')
  .replace('<h1>Quiz Pre-Partita</h1>', '<h1>Report Partita</h1>');

const sec = (t, s) => `<div class="sec">${t}${s ? `<small>${s}</small>` : ''}</div>`;
const radio = (n, q, opts) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="radio"><label class="ql">${n}. ${q}</label>${opts.map(o => `<label class="opt"><input type="radio" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const check = (n, q, opts, max) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}" data-type="check"><label class="ql">${n}. ${q}${max ? ` <small style="color:#9fb0c0;font-weight:500">(max ${max})</small>` : ''}</label>${opts.map(o => `<label class="opt"><input type="checkbox" name="q${n}" value="${o.replace(/"/g, '&quot;')}"><span>${o}</span></label>`).join('')}</div>`;
const text = (n, q) => `<div class="card" data-q="${n}. ${q.replace(/"/g, '&quot;')}"><label>${n}. ${q}</label><input type="text" name="q${n}" autocomplete="off"></div>`;
const CASA_OSPITE_PARI = ['Squadra di CASA', 'Squadra OSPITE', 'Pari / nessuna'];

const form = `<form id="f">
${sec('⚡ CONDIZIONE FISICA', 'Quello che le statistiche non vedono.')}
${radio(1, 'Quale squadra è arrivata più in forma fisicamente?', CASA_OSPITE_PARI)}
${radio(2, 'Cali fisici evidenti nel finale?', ['Sì, la CASA', 'Sì, l’OSPITE', 'Entrambe', 'No'])}
${text(3, 'Giocatori palesemente STANCHI o scarichi (nomi)')}
${text(4, 'Chi correva ancora a fine gara / non si fermava mai (nomi)')}
${sec('🎯 LA LETTURA TATTICA')}
${radio(5, 'Quale allenatore ha letto meglio la partita?', ['Quello di CASA', 'Quello OSPITE', 'Pari'])}
${text(6, 'Cambi o mosse che hanno SPOSTATO la gara (quali e perché)')}
${check(7, 'Come faceva male la squadra più pericolosa?', ['Sulle fasce', 'Per centro', 'Palle inattive', 'Ripartenze', 'Tiri da fuori', 'Pressing alto'])}
${sec('📈 ANDAMENTO & INERZIA')}
${radio(8, 'Che tipo di partita è stata?', ['Aperta e da gol', 'Tattica e bloccata', 'Squilibrata (una dominava)', 'Nervosa e spezzettata'])}
${text(9, 'Il momento in cui è girata la partita (minuto / episodio)')}
${radio(10, 'Il risultato rispecchia ciò che hai visto?', ['Sì, giusto', 'La CASA meritava di più', 'L’OSPITE meritava di più', 'Risultato bugiardo'])}
${sec('👤 I SINGOLI', 'Il tuo occhio, non i voti dei siti.')}
${text(11, 'Chi ti ha impressionato di più (nome e perché)')}
${text(12, 'Chi ha deluso / è stato un buco (nome)')}
${text(13, 'Una rivelazione o sorpresa (nome)')}
${text(14, 'Un giocatore in fiducia che può decidere le PROSSIME (nome)')}
${sec('🥊 I DUELLI', 'Oro per le prossime giocate.')}
${text(15, 'Un duello chiaro: chi ha dominato chi (es. un difensore in crisi contro un attaccante in giornata)')}
${sec('🔮 IL DATO CHE I NUMERI NON VEDONO', 'La parte più preziosa — qui sei insostituibile.')}
${text(16, 'Chi ha buttato gol già fatti / occasioni clamorose divorate')}
${text(17, 'Una squadra ha sofferto o spinto MOLTO più di quanto dica il risultato? Quale e perché')}
${text(18, 'Qualcosa di strano: atteggiamento, gestione, una gara gestita o non voluta?')}
${sec('➡️ PER LE PROSSIME')}
${text(19, 'Cosa ti aspetti dalla CASA nella prossima partita')}
${text(20, 'Cosa ti aspetti dall’OSPITE nella prossima partita')}
${text(21, 'Il tuo commento libero — dì quello che vuoi')}
</form>`;

const intro = `<p class="intro">Report da compilare <b style="color:#15e37c">subito dopo la partita</b>, finché ce l’hai in testa. Servono SOLO le cose che i dati NON vedono: condizione fisica, lettura tattica, duelli, sensazioni. Cartellini, tiri, parate e statistiche li abbiamo già dal motore — qui conta il tuo OCCHIO. Più sei preciso, più il motore diventa forte.<br><b style="color:#15e37c">Alla fine premi "Copia" e incolla nel gruppo ReadBall.</b></p>
<div class="id">
<input id="partita" placeholder="Partita (es. Germania-Curaçao)" autocomplete="off">
<input id="risultato" placeholder="Risultato finale (es. 2-0)" autocomplete="off">
<input id="watcher" placeholder="Il tuo nome" autocomplete="off">
</div>`;

const script = `<div class="bar"><div class="err" id="err">Scrivi partita, risultato e il tuo nome 👆</div><button id="send">📋 Copia il report</button></div>
<script>
document.getElementById('send').onclick=async function(){
  var partita=document.getElementById('partita').value.trim();
  var risultato=document.getElementById('risultato').value.trim();
  var watcher=document.getElementById('watcher').value.trim();
  var cards=[...document.querySelectorAll('.card')];
  var lines=[], ok=partita&&risultato&&watcher;
  for(var c of cards){
    var q=c.getAttribute('data-q'), t=c.getAttribute('data-type');
    if(t==='radio'){var sel=c.querySelector('input:checked');lines.push(q+' -> '+(sel?sel.value:'-'));}
    else if(t==='check'){var s=[...c.querySelectorAll('input:checked')].map(x=>x.value);lines.push(q+' -> '+(s.join(', ')||'-'));}
    else{var tx=c.querySelector('input[type=text]').value.trim();lines.push(q+' -> '+(tx||'-'));}
  }
  if(!ok){var e=document.getElementById('err');e.style.display='block';window.scrollTo(0,0);return;}
  var msg='📋 REPORT PARTITA ReadBall\\n⚽ '+partita+'  ('+risultato+')\\n👤 '+watcher+'\\n\\n'+lines.join('\\n');
  function done(){alert('✅ Report COPIATO!\\n\\nIncollalo nel gruppo ReadBall. Entra nel motore. Grazie!');}
  try{ await navigator.clipboard.writeText(msg); done(); }
  catch(e){ var ta=document.createElement('textarea'); ta.value=msg; ta.style.position='fixed'; ta.style.top='0'; document.body.appendChild(ta); ta.focus(); ta.select();
    try{ document.execCommand('copy'); done(); }catch(_){ window.prompt('Copia e incolla nel gruppo ReadBall:', msg); }
    ta.remove(); }
};
</script></body></html>`;

fs.writeFileSync('match-report.html', head + intro + form + script);
console.log('match-report.html scritto:', (head + intro + form + script).length, 'bytes');
