export const debounce = (func, wait=500) => {
    let timeout;  // 定时器变量
    return args => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(args), wait);
    };
}