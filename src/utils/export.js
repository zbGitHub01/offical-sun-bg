export const exportMethod = data => {
  let url = data;
  let a = document.createElement("a");
  a.href = url;
  a.click();
};
export default {
  exportMethod
};
