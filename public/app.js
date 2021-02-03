const toCurrency = price => {
   return new Intl.NumberFormat('us-US', {
      currency: 'usd',
      style: 'currency'
   }).format(price);
};

document.querySelectorAll('.price').forEach(node => {
   node.textContent = toCurrency(node.textContent);
});

const $cartItems = document.querySelector('#cart-items');

if ($cartItems) {
   $cartItems.addEventListener('click', event => {
      if (event.target.classList.contains('remove-item-from-cart')) {
         const id = event.target.dataset.id;

         fetch(`/cart/remove/${id}`, {
               method: 'delete'
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