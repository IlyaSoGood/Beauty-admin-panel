export default function getZero(num: number): string {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return String(num);
    }
}