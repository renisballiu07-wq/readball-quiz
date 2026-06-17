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
${sec('⚡ CONDIZIONE FISICA')}
${radio(1, 'Quale squadra è arrivata più in forma fisicamente?', CASA_OSPITE_PARI)}
${radio(2, 'Cali fisici evidenti nel finale?', ['Sì, la CASA', 'Sì, l’OSPITE', 'Entrambe', 'No'])}
${text(3, 'Giocatori palesemente STANCHI o scarichi (nomi)')}
${text(4, 'Chi correva ancora a fine gara / pozzo senza fondo (nomi)')}
${sec('🎯 TATTICA & ALLENATORI')}
${radio(5, 'Chi ha DOMINATO il gioco?', CASA_OSPITE_PARI)}
${text(6, 'Modulo reale visto in campo (se diverso dal previsto, quale?)')}
${radio(7, 'Cambi tattici che hanno cambiato la partita?', ['Sì, decisivi', 'Qualcuno', 'No'])}
${text(8, 'Se sì, quali cambi/mosse hanno spostato la gara')}
${radio(9, 'Quale allenatore ha letto meglio la partita?', ['Quello di CASA', 'Quello OSPITE', 'Pari'])}
${check(10, 'Come faceva male la squadra più pericolosa?', ['Sulle fasce', 'Per centro', 'Palle inattive', 'Ripartenze', 'Tiri da fuori', 'Pressing alto'])}
${sec('📈 ANDAMENTO & INERZIA')}
${radio(11, 'Che tipo di partita è stata?', ['Aperta e da gol', 'Tattica e bloccata', 'Squilibrata (una dominava)', 'Nervosa e spezzettata'])}
${text(12, 'Il momento in cui è cambiata la partita (minuto / episodio)')}
${radio(13, 'Chi ha avuto più occasioni VERE?', CASA_OSPITE_PARI)}
${radio(14, 'Il risultato rispecchia ciò che si è visto?', ['Sì, giusto', 'La CASA meritava di più', 'L’OSPITE meritava di più', 'Risultato bugiardo'])}
${sec('👤 I SINGOLI')}
${text(15, 'Migliore in campo (nome)')}
${text(16, 'Peggiore / più deludente (nome)')}
${text(17, 'Una rivelazione o sorpresa (nome)')}
${text(18, 'Un giocatore che può decidere le PROSSIME partite (nome)')}
${text(19, 'Assenze che hanno pesato molto? (chi e di quale squadra)')}
${sec('🧤 PORTIERI & DIFESE')}
${radio(20, 'Il portiere ha inciso?', ['Parate decisive (CASA)', 'Parate decisive (OSPITE)', 'Errore/i di un portiere', 'Serata normale'])}
${radio(21, 'Le difese?', ['Entrambe solide', 'CASA in difficoltà', 'OSPITE in difficoltà', 'Entrambe ballerine'])}
${sec('🟨 DISCIPLINA & ARBITRO')}
${radio(22, 'Quanto è stata nervosa?', ['Tranquilla', 'Normale', 'Molto nervosa'])}
${text(23, 'Cartellini/espulsioni che hanno pesato? (chi, quando)')}
${radio(24, 'L’arbitro ha influito?', ['No, gara pulita', 'Episodio a favore CASA', 'Episodio a favore OSPITE', 'Direzione confusa'])}
${text(25, 'Rigori / episodi dubbi (descrivi)')}
${sec('🔮 IL DATO CHE I NUMERI NON VEDONO', 'La parte più preziosa.')}
${text(26, 'Occasioni clamorose divorate, pali, gol annullati (chi)')}
${text(27, 'Una squadra ha sofferto o spinto MOLTO più di quanto dica il risultato? Quale e perché')}
${text(28, 'Qualcosa di strano: atteggiamento, gestione, sensazione di gara non voluta o gestita?')}
${sec('➡️ PER LE PROSSIME')}
${text(29, 'Cosa ti aspetti dalla squadra di CASA nella prossima partita?')}
${text(30, 'Cosa ti aspetti dall’OSPITE nella prossima partita?')}
${text(31, 'Sensazione generale / note libere')}
</form>`;

const intro = `<p class="intro">Report da compilare <b style="color:#15e37c">subito dopo la partita</b>, finché ce l’hai in testa. Servono le cose che i dati NON vedono: condizione fisica, tattica, episodi, sensazioni. Più sei preciso, più il motore diventa forte.<br><b style="color:#15e37c">Alla fine premi "Copia" e incolla nel gruppo ReadBall.</b></p>
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
