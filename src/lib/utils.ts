export function getUserIdFromLocalStorage() {
  try {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))?.id;
    }
  } catch (error) {
    console.error(error);
  }
}
