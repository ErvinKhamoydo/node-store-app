document.querySelectorAll('.price').forEach(node => {
   node.textContent = new Intl.NumberFormat('us-US', {
      currency: 'usd',
      style: 'currency'
   }).format(node.textContent);
});