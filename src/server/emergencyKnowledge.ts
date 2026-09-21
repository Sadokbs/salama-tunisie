/**
 * Comprehensive Tunisian Emergency & Disaster Prevention Knowledge Base
 * Used by Salama Tunisie AI Advisor as high-reliability fallback and guidance grounding.
 */

export function getExpertSafetyResponse(question: string, lang: 'fr' | 'ar', governorate?: string): string {
  const q = question.toLowerCase();
  const isAr = lang === 'ar';

  // 1. Inondations / Floods / Crues d'oueds / أودية وفيضانات
  if (
    q.includes('فيضان') || 
    q.includes('وادي') || 
    q.includes('أودية') || 
    q.includes('مياه') || 
    q.includes('أمطار') || 
    q.includes('غرق') ||
    q.includes('inondation') || 
    q.includes('oued') || 
    q.includes('pluie') || 
    q.includes('eau') || 
    q.includes('crue')
  ) {
    if (isAr) {
      return `مرحباً بك. للحفاظ على سلامتك وسلامة عائلتك في تونس من مخاطر **الأمطار الطوفانية وفيضان الأودية** (خاصة في حوض مجردة، وادي مليان، أو المناطق المنخفضة)، إليك **الدليل الإلزامي للوقاية والتصرف السليم**:

---

### 🚨 أرقام النجدة العاجلة (متاحة 24/7):
* **الحماية المدنية:** **198** (لطلب الإجلاء والإنقاذ)
* **الحرس الوطني:** **193** (لحالة الطرقات والأودية بالمسالك الريفية)
* **الشرطة:** **197** | **الإسعاف (SAMU):** **190**
* **طوارئ الكهرباء والغاز (الستاغ):** **80 10 03 33** أو **71 341 400**

---

### 1. قبل الفيضان (الإجراءات الوقائية والاستعداد المنزلي):
* **تجهيز حقيبة الطوارئ الحيوية:** ضع في كيس بلاستيكي محكم الإغلاق في مكان مرتفع:
  * الوثائق الرسمية (دفتر العلاج، بطاقات التعريف، عقود الملكية).
  * أدوية الأمراض المزمنة للعائلة، ومصباح يدوي مشحون، وبطاريات، ومذياع لمتابعة الأخبار، وشاحن متنقل (Power Bank).
* **تنظيف مجاري تصريف المياه والبالوعات:** تأكد من تنظيف ميازيب السطح، والمصارف المنزلية، ومحيط المدخل من الأتربة والفضلات.
* **تأمين الأغراض الثمينة والمؤونة:** انقل الأجهزة الكهربائية، والمؤونة، والأفرشة إلى الطوابق العلوية إن أمكن.
* **متابعة نشرات المعهد الوطني للرصد الجوي:** لا تتجاهل الإنذارات ذات اللون البرتقالي والأحمر.

---

### 2. أثناء الفيضان وتدفق السيول (داخل المسكن):
* ⚠️ **قطع التيار الكهربائي والغاز فوراً:** افصل القاطع العام من العداد الرئيسي لتفادي الصعق الكهربائي القاتل عند ملامسة المياه للمقابس.
* **الصعود فوراً للأماكن المرتفعة:** اصعد مع عائلتك إلى الطابق العلوي أو السطح، وتجنب البقاء تماماً في الأقبية (Sous-sol) أو الغرف الأرضية المنخفضة.
* **عدم لمس الأجهزة المغمورة بالماء:** لا تلمس أي مفتاح أو سلك كهربائي حتى لو ظننت أن التيار مقطوع.
* **إشارة الاستغاثة:** حافظ على هدوء الأطفال والمسنين، واتصل بـ **198** وحدد عنوانك بوضوح، وأشر لفرق الإنقاذ بمنديل أو ضوء مصباح.

---

### 3. القاعدة الذهبية خارج المنزل وعلى الطريق (لا تجازف بحياتك!):
* 🚫 **الامتناع التام عن عبور الأودية الجارية:** لا تحاول أبداً عبور أي مجرى وادٍ سواء بسيارتك أو راجلاً، حتى لو بدا منسوب المياه منخفضاً. (قوة تيار بارتفاع **30 سم فقط** كافية لجرف سيارة رباعية الدفع).
* **إذا تعطلت سيارتك في تجمع مائي:** غادرها فوراً واصعد إلى مكان مرتفع وآمن قبل أن يرتفع المنسوب ويصعب فتح الأبواب.
* **الابتعاد عن البنية التحتية المتضررة:** تجنب الاقتراب من أعمدة الكهرباء، محولات الستاغ، والجسور المتآكلة.

---

### 4. بعد انحسار مياه الفيضان:
* **لا تعد تشغيل الكهرباء:** انتظر حتى تجف شبكة المنزل تماماً وتتم معاينتها من فني معتمد أو مصالح الستاغ.
* **الحذر من التلوث ولدغات الحشرات والزواحف:** مياه السيول تجلب معها الأوحال والزواحف؛ ارتدِ أحذية مطاطية سميكة، وعقّم خزانات الشرب ومحيط المنزل بماء الجافيل.`;
    } else {
      return `Bonjour. Pour protéger efficacement votre famille face aux **pluies torrentielles et crues d'oueds en Tunisie** (notamment dans les bassins de la Medjerda, l'Oued Meliane, le Cap Bon ou le Sahel), voici les **consignes opérationnelles de la Protection Civile** :

---

### 🚨 Numéros d'urgence vitale :
* **Protection Civile :** **198** (Secours, sauvetage et évacuation)
* **Garde Nationale :** **193** (État des routes, ponts et oueds)
* **Police de Secours :** **197** | **SAMU :** **190**
* **Urgences STEG (Électricité) :** **80 10 03 33** ou **71 341 400**

---

### 1. Avant la crue (Prévention et anticipation à domicile) :
* **Préparez votre kit d'urgence étanche :**
  * Papiers d'identité, carnet de santé, médicaments pour les personnes vulnérables.
  * Lampe torche, radio à piles, batterie externe (Powerbank) chargée, eau potable.
* **Nettoyage des évacuations :** Dégagez les gouttières, regards d'eaux pluviales et bouches d'égout autour de votre maison.
* **Mise en sécurité des biens :** Montez les appareils électroménagers, denrées et matelas aux étages supérieurs.
* **Suivi météo :** Respectez scrupuleusement les bulletins de vigilance (Orange / Rouge) de l'INM.

---

### 2. Pendant la montée des eaux (Dans l'habitation) :
* ⚠️ **Coupez immédiatement le disjoncteur général STEG et le gaz** dès que l'eau approche du seuil pour éviter tout risque d'électrocution mortelle.
* **Réfugiez-vous en hauteur :** Montez à l'étage ou sur le toit avec votre famille. Ne descendez jamais au sous-sol ou au garage.
* **Ne touchez à aucun équipement électrique immergé.**
* **Alertez le 198 :** Précisez votre adresse exacte, le nombre de personnes et la présence éventuelle d'enfants ou de personnes âgées.

---

### 3. Sur la route : Règle d'or absolue (Ne défiez jamais l'oued) :
* 🚫 **Interdiction absolue de franchir un oued en crue :** Ne traversez jamais un passage submersible, ni à pied ni en voiture. Moins de 30 cm d'eau en mouvement suffisent à emporter un véhicule.
* **Si votre véhicule cale dans l'eau :** Abandonnez-le immédiatement et gagnez un point haut avant que la pression ne bloque les portières.
* **Éloignez-vous des câbles électriques tombés à terre.**

---

### 4. Après la décrue :
* Ne réenclenchez pas l'électricité avant la vérification complète de l'installation par un technicien qualifié.
* Portez des bottes et des gants épais pour nettoyer la boue et désinfectez les surfaces et réservoirs avec de l'eau de Javel.`;
    }
  }

  // 2. Feux de forêts et récoltes / Wildfires / حرائق الغابات
  if (
    q.includes('حريق') || 
    q.includes('حرائق') || 
    q.includes('غابة') || 
    q.includes('غابات') || 
    q.includes('دخان') || 
    q.includes('محصول') ||
    q.includes('feu') || 
    q.includes('incendie') || 
    q.includes('forêt') || 
    q.includes('fumée')
  ) {
    if (isAr) {
      return `لحماية نفسك وممتلكاتك من **حرائق الغابات والمحاصيل الزراعية** في تونس (خاصة في جندوبة، باجة، بنزرت، سليانة، الكاف والقصرين)، إليك الإجراءات الأساسية:

### 🚨 أرقام الإشعار الفوري:
* **الحماية المدنية:** **198**
* **الإدارة العامة للغابات (DGF):** **80 10 12 12**
* **الحرس الوطني:** **193**

### الخطوات الوقائية العاجلة:
1. **الوقاية حول المنازل والحقول:**
   * إحداث شريط واقٍ عازل حول المسكن أو الحقل عبر إزالة الأعشاب الجافة لمسافة لا تقل عن 10 أمتار.
   * منع إشعال النار أو الشواء أو حرق بقايا الحصاد خلال فترات هبوب الشهيلي والرياح القوية.
2. **عند اقتراب الحريق والدخان:**
   * إغلاق النوافذ والأبواب وسد الفتحات بقطع قماش مبللة لمنع تسرب الدخان والرماد.
   * رش أسطح المنازل وجوانبها بالماء إن أمكن.
   * إخلاء المكان فوراً باتجاه معاكس لاتجاه الرياح والدخان، مع تغطية الأنف والفم بقطعة قماش مبللة.
3. **للفلاحين ومزارعي الحبوب:**
   * توفير صهاريج مياه ومضخات جاهزة قرب الحقول أثناء موسم الحصاد.
   * صيانة آلات الحصاد لتفادي أي شرارة ناتجة عن الاحتكاك الميكانيكي.`;
    } else {
      return `Pour vous protéger contre les **feux de forêts et d'espaces agricoles en Tunisie** (Kroumirie, Mogods, Siliana, Le Kef, Kasserine) :

### 🚨 Numéros d'alerte immédiate :
* **Protection Civile :** **198**
* **Direction Générale des Forêts :** **80 10 12 12**
* **Garde Nationale :** **193**

### Mesures indispensables :
1. **Débroussaillement :** Créez une bande de protection d'au moins 10 mètres propre autour des habitations et des parcelles de céréales.
2. **Interdiction formelle de brûlage :** Aucun feu de branchages ou mégot jeté par temps de sirocco (Chhili).
3. **En cas de fumée menaçante :** Fermez volets et portes, calfeutrez les aérations avec des linges humides, évacuez perpendiculairement au vent et protégez vos voies respiratoires.`;
    }
  }

  // 3. Voiture bloquée / Car in water / السيارة والمياه
  if (
    q.includes('سيارة') || 
    q.includes('طريق') || 
    q.includes('حاصرتني') || 
    q.includes('voiture') || 
    q.includes('véhicule') || 
    q.includes('route') || 
    q.includes('bloqué')
  ) {
    if (isAr) {
      return `🚨 **تصرف فوري إذا حاصرتك مياه الأمطار أو السيول داخل السيارة:**

1. **لا تحاول مواصلة القيادة في الماء:** إذا توقف المحرك (Cale)، فهذا يعني دخول الماء لغرفة الاحتراق؛ إياك ومحاولة إعادة تشغيله لأن ذلك سيعطل السيارة تماماً.
2. **اخرج من السيارة فوراً:** إذا كان مستوى الماء يرتفع، افتح الباب أو اخفض النافذة واخرج فوراً مع جميع الركاب.
3. **إذا علقت الأبواب بسبب ضغط الماء:** استخدم زر فتح النوافذ الكهربائية قبل أن تتلف، أو اكسر زجاج نافذة جانبية بواسطة رأس مقعد السيارة (Appuie-tête).
4. **اصعد فوق سقف السيارة أو إلى أرض مرتفعة:** إذا كان تيار السيل جارفاً، اصعد فوق سقف السيارة واطلب النجدة فوراً على **198** (الحماية المدنية) أو **193** (الحرس الوطني).`;
    } else {
      return `🚨 **Conduite à tenir immédiate si votre véhicule est cerné par les eaux :**

1. **N'essayez jamais de redémarrer un moteur calé dans l'eau.**
2. **Évacuez sans attendre :** Si l'eau commence à monter, détachez les ceintures et sortez immédiatement.
3. **Si les portes sont bloquées par la pression :** Ouvrez ou brisez une vitre latérale (à l'aide des tiges de l'appuie-tête) pour vous extraire.
4. **Réfugiez-vous sur le toit :** Si le courant est violent, montez sur le toit du véhicule et alertez le **198** (Protection Civile) ou le **193** (Garde Nationale).`;
    }
  }

  // 4. Default generic emergency prevention answer for Tunisia
  if (isAr) {
    return `مرحباً بك في **مستشار سلامة تونس الذكي**. إليك أهم الإرشادات العامة للسلامة ومجابهة الكوارث الطبيعية في تونس:

### 🚨 أرقام النجدة المباشرة:
* **الحماية المدنية:** **198** | **الحرس الوطني:** **193** | **الإسعاف:** **190**
* **طوارئ الكهرباء والغاز (الستاغ):** **80 10 03 33**

### القواعد الأساسية للسلامة:
1. **الابتعاد عن مجاري الأودية والمنخفضات** أثناء التقلبات الجوية والامتناع التام عن المجازفة بعبورها.
2. **قطع الكهرباء والغاز فوراً** في حال تسرب مياه الأمطار داخل المنزل.
3. **الاحتفاظ بحقيبة طوارئ منزلية** تضم الأدوية الضرورية، الوثائق، ومصدر إضاءة بديل.
4. **متابعة بيانات الحماية المدنية والمعهد الوطني للرصد الجوي بانتظام.**`;
  } else {
    return `Bienvenue sur **Salama Tunisie IA**. Voici les réflexes fondamentaux de sécurité civile en Tunisie :

### 🚨 Contacts d'urgence 24/7 :
* **Protection Civile :** **198** | **Garde Nationale :** **193** | **SAMU :** **190**
* **Dépannage STEG :** **80 10 03 33**

### Règles essentielles de protection :
1. **Éloignez-vous des berges d'oueds et zones inondables** par temps orageux.
2. **Coupez immédiatement le courant électrique** si l'eau pénètre dans le logement.
3. **Conservez un kit de survie familial** (papiers, pharmacie d'urgence, lampe torche, eau potable).
4. **Suivez les alertes officielles** de l'INM et de la Protection Civile.`;
  }
}
