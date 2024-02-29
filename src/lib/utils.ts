export function getUserIdFromLocalStorage() {
  try {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))?.id;
    }
  } catch (error) {
    console.error(error);
  }
}

export function getUserEmailFromLocalStorage() {
  try {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))?.email;
    }
  } catch (error) {
    console.error(error);
  }
}

export function getCurrentBotId() {
  try {
    if (localStorage.getItem('currentBot')) {
      return JSON.parse(localStorage.getItem('currentBot'))?.id;
    }
  } catch (error) {
    console.error(error);
  }
}
