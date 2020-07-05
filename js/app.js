// Local storage Controller
const SCtrl = (function () {

  return {
    AddItemToLs: item => {
      let items = [];
      if (localStorage.getItem('expense') === null) {
        items.push(item);
        localStorage.setItem('expense', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('expense'));
        items.push(item);
        localStorage.setItem('expense', JSON.stringify(items));
      }
    },
    getItems: () => {
      let items;
      if (localStorage.getItem('expense') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('expense'));
      }
      return items;
    },
    updateItem: updateditem => {
      const items = JSON.parse(localStorage.getItem('expense'));
      items.forEach((item, index) => {
        if (item.id === updateditem.id) {
          items.splice(index, 1, updateditem);
        }
      });
      localStorage.setItem('expense', JSON.stringify(items));
    },
    deleteItem: id => {
      const items = JSON.parse(localStorage.getItem('expense'));
      items.forEach((item, index) => {
        if (item.id === id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('expense', JSON.stringify(items));
    },
    clearItems: () => {
      localStorage.removeItem('expense');
    }
  }

})();

const ItemCtrl = (function () {
  function Item(id, expense, amount) {
    this.id = id;
    this.expense = expense;
    this.amount = amount;
  }

  const data = {
    items: SCtrl.getItems(),
    currentItem: null,
    //  totalExpenses: 0
  }

  return {
    setItem: (expense, Amount) => {
      let ID;
      data.items.length > 0 ? ID = data.items[data.items.length - 1].id + 1 : ID = 0;
      const amount = parseInt(Amount);
      const newItem = new Item(ID, expense, amount);
      data.items.push(newItem);
      return newItem;
    },
    logData: () => {
      return data;
    },
    getItems: () => {
      return data.items;
    },

    setCurrentItem: id => {
      data.items.forEach(item => {
        if (item.id === id) {
          data.currentItem = item;
        }
      });
    },
    getCurrentItem: () => {
      return data.currentItem;
    },
    updateItem: (newExpense, newAmount) => {
      let found;
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.expense = newExpense;
          item.amount = newAmount;
          found = item
        }
      });
      return found;
    },
    deletExpense: () => {
      const id = data.currentItem.id;
      data.items.forEach((item, index) => {
        if (item.id === id) {
          data.items.splice(index, 1);
        }
      });
      return data.currentItem.id
    },
    getTotalExpense: () => {
      let total = 0;
      data.items.forEach(item => {
        total += parseInt(item.amount);
      });
      return total;
    }
  }

})();

