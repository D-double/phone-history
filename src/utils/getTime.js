export default function getTime(dt, type) {
    const date = new Date(dt*1000);
    return type == 'min' ? date.getMinutes() : date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
}