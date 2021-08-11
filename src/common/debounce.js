export const debounce = (func, wait=500) => {
    let timer
    return args => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => func(args), wait)
        // return timer
    };
}