const UICtrl = (function () {
  selectors = {
    addExpense: '#expense-submit',
    itemInput: '#expense-input',
    amountInput: '#amount-input',
    expenseBtn: '.expense-expense',
    expenseItem: '.expense-item',
    editExpense: '.editBtn',
    backExpense: '.backBtn',
    deleteExpense: '.deleteBtn',
    cancelExpense: '.cancelkBtn'
  }
  return {

    addItemsToDom: items => {

      let output = '';
      items.forEach(item => {
        output += `
              <h6 class = "expense-title mb-0 text-uppercase list-item">${item.expense}</h6> 
              <h5 class = "expense-amount mb-0 list-item" >${item.amount}</h5> 
              <div class = "expense-icons list-item">
              <a href = "#" class = "edit-icon mx-2" data-id="${item.id}"> <i class='fas fa-edit'> </i></a>
              <a href = "#" class = "delete-icon" data-id="${item.id}"> <i class='fas fa-trash'> </i></a>
              </div>
            `;
      });
      document.querySelector('.expense-item').innerHTML = output;
    },
    addItemToDom: itemObj => {

      const expItem = document.querySelector(UICtrl.getSelectors().expenseItem);
      const h6 = document.createElement('h6');
      h6.classList.add("expense-title", "mb-0", "text-uppercase", "list-item");
      h6.innerHTML = `${itemObj.expense}`;
      expItem.appendChild(h6);
      const h5 = document.createElement('h5');
      h5.classList.add("expense-amount", "mb-0", "list-item");
      h5.innerHTML = `${itemObj.amount}`;
      expItem.appendChild(h5);
      const div = document.createElement('div');
      div.classList.add("expense-icons", "list-item");
      div.innerHTML = `
      <a href = "#" class = "edit-icon mx-2" data-id="${itemObj.id}"> <i class='fas fa-edit'> </i></a>
      <a href = "#" class = "delete-icon" data-id="${itemObj.id}"> <i class='fas fa-trash'> </i></a>
      `;
      expItem.appendChild(div);
    },
    editState: (newExpens, newAmount) => {
      document.querySelector(UICtrl.getSelectors().addExpense).style.display = 'none';
      document.querySelector(UICtrl.getSelectors().cancelExpense).style.display = 'none';
      document.querySelector(UICtrl.getSelectors().editExpense).style.display = 'inline';
      document.querySelector(UICtrl.getSelectors().backExpense).style.display = 'inline';

      document.querySelectorAll('.fa-edit').forEach(btn => {
        btn.style.display = 'none';
      });
      document.querySelectorAll('.fa-trash').forEach(btn => {
        btn.style.display = 'none';
      });
      document.querySelector(UICtrl.getSelectors().itemInput).value = newExpens;
      document.querySelector(UICtrl.getSelectors().amountInput).value = newAmount;
    },

    editStateDlete: (newExpens, newAmount) => {
      document.querySelectorAll('.fa-edit').forEach(btn => {
        btn.style.display = 'none';
      });
      document.querySelectorAll('.fa-trash').forEach(btn => {
        btn.style.display = 'none';
      });
      //document.querySelector('.budget-form').style.display = 'none';
      document.querySelectorAll('.h5').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.form-group-edit').forEach(el => el.style.display = 'none');
      document.querySelector(UICtrl.getSelectors().addExpense).style.display = 'none';
      document.querySelector(UICtrl.getSelectors().cancelExpense).style.display = 'inline';
      document.querySelector(UICtrl.getSelectors().deleteExpense).style.display = 'inline';
      document.querySelector('.feedback').style.display = 'block';
      document.querySelector('.title-data').textContent = newExpens;
      document.querySelector('.value-data').textContent = newAmount;

    },

    updateItem: newItem => {
      const id = newItem.id;
      const rootEl = document.querySelector(`[data-id=${CSS.escape(id)}]`);
      rootEl.parentElement.previousElementSibling.textContent = newItem.amount;
      rootEl.parentElement.previousElementSibling.previousElementSibling.textContent = newItem.expense;
    },
    deletExpense: id => {
      const rootEl = document.querySelector(`[data-id=${CSS.escape(id)}]`);
      const divParent = rootEl.parentElement;
      const siblingElement = divParent.previousElementSibling;
      const nextsibling = siblingElement.previousElementSibling;
      nextsibling.remove();
      siblingElement.remove();
      divParent.remove();
    },
    setTotalToDom: total => {

      document.querySelector('#expense-amount').textContent = total;
    },
    setbalanceToDom: (num, total) => {
      const result = parseInt(num) - total;
      document.querySelector('#balance-amount').textContent = result;
      if (result > 0) {
        document.getElementById("balance").classList.remove('showBlack', 'showRed');
        document.getElementById("balance").classList.add('showGreen');
      } else if (result < 0) {
        document.getElementById("balance").classList.remove('showBlack', 'showGreen');
        document.getElementById("balance").classList.add('showRed');
      } else if (result === 0) {
        document.getElementById("balance").classList.remove('showGreen', 'showRed');
        document.getElementById("balance").classList.add('showBlack');
      }
    },
    clearInput: () => {
      document.querySelector(UICtrl.getSelectors().itemInput).value = '';
      document.querySelector(UICtrl.getSelectors().amountInput).value = '';
    },
    clearEditstate: () => {
      document.querySelector(UICtrl.getSelectors().addExpense).style.display = 'inline';
      document.querySelector(UICtrl.getSelectors().editExpense).style.display = 'none';
      document.querySelector(UICtrl.getSelectors().backExpense).style.display = 'none';
      document.querySelector(UICtrl.getSelectors().deleteExpense).style.display = 'none';
      document.querySelector(UICtrl.getSelectors().cancelExpense).style.display = 'none';
      document.querySelector('.feedback').style.display = 'none';


      document.querySelectorAll('.fa-edit').forEach(btn => {
        btn.style.display = 'inline';
      });
      document.querySelectorAll('.fa-trash').forEach(btn => {
        btn.style.display = 'inline';
      });
    },
    clearDeleteState: () => {
      document.querySelector('.budget-form').style.display = 'block';
      document.querySelectorAll('.h5').forEach(el => el.style.display = 'block');
      document.querySelectorAll('.form-group').forEach(el => el.style.display = 'block');
      document.querySelector(UICtrl.getSelectors().addExpense).style.display = 'inline';
      document.querySelector(UICtrl.getSelectors().cancelExpense).style.display = 'none';
      document.querySelector(UICtrl.getSelectors().deleteExpense).style.display = 'none';
      document.querySelector('.feedback').style.display = 'none';
      document.querySelectorAll('.fa-edit').forEach(btn => {
        btn.style.display = 'inline';
      });
      document.querySelectorAll('.fa-trash').forEach(btn => {
        btn.style.display = 'inline';
      });

    },
    hideFeedbacks: () => {
      document.querySelector('.budget-feedback').style.display = 'none';
      document.querySelector('.expense-feedback').style.display = 'none';
    },
    expenseFeedback: message => {
      document.querySelector('.expense-feedback').style.display = 'block';
      document.querySelector('.expense-feedback').textContent = message;
      setTimeout(() => document.querySelector('.expense-feedback').style.display = 'none', 1500);
    },
    budgetFeedback: message => {
      document.querySelector('.budget-feedback').style.display = 'block';
      document.querySelector('.budget-feedback').textContent = message;
      setTimeout(() => document.querySelector('.budget-feedback').style.display = 'none', 1500);
    },
    getSelectors: () => {
      return selectors;
    }
  }
})();

