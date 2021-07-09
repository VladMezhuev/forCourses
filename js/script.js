const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? "По умолчанию";

  const items = data.map((item) => {
    let cls = "";
    if (item.id === selectedId) {
      text = item.value;
      cls = "selected";
    }

    return `
         <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
      `;
  });

  return `
   <div class="select__input" data-type="input">
      <img src="img/world.svg" alt="earth" class="icon__earth" />
      <span data-type="value">${text}</span>
      <img src="img/arrow.svg" alt="arrow" class="icon__arrow" data-type="arrow"/>
   </div>
   <div class="select__dropdown">
      <ol class="select__list">
         ${items.join("")}
      </ol>
   </div>
 `;
};

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  setup() {
    this.clickHendler = this.clickHendler.bind(this);
    this.$el.addEventListener("click", this.clickHendler);
    this.$arrow = this.$el.querySelector('[data-type = "arrow"]');
    this.$value = this.$el.querySelector('[data-type = "value"]');
  }

  clickHendler(event) {
    const { type } = event.target.dataset;

    if (type === "input" || event.target.parentNode.dataset.type === "input") {
      this.toggle();
    } else if (type === "item") {
      const id = event.target.dataset.id;
      this.select(id);
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove("selected");
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");

    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add("open");
    this.$arrow.style.transform = "rotate(180deg)";
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.style.transform = "rotate(360deg)";
  }
}
;

const select = new Select("#select", {
   placeholder: "Русский",
   selectedId: "0",
   data: [
      {id: "1", value: 'Русский'},
      {id: "2", value: 'Украинский'},
      {id: "3", value: 'English'},
   ]
});
