import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const logo = require("../../pictures/about1.png");

const About = ({ contentWidth }) => {
  let imgWidth = `${contentWidth + 9}%`;
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="grids">
      <div className="boxes">
        <div className="content-about">
          <header>TEHSUPPORT 1.0.27.1</header>
          <div className="signup">
            <NavLink to={"/login"}>
              <span> Повернутись на Login</span>
            </NavLink>
            <p></p>
            <div className="description">
              <p>
                <img
                  className="descriptionImg"
                  alt="about"
                  src={logo}
                  style={{ width: imgWidth }}
                />
                Tehsupport - представляє собою спеціалізовиний WEB сервіс типу
                TMS (Transportation management system – система управління
                вантажоперевезеннями або система управління транспортом), який є
                окремим підтипом великого сімейства поширених CRM систем
                (Customer relationship management - систем управління
                відносинами з клієнтами). Продукт спеціально адаптований для
                транспортної (технічної) галузі з додатковими можливостями по
                контролю напрацювання експлоатуємих підприємством
                електроприладів.
              </p>
              <p>
                Даний сервіс призначений для дрібних підприємств (перевізників),
                та надає додаткові можливості водіям і власникам виробів
                (транспортних засобів, приладів), щодо прозорої автоматизації
                обліку дорожніх листів (агрегатних, машинних та апаратних),
                пробігу (мотогодин, напраювання), обліку витрат та залишків
                паливно - мастильних матеріалів, таймінгу вчасного технічного
                обслуговування (ТО) та планового ремонту (СР, КР) транспортних
                засобів. Продукт надає можливісті керування виробами (зміну та
                отримання даних, ведення марщрутних розрахунків) як оператором
                (диспечером) окремого парку (підприємства), так і окремим
                працівником (водіем, оператором) конкретного виробу при наданні
                йому відповідних прав(коду). Також в продукті реалізована
                можливість стороннього контролю процесів у парках
                (підприємствах) без можливості втручання в їх діяльність.
              </p>
              <p>
                Програмний продукт створено за принципом PWA (Progressive Web
                App) - "поступового вебзастосуноку", який є гібридом звичайної
                вебсторінки (чи вебсайту) та мобільного застосунку. Поєднання
                цих властивостей значно покращує зручність користування. При
                цьому його використання нагадує використання мобільного
                застосунку.
              </p>
              <p>
                Інтерфейс користувача (опертора), виконано автором в за життєвим
                принципом простоти, у максимально спрощеному і зрозумілому
                варіанті, а саме за принципом так називаємої "бритви" Вільяма
                Оккама, який звучав приблизно так: «Entia Non sunt multiplicanda
                praeter necessitatem», що означає українською: «Не слід множити
                сутності без необхідності». Тобто технічною мовою - програма має
                стаабільно працювати при мінімальній кількості даних не завдаючи
                незручностей користувачу і бути зрозумілою навіть не
                підготовленому персоналу, який працює з продуктом вперше.
              </p>
              <p>
                Даний програмний продукт є експерементальним, і не призначений
                для обліку та контролю даних, які містять відомості з категорії
                "Для службового користування", тощо. Автор буде вдячний за всі
                відгуки, побажання та зауваження.
              </p>
              <p>pav4803@gmail.com, 2020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;