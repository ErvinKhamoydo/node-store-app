const toCurrency = price => {
   return new Intl.NumberFormat('us-US', {
      currency: 'usd',
      style: 'currency'
   }).format(price);
};

const toDate = date => {
   return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
   }).format(new Date(date));
};

document.querySelectorAll('.price').forEach(node => {
   node.textContent = toCurrency(node.textContent);
});

document.querySelectorAll('.date').forEach(node => {
   node.textContent = toDate(node.textContent);
});

const $cartItems = document.querySelector('#cart-items');

if ($cartItems) {
   $cartItems.addEventListener('click', event => {
      if (event.target.classList.contains('remove-item-from-cart')) {
         const id = event.target.dataset.id;
         const csrf = event.target.dataset.csrf;

         fetch(`/cart/remove/${id}`, {
               method: 'delete',
               headers: {
                  'X-XSRF-TOKEN': csrf
               }
            })
            .then(res => res.json())
            .then(cart => {
               if (cart.courses.length) {
                  const html = cart.courses.map(c => {
                     return `
                        <tr>
                           <td>${c.title}</td>
                           <td>${c.count}</td>
                           <td>
                              <button class="btn btn-small remove-item-from-cart" data-id="${c.id}">Delete</button>
                           </td>
                        </tr>
                     `;
                  }).join('');

                  $cartItems.querySelector('tbody').innerHTML = html;
                  $cartItems.querySelector('.price').textContent = toCurrency(cart.price);
               } else {
                  $cartItems.innerHTML = '<p>Cart is empty</p>';
               }
            });
      }
   });
}

// init Tabs (auth)
M.Tabs.init(document.querySelectorAll('.tabs'));