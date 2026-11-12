(function(){
var DOMS = ['Nitq','Motorika','İdrak','Sosial-Emosional','Özünəxidmət'];
var DAYS = ['Bazar ertəsi','Çərşənbə axşamı','Çərşənbə','Cümə axşamı','Cümə','Şənbə','Bazar'];
var ICONS = {'Nitq':'🗣️','Motorika':'🏃','İdrak':'🧠','Sosial-Emosional':'🤝','Özünəxidmət':'🧼'};
var BASE_MIN = {'1–2':4,'3–4':6,'5–6':10,'7+':15};

var FRAMES = [
 {n:'Əsas dəstək səviyyəsi',
  m:'Bir neçə sahədə bacarıqlar hələ formalaşmayıb. Bu nəticə diaqnoz deyil: uşağın hazırda daha çox təkrara, daha kiçik addımlara və böyüklərin yaxın iştirakına ehtiyacı olduğunu göstərir.',
  p:['Hər gün eyni vaxtda və eyni ardıcıllıqla işləyin; qısa seanslar uzun seanslardan faydalıdır.','Yalnız bir bacarıq üzərində işləyin, uşaq tapşırığı tam yerinə yetirməsə belə cəhdi təqdir edin.','Təlimat verərkən qısa və konkret danışın, tapşırığı göstərərək izah edin.'],
  a:['Uşağı digər uşaqlarla müqayisə etməyin.','Təzyiq, təkrar-təkrar "de", "bax", "et" tələbləri.','Ekran vaxtını oyun və danışıq vaxtının əvəzinə qoymayın.'],
  c:'Planı tətbiq etməklə yanaşı, mümkün qədər tez uşaq psixoloqu, loqoped və ya nevroloq qiymətləndirməsinə müraciət etmək məsləhətdir. Ən əsası, gözləməyin: erkən dəstək ən təsirli dəstəkdir.'},
 {n:'Güclü dəstək səviyyəsi',
  m:'Bacarıqların bir qismi başlanğıc mərhələdədir və uşaq tapşırıqları yalnız yaxın dəstəklə yerinə yetirir. Plan bu bacarıqları kiçik addımlarla qurmaq üçün hazırlanıb.',
  p:['Bacarığı əvvəlcə birlikdə, sonra yarıya qədər köməklə, sonra müstəqil yerinə yetirin.','Uşağın cəhd etdiyi hər anı konkret təqdir edin ("Sən topu tutdun!").','Çətinlik yarananda tapşırığı sadələşdirin, dayandırmayın.'],
  a:['Uşaq bacarmayanda onun əvəzinə tez etmək.','Yorğun, ac və ya həyəcanlı vaxtda yeni bacarıq öyrətmək.','Bir gündə çox yeni tapşırıq vermək.'],
  c:'4 həftə ərzində plan müntəzəm tətbiq edildikdə irəliləyiş görünmürsə, uşaq psixoloqu və ya loqoped məsləhəti tövsiyə olunur. Aşağı nəticəli sahələr üçün qiymətləndirməni 2–4 həftə ərzində planlaşdırmaq daha doğrudur.'},
 {n:'Yönləndirilmiş inkişaf səviyyəsi',
  m:'Uşaq bacarıqları qismən mənimsəyib: bəzən bacarır, bəzən köməyə ehtiyac duyur. Bu, öyrənmə üçün ən məhsuldar mərhələdir və dəqiq yönləndirilmiş təkrar nəticə verir.',
  p:['Eyni bacarığı müxtəlif vəziyyətlərdə təkrar edin ki, uşaq onu ümumiləşdirsin.','Köməyi tədricən azaldın: əvvəl sözlə, sonra jestlə, sonra heç.','Zəif sahə üçün gündəlik qısa təkrar, güclü sahə üçün həftəlik möhkəmləndirmə.'],
  a:['Bacarmayanda daim düzəltmək; öz səhvini tapmağa vaxt verin.','Bütün sahələrə eyni vaxt ayırmaq: zəif sahəyə daha çox vaxt verin.','Yalnız nəticəyə baxıb prosesi təqdir etməməyi.'],
  c:'Zəif sahədə 4 həftə müntəzəm işləməyə baxmayaraq dəyişiklik yoxdursa, mütəxəssis fikrini almaq məqsədəuyğundur.'},
 {n:'Möhkəmləndirmə səviyyəsi',
  m:'Uşaq əksər bacarıqları artıq göstərir; bəzi sahələrdə davamlılıq və müstəqillik hələ tam deyil. Plan bacarıqları möhkəmləndirmək və müstəqilliyi artırmaq üçündür.',
  p:['Uşağa daha çox seçim verin və nəticəni özü yoxlamağa buraxın.','Bacarığı yeni mühitlərdə (qonaqlıq, park, mağaza) tətbiq etdirin.','Müstəqil cəhdi 10 saniyə gözləyin, sonra kömək edin.'],
  a:['Uşaq bacardığı işi sizin əvəzinizə etmək.','Həddindən artıq tənqid və ya mükəmməllik tələbi.'],
  c:'Hər hansı sahədə geriləmə və ya əvvəl bacardığı bacarığı itirmə müşahidə olunarsa, mütəxəssisə müraciət edin. Əks halda plan kifayətdir.'},
 {n:'Təkmilləşdirmə səviyyəsi',
  m:'Uşaq yaş üçün gözlənilən bacarıqların böyük hissəsini göstərir. Plan çətinliyi tədricən artırmağa və təfəkkürü dərinləşdirməyə yönəlib.',
  p:['Tapşırıqları bir az çətinləşdirin: yeni element, daha uzun müddət, daha az dəstək.','Uşağın maraq dairəsindən çıxış edin; maraq öyrənməni gücləndirir.','Uşağın öyrəndiyini başqasına izah etməsini istəyin.'],
  a:['Çətinliyi çox sürətlə artırmaq; uğur hissini qoruyun.','Yalnız akademik bacarıqlara fokuslanmaq: hərəkət və sosial vaxtı azaltmayın.'],
  c:'Xüsusi narahatlıq yoxdur. Yalnız bir sahədə digərlərindən nəzərəçarpacaq geri qalma olarsa, həmin sahə üzrə məsləhət almaq olar.'},
 {n:'Zənginləşdirmə səviyyəsi',
  m:'Uşaq yaşına uyğun bacarıqların hamısını güclü göstərir. Plan marağı, yaradıcılığı və növbəti yaş mərhələsinə hazırlığı dəstəkləyir.',
  p:['Uşağa açıq suallar verin: "Sən necə edərdin? Başqa necə olar?"','Növbəti yaş səviyyəsindən bir-iki bacarıq tanıdın, amma sürətləndirməyin.','Uşağın seçimi ilə mini-layihələr, müşahidələr və yaradıcı işlər.'],
  a:['Uşağı "qabaqcıl" kimi tez-tez müqayisə edib təzyiq yaratmaq.','Uşağın uşaqlıq oyun vaxtını həddindən artıq planlaşdırmaq.'],
  c:'Xüsusi məsləhət tələb olunmur. Gələcək inkişaf üçün UşaqIQ testini 2–3 aydan bir təkrarlamaq faydalıdır.'}
];

function band(score){
  if(typeof score !== 'number' || isNaN(score)) return 3;
  if(score <= 15) return 1;
  if(score <= 35) return 2;
  if(score <= 50) return 3;
  if(score <= 65) return 4;
  if(score <= 85) return 5;
  return 6;
}

function overall(scores){
  var s = 0, n = 0;
  DOMS.forEach(function(d){ if(typeof scores[d] === 'number'){ s += scores[d]; n++; } });
  return n ? Math.round(s / n) : 50;
}

function sessionText(age, b){
  var m = BASE_MIN[age] || 6;
  if(b <= 2) return 'gündə 3 qısa seans, hər biri təxminən ' + m + ' dəqiqə';
  if(b <= 4) return 'gündə 2 seans, hər biri təxminən ' + Math.round(m * 1.5) + ' dəqiqə';
  return 'gündə 1 seans, təxminən ' + Math.round(m * 2) + ' dəqiqə';
}

function frame(age, scores){
  var ov = overall(scores);
  var b = band(ov);
  var f = FRAMES[b - 1];
  var low = DOMS.filter(function(d){ return band(scores[d]) <= 2; });
  return { band: b, overall: ov, name: f.n, meaning: f.m, principles: f.p, avoid: f.a, consult: f.c,
           sessions: sessionText(age, b), lowDomains: low };
}

function module(age, dom, score){
  var set = window.PLANS_MOD && window.PLANS_MOD[age] && window.PLANS_MOD[age][dom];
  if(!set) return null;
  var b = band(score);
  var base = set[b - 1];
  var ext = window.PLANS_EXT && window.PLANS_EXT[age] && window.PLANS_EXT[age][dom] && window.PLANS_EXT[age][dom][b - 1];
  var m = {};
  for(var k in base) m[k] = base[k];
  if(ext) for(var j in ext) m[j] = ext[j];
  return { band: b, label: FRAMES[b - 1].n, m: m };
}

function dayCard(day, dom, mod, opts){
  opts = opts || {};
  var steps = mod.m.s.slice();
  if(opts.cut) steps = steps.slice(0, opts.cut);
  var card = { day: day, domain: dom, ic: ICONS[dom], activity: mod.m.t, why: mod.m.w, steps: steps,
           sign: mod.m.g, up: opts.up ? mod.m.u : '', focus: mod.band <= 3,
           special: opts.badge || (mod.band <= 3 ? 'Fokus sahə' : '') };
  if(opts.rich){
    card.plain = mod.m.e || '';
    card.example = mod.m.x || '';
    card.mistakes = mod.m.k || '';
    card.materials = mod.m.m || '';
  }
  if(opts.rich || opts.refer) card.refer = mod.m.r || '';
  return card;
}

function weakestOrder(scores){
  return DOMS.slice().sort(function(a, b){ return scores[a] - scores[b]; });
}

function familyDay(day, text, steps){
  return { day: day, domain: null, ic: '👨‍👩‍👧', activity: text, why: 'Günün sonunda stresssiz oyun və müşahidə uşağın emosional sağlamlığını dəstəkləyir və növbəti həftə üçün dəqiq məlumat verir.',
           steps: steps, sign: '', up: '', focus: false, special: '' };
}

function week(age, scores){
  var days = [];
  DOMS.forEach(function(d, i){
    var m = module(age, d, scores[d]);
    days.push(dayCard(DAYS[i], d, m, { rich: true }));
  });
  var worst = weakestOrder(scores)[0];
  var wm = module(age, worst, scores[worst]);
  days.push(dayCard(DAYS[5], worst, wm, { up: true, refer: true, badge: 'Zəif sahə təkrarı' }));
  days[5].activity = 'Təkrar: ' + wm.m.t;
  days.push(familyDay(DAYS[6], 'Ailə vaxtı və həftənin yekunu', [
    'Uşaqla 30–40 dəqiqə sərbəst oyun: seçimi o etsin, siz təlim etməyin.',
    'Həftə ərzində müşahidə etdiyiniz irəliləyiş göstəricilərinə baxın (hər günün kartındakı "İrəliləyiş göstəricisi").',
    'Növbəti həftə üçün ən çətin sahəni və ən uğurlu sahəni qeyd edin.'
  ]));
  return days;
}

var STAGES = [
 {n:'Əsas mərhələ', t:'Bacarığı tanıtma: hər gün yalnız ilk iki addım, qısa müddət. Məqsəd uşağı tapşırığa alışdırmaqdır.', cut:2, up:false},
 {n:'Möhkəmləndirmə', t:'Bütün addımları yerinə yetirin, eyni vaxtda və eyni ardıcıllıqla.', cut:0, up:false},
 {n:'Genişləndirmə', t:'Bütün addımlar və "Növbəti addım" hissəsi: çətinliyi bir pillə artırın.', cut:0, up:true},
 {n:'Yoxlama və yekun', t:'İrəliləyiş göstəricilərinə görə ayın nəticəsini qiymətləndirin; uğur varsa pillə yüksəldin, yoxdursa mütəxəssis məsləhəti alın.', cut:0, up:true}
];

function month(age, scores){
  var order = weakestOrder(scores);
  var weeks = [];
  for(var w = 0; w < 4; w++){
    var st = STAGES[w];
    var days = [];
    DOMS.forEach(function(d, i){
      var m = module(age, d, scores[d]);
      days.push(dayCard(DAYS[i], d, m, { cut: st.cut, up: st.up, rich: w === 0, refer: w === 3 }));
    });
    var focus = (w % 2 === 1 && band(scores[order[1]]) <= 4) ? order[1] : order[0];
    var fm = module(age, focus, scores[focus]);
    var sat = dayCard(DAYS[5], focus, fm, { up: true, rich: w === 0, refer: w === 3, badge: 'Zəif sahə təkrarı' });
    sat.activity = 'Təkrar: ' + fm.m.t;
    days.push(sat);
    days.push(familyDay(DAYS[6], 'Ailə vaxtı və həftənin yekunu', [
      'Uşaqla sərbəst oyun; seçimi uşağa buraxın.',
      'Bu həftənin irəliləyiş göstəricilərini nəzərdən keçirin: neçəsi görünür?',
      w === 3 ? 'Ay yekunu: göstəricilərin yarıdan çoxu görünürsə növbəti pilləyə keçin; azdırsa eyni planı davam etdirin və mütəxəssis fikri alın.' : 'Növbəti həftə üçün vaxt və yeri müəyyən edin.'
    ]));
    weeks.push({ weekNum: w + 1, stage: st.n, stageText: st.t, focusDomain: focus, days: days });
  }
  return weeks;
}

window.PLANS = { band: band, overall: overall, frame: frame, module: module, week: week, month: month,
                 labels: FRAMES.map(function(f){ return f.n; }), doms: DOMS };
})();
