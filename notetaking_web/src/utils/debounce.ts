let timer: NodeJS.Timeout;

const debounce = (func: Function, delay: number) => {
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default debounce;
