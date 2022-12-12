export default new (class {
  info(message) {
    document.getElementById('myToast').classList.remove('hidden');
    document.getElementById('myToastWarning').classList.remove('hidden');
    document.getElementById('myToastMessage').innerHTML = message;
    setTimeout(function () {
      document.getElementById('myToast').classList.add('hidden');
    }, 3000);
  }

  success(message) {
    document.getElementById('myToast').classList.remove('hidden');
    document.getElementById('myToastSuccess').classList.remove('hidden');
    document.getElementById('myToastMessage').innerHTML = message;
    setTimeout(function () {
      document.getElementById('myToast').classList.add('hidden');
    }, 3000);
  }

  error(message) {
    document.getElementById('myToast').classList.remove('hidden');
    document.getElementById('myToastError').classList.remove('hidden');
    document.getElementById('myToastMessage').innerHTML = message;
    setTimeout(function () {
      document.getElementById('myToast').classList.add('hidden');
    }, 3000);
  }

  warning(message) {
    document.getElementById('myToast').classList.remove('hidden');
    document.getElementById('myToastWarning').classList.remove('hidden');
    document.getElementById('myToastMessage').innerHTML = message;
    setTimeout(function () {
      document.getElementById('myToast').classList.add('hidden');
    }, 4000);
  }
})();
