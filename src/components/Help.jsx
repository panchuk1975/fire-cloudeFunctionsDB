import React from "react";
import fire from "../config/Fire";
// const operator = require("../pictures/operator.png");
// const about2 = require("../pictures/about2.png");
// const about3 = require("../pictures/createNewAuto.png");
// const about4 = require("../pictures/createOpen.png");
// const about5 = require("../pictures/openCar.png");
// const about6 = require("../pictures/openCarForm.png");
// const about7 = require("../pictures/openListForm.png");
// const about8 = require("../pictures/createNewDocument.png");
// const about9 = require("../pictures/routeStandart.png");
// const about10 = require("../pictures/routeNoStandart.png");
// const pmm = require("../pictures/pmm.png");

const Help = () => {
  //let contentWidthNumber =
    // 7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
    // 3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
    // 7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
    // 6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
    // 0.1046586 * window.innerWidth +
    // 106.6952733;
  //let imgWidth = `${contentWidthNumber + 6}%`;
  let email = "";
  if (fire.auth.currentUser) {
    email = fire.auth.currentUser.email;
    email = email.split("@")[0];
  }
  return (
    <div className="helpConteiner">
      <div>
        <small>{email}</small>
      </div>
      <div className="helpContent">
        <div className="textConteiner">
         <h3>FORAS-LAND DB 1.0.0</h3>
          <p></p>
          {/*  <div className="helpDescription">
            <div>
              <div className="helpStart">
                <a href="#start">
                  1. Початок роботи після регіістрації, загальний опис
                  інтерфейсу користувача.
                </a>
              </div>
              <div className="helpStart">
                <a href="#block1">
                  2. Структура робочих вікон документу, навігаційна панель.
                </a>
              </div>
              <div className="helpStart">
                <a href="#block2">
                  3. Структура закладки створення нового об'єкту, особлиивості
                  заповнення форми при створенні нового об'єкту.
                </a>
              </div>
              <div className="helpStart">
                <a href="#block3">
                  4. Структура об'єкту, підоб'єкти об'єкту, стан форми
                  відображення об'єкту, оточення об'єкту.
                </a>
              </div>
              <div className="helpStart">
                <a href="#block4">
                  5. Особливості ведення документації об'єкту (додавання,
                  корекція, видалення).
                </a>
              </div>
            </div>
            <p></p>
            <a href="!#" name="start">
              <h5>
                1. Початок роботи після регіістрації, загальний опис інтерфейсу
                користувача.
              </h5>
            </a>
            <p>
              Після виконання процедури реєстрації (авторизації) користувач
              автоматично потрапляє на домашню сторінку, в якості якої вибрано
              нейтральну титульну вкладку інструккції користувача (допомоги).
              Для початку налаштувань профілю користувачу необхідно перейти на
              вкладку "Профіль". Вікно користувача профілю складається з десяти
              активних форм, що функціонально поділяються на три групи, а саме:
              перша група - обовязкові до заповнення "Ідентифікатор" та
              "Відображення" (салатового кольору), друга - не обовязкові (сірого
              кольору) і третя, незмінна форма - "Email" (підсвічуються червоним
              під час наведення курсора).
            </p>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={operator}
                style={{ width: imgWidth }}
              />
              Перші три форми (ім'я, призвіще, телефон) не обовязкові для
              заповнення та призначені для більш детальної самоідентифікації
              конкретного користувача. Шоста форма (email) є не змінною і
              заповнюються автоматично (так само як і "Ідентифікатор") під час
              реєстрації. Четверта, п'ята і сьома форми є важливими і
              застосовуються у під час настройки профілю користувача.
            </p>
            <p>
              Програмний продукт (сервіс) здатен працювати у трьох режимах: в
              повноцінному режимі оператора підприємства (підрозділу,
              підпідрозділу), у режимі користувача виробу і у режимі контролю
              (нагляду). Для використання кожного з режимів використовуються
              відповідні налаштування полів у вікні профілю користуача.
            </p>
            <p>
              "Режим оператора". Для активації повноцінного режиму оператора з
              адміністративними (повними) правами на створення, зміну (корекцію)
              та видалення об'єктів (документів) підпорядкованого підприємства
              (підрозділу) необхідно скопіювати віст форми "Ідентифікатор" (4) в
              форму "Відображення" (5) і зберегти профіль. Після успішного
              збереження відповідні права буде атоматично надано.
            </p>
            <p>
              "Режим користувача". Для активації режиму користувача з обмеженими
              правами на зміну (корекцію) документів об'єкту експлуатації без
              можливості їх видалення необхідно отримати ID(identity document) -
              ідентифікаційний номер об'єкту (групи об'єктів) у оператора
              підприємства(підрозділу). Після чого необхідно ввести ID в форму
              "ID" вікна профілю і зберегти профіль. Після успішного збереження,
              обмежені права на на об'єкт (об'єкти) буде атоматично надано і
              об'єкт (об'єкти) з'явиться у вікні профілю (!). На цей час обєкт
              залишається під повним контролем та наглядом оператора
              підприємства. З метою дотримання правил безпеки та одноособової
              відповідальності рекомендується викорисстання максимум одного
              об'єкту кожним користуачем, який має права на корекцію лише
              найнижчої ланки документів (наприклад конкретних маршрутів руху
              або завдань). Права на більшу кількість об'єктів рекомендується
              надавати скоріше як виключення, чим як правило.
            </p>
            <p>
              "Режим нагляду". Для активації режиму нагляду(контролю) з
              забороною будь-якої зміни (корекції) документів, видалення
              документів та видалення (корекції) самих об'єктів (виробів),
              необхідно отримати "Ідентифікатор" визначеного підприємства у
              оператора підприємства(підрозділу), ввести його в форму
              "відображення" профілю та зберегти профіль. Після успішного
              збереження, права на огляд об'єктів підриемства буде атоматично
              надано, і самі об'єкти з'являться у робочих вікнах відповідно до
              їх класифікації. На цей час обєкти залишаються під повним
              контролем та наглядом оператора підприємства. Контролююча особа
              має право лише на огляд об'єктів.
            </p>
            <p>
              Увага! Після закінчення реєстрації "Ідентифікатор" спочатку
              формується автоматично відповідно до "Email" користувача. Він не
              може повторюватись у інших користувачів, але може змінюатись
              оператором на будь-який інший, неповторний, за бажанням чи
              необхідністю (наприклад у випадку необхідності примусової зміни
              відповідних прав на об'єкт у користувача нижчої ланки або після
              закінчення роботи перевіряючої особи).
            </p>
            <p>
              З метою забезпечення максимально надійного збереження господарчих
              електронних документів, видалення аккаунту можливе лише у двох
              випадках: перший - при завершенні повного видалення документів
              починаючи з найнижчого рівня до самих об'єктів господарювання
              вручну, другий - у автоматичному режимі при виставленні періоду
              зберігання документів 0 місяців на закладці навігаційної панелі
              "ПММ" (що буде докладно пояснено нижче). При цьому права на
              видалення документу (об'єкту) вищого порядку (наприклад листа)
              надаються лише за умови повного видалення об'єктів нижчого порядку
              - маршрутів цього листа (у всіх випадках без винятку крім
              видалення у автоматичному режимі). Самі об'єкти господарювання
              видаляються тільки вручну особисто оператором.
            </p>
            <p></p>
            <a href="!#" name="block1">
              <h5>2. Структура робочих вікон документу, навігаційна панель.</h5>
            </a>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about2}
                style={{ width: imgWidth }}
              />
              Структуру робочої сторінки програмного продукту, можливо умовно
              розділити на чотири окремі рівні. Перший (найвищий рівень) -
              навігаційна панель, яка являє собою стандартну панель з логотипом
              у лівій частині, стандартними кнопками (закладками) із
              підсвічуванням при покритті курсором та активної у данний час
              підсвіченої закладки. Навігаційна панель складається з дев'яти
              активних частин (закладок), які відповідно поділяються на шість
              умовних функціональних груп: перша - закладка створення нових
              об'єктів, друга - чотири закладки відповідно до функціональної
              кваліфікації об'єктів (автомобілі, автомобілі - агрегати,
              агрегати, електроприлади), третя - закладка підсумкового
              загального обліку паливно - мастильних матеріалів (ПММ), четверта
              - закладка профілю користуувача, п'ята - виход з аккаунту, шоста -
              інструкція користувача.
            </p>
            <p>
              У робочому вікні також виділяються слідуючі рівні: особистий
              ідентифікатор - зліва під навігаційною панеллю, самі об'єкти
              (автомобілі, автомобілі - агрегати, агрегати, електроприлади) та
              панель кнопок виводу підсумковвої інформації у вигляді документів
              Microsoft Office Excel.
            </p>
            <p>
              Структура організації всіх чотирьох робочих закладок однакова, що
              позбавляє автора необхідності окремих пояснень та припускає легку
              самостійну експлуатацію користувачем.
            </p>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={pmm}
                style={{ width: imgWidth }}
              />
              Не меньш фукціонально важливою є закладка підсумкового обліку
              паливно - мастильних матеріалів ("ПММ"). Крім навігаційної панелі
              і індентифікатора, тут відповідно відображено: форми для вибору
              звітнього періоду (1) - документи поза його межами не
              обліковуються і не відображаються, форма встановлення періоду
              зберігання облікових електронних документів (2) - але не більше
              ніж 36 місяців, кнопка збереження інформації та кнопка примусового
              видалення документів (3), які є старішими за визначений у формі 2
              строк зберігання. Оператор може самостійно видаляти застарілі
              документи, або при кожному збереженні налаштувань вкладки "ПММ"
              буде спрацьовувати автоматичне нагадування щодо необхідності
              видалення застарілих об'єктів. На данний час розробником не додано
              функцію примусоого автоматичного стирання, але при необхідності
              очищення переповненого сховища даних при умовах тотального
              ігнорування користувачами відповідних вимог щодо збереження даних
              (не більше 36-ти місяців) дану функцію буде активовано.
            </p>
            <p>
              Під панеллю налаштування, в окремих для кожного типу палива
              вікнах, відображено підсумок використання паливно - мастильних
              матеріалів (ПММ) за звітній період у реальному часі. Титульною
              строкою у кожному вікні прописується назва палива з відображенням
              зліва і справа відповідної щільності на початок і на кінець
              звітнього періоду. Другою строкою прописано рух ПММ у літрах, а
              третьою строкою - рух ПММ у кілограмах.
            </p>
            <p>
              У самому низу - кнопока виводу підсумковвої інформації щодо руху
              ПММ у вигляді документу Microsoft Office Excel для подальшої
              зручної обробки їнформації оператором.
            </p>
            <p></p>
            <a href="!#" name="block2">
              <h5>
                3. Структура закладки створення нового об'єкту, особлиивості
                заповнення форми при створенні нового об'єкту.
              </h5>
            </a>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about3}
                style={{ width: imgWidth }}
              />
              Структура закладки являє собою робоче вікно з визначеною
              конкретною кількістю форм для кожного типу об'єкту. Форми
              заповнення функціонально поділяються на три групи, а саме: перша -
              обовязкові до заповнення: "Оберіть тип виробу"(1),
              "Найменування"(2), "Обліковий номер"(3), "Початковий км"(13),
              "Палива на км, л"(16), "Поточний стан"(19) - всі салатового
              кольору, друга - не обовязкові (сірого кольору) але
              "Ідентифікатор"(20) і "Додаткові дані"(21) теж можуть нести
              важливу інформацію при заповненні, третя - службові (сірого
              кольору), які при наведенніна них курсору підсвічуються червоним.
              Вони (!) не заповнюються вручну: "Останній, км", "Загальний
              пробіг, км", "Останні мотогодини", "Напрацювання, м/г".
            </p>
            <p>
              Внизу робочого вікна розташовано кнопку створення нового об'єкту
              салатового кольору, при натисненні на яку створюється виріб
              господарювання вибраної категорії. Для роботи з новим виробом
              оператору (користувачу) необхідно перейти на відповідну робочу
              вкладку.
            </p>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about4}
                style={{ width: imgWidth }}
              />
              Для початкку створення нового об'єкту необхідно вибрати тип виробу
              у формі "Оберіть тип виробу"(1), після чого буде розвернуто
              відповідна кількість форм заповненння, наприклад максимальна для
              типу "Автомобіль - агрегаат" і мінімальна для типу
              "Електроприлад".
            </p>
            <p>
              "Найменування виробу" і "Обліковий номер"(державний номер) -
              обовязкові для заповнення форми типу "текст". У разі їх не
              заповнення процес створення нового виробу буде заблоковано.
            </p>
            <p>
              Форми починаючи з "Заводський номер" і закінчуючи "№
              спецобладнання"- є інформативними формами типу "текст" і не
              обовязкові для заповнення, проте призначені для зберігання
              важливої для кожного виробу стандартної заводської та облікової
              інформації.
            </p>
            <p>
              Форми "Початковий, км", "Початкові мотогодини", "Палива на км, л",
              "Палива на год, л" - є обовязковими для заповнення формами типу
              "число". У разі їх не заповнення будуть відсутні початкові данні
              для обліку напрацювання (пробігу) обєкту. Потребує уваги те, що
              витрата палива (!) надаеться у літрах на 1 км, або у літрах на 1
              годину.
            </p>
            <p>
              Форми починаючи з "На останнє ТО2, км" і закінчуючи "М\г до СР" -
              є формами типу "число" і призначені для введення даних виробу з
              метою контролю (моніторингу) напрацювання виробу до відповідних
              видів технічного обслуговування (ТО) або ремонту (КР, СР) у
              реальному чаасі. Наприклад: у формі "На останнє ТО2, км"
              зазначаеться пробіг виробу який був під час проведення останнього
              ТО-2, а у графі "Пробіг до ТО2" зазначаеться встановлений
              керівними документами пробіг виробу до наступного ТО-2. Візуальний
              контроль цього виводиться на кожному виробі у режимі реального
              часу, що буде детальніше роз'яснено нижче.
            </p>
            <p>
              Форма "Поточний стан" є інформативною, але обовязковою формою типу
              "текст" і призначена для зазначення поточного стану виробу.
              Значення форми "Справний" визначає стандартний робочий вид виробу,
              будь який інший зазначений стан означатеме підсвічування всього
              виробу червоним кольором як несправного.
            </p>
            <p>
              Форма "Ідентифікатор" є інформативною формою типу "текст" не
              обовязковою до заповнення і призначеною для зазначення вибраного
              оператором для конкретного виробу ідентифікатора, з допомогою
              якого надаватиметься доступ до виробу іншим особам. Може бути
              заповненою у будь - який момент.
            </p>
            <p>
              Форма "Додаткові дані" є інформативною формою типу "текст" не
              обовязковою до заповнення і призначеною для зберігання додаткових
              даних виробу.
            </p>
            <p></p>
            <a href="!#" name="block3">
              <h5>
                4. Структура об'єкту, підоб'єкти об'єкту, стан форми
                відображення об'єкту, оточення об'єкту.
              </h5>
            </a>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about5}
                style={{ width: imgWidth }}
              />
              Розберемо структуру зовнішнього вигляду об'єктів (виробів) у
              робочому вікні на прикладі об'єктів типу "Автомобіль". У полі
              робочої закладки "Автомобілі" відображаються два об'єкти (1).
              Верхній об'єкт з розгорнутими скритими закладками "Листи" і
              "Завдання(маршрути)". Тобто, кожний обєкт складається з трьох
              складових частин: перша - тіло об'єкту, містить всі дані про виріб
              введені при створенні, плюс додаткову інформацію щодо
              напраацювання до технічного обслуговування та ремонту; друга -
              массив листів (журналів), документів які охоплюють визначений
              період часу або обєднаних одною ціллю завдань(2); третя - массив
              завдань (3) у кожному листі під скритою вкладкою
              "Завдання(маршрути)". Також у тілі виробу перед лінійкою кнопок
              створення нового маршруту (6) відображається поточна наявність ПММ
              у даному листі (4). Під першою лінійкою кнопок відображається
              поточний стан ПММ виробу(5), під ним - лінійка кнопок створення
              нового листа (7).
            </p>
            <p>
              По правій стороні розтащовані кнопки видалення маршрутів (8), при
              активації котрих маршрут буде безповоротньо видалено (!). При
              наявності марщрутів у листі кнопка видалення листа (11) не
              відображається, і буде висвітленою тільки при умові повного
              видалення всіх маршрутів листа. Аналогічно, кнопка видалення
              виробу (9, 12), буде висвітленою тільки при умові повного
              видалення всіх листів виробу.
            </p>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about6}
                style={{ width: imgWidth }}
              />
              Активація та висвітлення внутрішньої інформації об'єктів у вигляді
              розвернутої форми здійснюється кліком підсвіченої активної області
              об'єкту (10), що надає можливість корекції об'єктів та зчитування
              необхідної технічної інформації (пробігу до ТО, ремонту, тощо).
              Закриття форми виконуеться у зворотньому порядку кліком курсора на
              підсвічену область у верхній частині форми (1) з продовженням
              інформації щодо ТО, або кліком на кнопку збереження інформації
              (2). У розгорнутому стані можливо чітко прослідкувати, яку саме
              інформацію відображено.
            </p>
            <p>
              Наприклад, відображена інформація під нумерацією 1-2, 5-10 є
              сталою, вводиться під час створення виробу і відслідковується
              також у розгорнутій формі нижче. Інформаці під нумерацією 11-22 є
              змінною і відтворює інформацію щодо строків ТО в реальному часі.
              При перевищенні строків вдповідне відображення буде підсвічено
              червоним кольором і буде сигналом оператору щодо подальшого
              планування використання даного виробу понад нормовані керівною
              документацією строки або планування відповідного ТО (ремонту).
            </p>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about7}
                style={{ width: imgWidth }}
              />
              Аналогічно, активація та висвітлення внутрішньої інформації
              об'єкту другого (третьго) рівня (листа, маршрута) у вигляді
              розвернутої форми здійснюється кліком підсвіченої активної області
              об'єкту (1), що надає можливість корекції об'єктів та зчитування
              необхідної технічної інформації. Закриття форми виконуеться у
              зворотньому порядку кліком курсора на кнопку "Закрити форму
              листа"(2), або кліком на кнопку збереження інформації (3).
            </p>
            <p>
              Основний принцип внутрішніх вкладок та розгорнутих (згорнутих)
              форм збережено для всіх видів та рівнів об'єктів, з метою
              максимального спрощення користування ними. Доступ до об'єктів
              найнижчого рівня здійснюється через відкриття вкладки
              "Завдання(листи)" (5) відповідно у кожному об'єкті вищого рівня.
              Звісно, можливість видалення виробів вищого рівня можливий тільки
              у випадку повного видалення виробів нижчого рівня.
            </p>
            <a href="!#" name="block4">
              <h5>
                5. Особливості ведення документації об'єкту (додавання,
                корекція, видалення).
              </h5>
            </a>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about8}
                style={{ width: imgWidth }}
              />
              Порядок створення нових об'єктів організовується з верхнього рівня
              до нижнього, але порядок ведення документації організовується
              навпаки, з документа найнижчого рівня до найвищчого, закінчуюючи
              підсумковою інфформацією у вкладці ПММ.
            </p>
            <p>
              Документом середнього рівня є лист, який створюється кліком кнопки
              "+Лист". Найважливішою (!) формою для обовязкового заповення є
              "Номер листа". якщо номр листа буде відсутній, лист не буде
              створено (!). Форми "Дата листа" і "Коефіцієнт сезону" є теж
              обовязковимию. Вони заповнюються автоматично, але звісно
              коригуються оператором відповідно до реалій. "Коефіцієнт сезону"
              призначений для обліку ппори року, яка звісно впливає на витрату
              ПММ. Форми, поле яких при наведенні курсора підсвічується червоним
              є службовими і вручну не заповвнюються (!).
            </p>
            <p>
              Документом найнижчого рівня є "Завдання (маршрут)". У розгорнутій
              вкладці нового маршруту основною формою є "Номер" маршруту, який
              задається автоматично згідно з номером "Завдання(Листа)" і у
              більшості випадків не потребує корекції. Слідуючою основною формою
              яка має заповнюватись є "Загальний пробіг" в км, графа "Без обліку
              пробігу" призначена і заповвнюється замість пробігу у випадку
              паралельного обліку іншого ПММ на цьому ж маршруті (наприклад
              масла). Тобто, для цього створюється аналогічний маршрут в якому
              буде обліковуватись витрата, але пробіг (напрацювання) завжди у
              підсумку буде рівним нулю, тому що витрата здійснюється за рахунок
              пробігу по попередньому маршруту.
            </p>
            <p>
              Далі розміщено приклади заповнення маршруту з обліком витрати
              основного типу ПММ та не основного типу ПММ. При чому облік ПММ
              здійснюється в літрах і в кілограмах, тому необхідно не заабувати
              про заповвнення графи "Щільність", особливо на початку і на кінці
              періоду обліку відповідного ПММ (для обліку буде взяте початкове
              значення щільності ПММ у першому маршруті (!) і відповідно в
              останньому маршруті (!). Всі проміжкові значення буде пропущено!).
            </p>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about9}
                style={{ width: imgWidth }}
              />
              "Коефіцієнт шляху" призначений для облікування стану дорожнього
              покриття під час експлуатаії транспортних засобів. "Коефііцієнт
              витрати" є також важливою графою, яка під час обліку основних ПММ
              завжди дорівнює "1". У інших випадках коєфіцієнт визначає
              співвідношення витрат не основних ПММ (масел, охолоджуючих рідин)
              до основних. Наприклад коефіцієнт співвідношення витрат масла для
              бензинових автомобілів радянського виробництва складає 0.022.
              "Коефіцієнт завантаження" використовуеться під час руху виробу з
              додатковим вантажем або причепом. Він ввказує на зміну витрат
              палива в залежностіі від ваги вантажу і причепу. Для вантажних
              автомобілів радянського виробництвва він складає 0.02. Для більш
              сучасних авто приблизно 0,005 але має визначатись
              експерементально, шляхом усереднення для кожного авто окремо.
            </p>
            <p>
              <img
                className="helpDescriptionImg"
                alt="about"
                src={about10}
                style={{ width: imgWidth }}
              />
              Пояснення до прикладу заповнення маршруту для обліку не основного
              типу ПММ: якщо основного палива витрачено 100 л, то масла
              витрачено 100 * 0.022 = 2.2 л. Всі інші форми крім "Коефіціент
              витрати", відємне значення у формі "Пробіг без вантажу"
              (відповідно "0" у формі "Пробіг") залишаються незмінними.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Help;
