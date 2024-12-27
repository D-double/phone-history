export const timer = (date, maxTime)=>{
    const dateNow = new Date().getTime() / 1000;
    const passedTime = parseInt(dateNow - date);
    return passedTime > maxTime ? 0 : maxTime - passedTime
}