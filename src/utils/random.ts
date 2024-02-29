export const getRandomRGBA = () => {
    const r = Math.floor(Math.random() * 256); // 随机生成红色通道的值（0-255）
    const g = Math.floor(Math.random() * 256); // 随机生成绿色通道的值（0-255）
    const b = Math.floor(Math.random() * 256); // 随机生成蓝色通道的值（0-255）
    const a = Math.random().toFixed(2); // 随机生成透明度的值（0-1），保留两位小数

    return `rgba(${r}, ${g}, ${b}, ${a})`; // 返回 RGBA 格式字符串
}