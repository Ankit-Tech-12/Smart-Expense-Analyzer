export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("expenseAppState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("expenseAppState", serializedState);
  } catch (err) {
    // ignore write errors
  }
};

