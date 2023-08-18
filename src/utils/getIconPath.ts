// import fs from 'fs'
// console.log(fs.readFile);

const paths = {
  menu: import.meta.glob("@/assets/icons/menu/*.png", { eager: true }),
  homepage: import.meta.glob("@/assets/icons/homepage/*.png", { eager: true }),
  network: import.meta.glob("@/assets/icons/network/*.png", { eager: true }),
  nodeDiagnosis: import.meta.glob("@/assets/icons/nodeDiagnosis/*.png", { eager: true })
}




type Key = keyof typeof paths
/**
 * 
 * 从文件中获取对应的icon图片
 * @param pageName 对应的icon页面 
 * @param filename 需要的文件名
 * @returns string | undefined
 */
export default function getIconPath(pageName: Key) {
  const icons = Object.keys(paths[pageName])

  return (filename: string) => {
    const path = icons.find(item => item.includes(filename)) ?? ''
    const matched = path.match(/\/([^\\/]+)$/)

    if (matched) {
      const url = new URL(`../assets/icons/${pageName}/${matched[1]}`, import.meta.url).href
      return url
    }
  }
}