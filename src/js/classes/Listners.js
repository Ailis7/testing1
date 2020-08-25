/* eslint-disable no-multi-assign */
import luhnAlgorithm from '../function/luhnAlgorithm';

export default class Listners {
  constructor() {
    this.input = document.querySelector('.numbers');
    this.imageArr = [...document.querySelectorAll('.image')];
    this.button = document.querySelector('.click');
    this.realCard = false;
    this.validTool = document.querySelector('.validStatus');
  }

  numListner() {
    const paymentbase = {
      2: 'mir', 4: 'visa', 60: 'discover', 62: 'unionpay',
    };
    paymentbase['30'] = paymentbase['36'] = paymentbase['38'] = 'diners_club';
    paymentbase['31'] = paymentbase['35'] = 'jcb';
    paymentbase['34'] = paymentbase['37'] = 'american_express';
    paymentbase['50'] = paymentbase['56'] = paymentbase['57'] = paymentbase['58'] = paymentbase['63'] = paymentbase['67'] = 'maestro';
    paymentbase['51'] = paymentbase['52'] = paymentbase['53'] = paymentbase['54'] = paymentbase['55'] = 'mastercard';

    this.input.addEventListener('keyup', () => {
      const one = paymentbase[this.input.value[0]];
      const two = paymentbase[this.input.value[0] + this.input.value[1]];
      const result = (one !== undefined) ? one : two;

      if (result !== undefined) {
        this.imageArr.forEach((e) => {
          if (!e.classList.contains('dark')) e.classList.add('dark');
        }); // решает проблему при копировании
        const img = document.querySelector(`.${result}`);
        const parrent = img.closest('.image');
        parrent.classList.remove('dark');
        this.realCard = true;
      } else {
        this.realCard = false;
        this.imageArr.forEach((e) => {
          if (!e.classList.contains('dark')) e.classList.add('dark');
        });
      }
    });
  }

  validating() {
    this.button.addEventListener('click', () => {
      const clear = () => {
        this.validTool.classList.remove('validing');
        this.validTool.classList.remove('notValiding');
      };

      if (this.realCard && luhnAlgorithm(this.input.value)) {
        clear();
        this.validTool.classList.add('validing');
      } else {
        clear();
        this.validTool.classList.add('notValiding');
      }
    });
  }
}