const AppCtrl = (function (ItemCtrl, UICtrl, SCtrl) {

  function loadEventListeners() {

    // Add item Event logic
    document.querySelector(UICtrl.getSelectors().addExpense).addEventListener('click', e => {
      const itemInput = document.querySelector(UICtrl.getSelectors().itemInput).value;
      const expenseInput = document.querySelector(UICtrl.getSelectors().amountInput).value;
      if (itemInput !== '' && expenseInput !== '') {
        const newItem = ItemCtrl.setItem(itemInput, expenseInput);
        UICtrl.addItemToDom(newItem);
        UICtrl.clearInput();
        SCtrl.AddItemToLs(newItem);
        const totalEx = ItemCtrl.getTotalExpense();
        UICtrl.setTotalToDom(totalEx);
        const inputBudjet = document.querySelector('#budget-input').value;
        if (inputBudjet) {
          UICtrl.setbalanceToDom(inputBudjet, totalEx);
        }
      } else {
        UICtrl.expenseFeedback('Fill the form please!');
      }
      e.preventDefault();
    });

    /// Update & Delete Events
    document.querySelector(UICtrl.getSelectors().expenseBtn).addEventListener('click', e => {
      // Update 
      if (e.target.classList.contains('fa-edit')) {
        const item = e.target.parentElement;
        const id = parseInt(item.getAttribute('data-id'));
        ItemCtrl.setCurrentItem(id);
        const itemToUpdate = ItemCtrl.getCurrentItem();
        UICtrl.editState(itemToUpdate.expense, itemToUpdate.amount);

        // Delete
      } else if (e.target.classList.contains('fa-trash')) {
        const item = e.target.parentElement;
        const id = parseInt(item.getAttribute('data-id'));
        ItemCtrl.setCurrentItem(id);
        const itemToUpdate = ItemCtrl.getCurrentItem();
        UICtrl.editStateDlete(itemToUpdate.expense, itemToUpdate.amount);
      }
    });

    // Edit event
    document.querySelector('#expense-edit').addEventListener('click', e => {
      const newExpense = document.querySelector(UICtrl.getSelectors().itemInput).value;
      const newAmount = document.querySelector(UICtrl.getSelectors().amountInput).value;
      const newItem = ItemCtrl.updateItem(newExpense, newAmount);
      UICtrl.updateItem(newItem);
      UICtrl.clearInput();
      UICtrl.clearEditstate();
      SCtrl.updateItem(newItem);
      const totalEx = ItemCtrl.getTotalExpense();
      UICtrl.setTotalToDom(totalEx);
      const inputBudjet = document.querySelector('#budget-input').value;
      if (inputBudjet) {
        UICtrl.setbalanceToDom(inputBudjet, totalEx);
      }

      e.preventDefault();
    });
    // Delete expense
    document.querySelector('#expense-delete').addEventListener('click', e => {
      const id = ItemCtrl.deletExpense();
      UICtrl.deletExpense(id);
      UICtrl.clearDeleteState();
      const totalEx = ItemCtrl.getTotalExpense();
      UICtrl.setTotalToDom(totalEx);
      SCtrl.deleteItem(id);
      const inputBudjet = document.querySelector('#budget-input').value;
      if (inputBudjet) {
        UICtrl.setbalanceToDom(inputBudjet, totalEx);
      }
      e.preventDefault();
    });
    // Cancel delete expense
    document.querySelector('#cancel-back').addEventListener('click', e => {
      UICtrl.clearDeleteState();
      e.preventDefault();
    });
    // Back event 
    document.querySelector('#expense-form').addEventListener('click', e => {
      if (e.target.classList.contains('backBtn')) {
        UICtrl.clearInput();
        UICtrl.clearEditstate();
        e.preventDefault();
      }
    });
    document.querySelector('#budget-submit').addEventListener('click', e => {

      const inputBudjet = document.querySelector('#budget-input').value;
      if (inputBudjet !== '') {
        document.querySelector('#budget-amount').textContent = inputBudjet;
        const totalEx = ItemCtrl.getTotalExpense();
        UICtrl.setbalanceToDom(inputBudjet, totalEx);
      } else {
        UICtrl.budgetFeedback('Fill the field please!');
      }

      e.preventDefault();
    });
  }

  return {
    init: () => {
      UICtrl.hideFeedbacks();
      UICtrl.clearEditstate();
      /// Add Existing Items
      const items = ItemCtrl.getItems();
      UICtrl.addItemsToDom(items);

      /// Total Expenses 
      const totalEx = ItemCtrl.getTotalExpense();
      UICtrl.setTotalToDom(totalEx);

      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl, SCtrl);


AppCtrl.init();