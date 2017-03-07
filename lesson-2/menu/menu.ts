type menuList = { title: string, link?: string, items?: menuList }[];
type menuOpt = { element: HTMLElement, menuList: menuList }
let menuList: menuList = [
  {
    title: 'Животные',
    items: [
      {
        title: 'Млекопитающие',
        items: [
          { title: 'Коровы' },
          { title: 'Ослы' },
          { title: 'Собаки' },
          { title: 'Тигры' }
        ]
      },
      {
        title: 'Другие',
        items: [
          { title: 'Змеи' },
          { title: 'Птицы' },
          { title: 'Ящерицы' },
        ],
      }
    ]
  },
  {
    title: 'Рыбы',
    items: [
      {
        title: 'Аквариумные',
        items: [
          { title: 'Гуппи' },
          { title: 'Скалярии' }
        ]
      },
      {
        title: 'Форель',
        items: [
          { title: 'Морская форель' }
        ]
      }
    ]
  }
];

class Menu {
  protected _element: HTMLElement;
  protected _menuList: menuList;

  public constructor(opt: menuOpt) {
    this._element = opt.element;
    this._menuList = opt.menuList;
    this._element.innerHTML = this._generateMenu(this._menuList);
    this._element.addEventListener('click', this._clickHandler)
  }


  protected _clickHandler(this: void, ev: MouseEvent) {
    let el: HTMLElement = ev.target as HTMLElement;
    let classList = el.classList;
    if (!classList.contains('title')) {
      return;
    }
    let parentLi = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle('menu-open')
  }

  protected _generateMenu(menuList: menuList): string {
    let content: string = `<ul>`;
    for (let a of menuList) {
      content += `<li><a ${a.items ? 'class=title' : ''}
      ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`
      if (!a.items) {
        content += `</li>`;
        continue;
      }
      content += `${this._generateMenu(a.items)}</li>`
    }
    return `${content}</ul>`
  }
}

let element = document.querySelector('.menu') as HTMLElement;
let nav = new Menu({ element, menuList })