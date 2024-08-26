export default function ImageComponent({ fileName }: { fileName: string }) {
  return <img src={`/images/${fileName}.png`} alt={fileName} width={'55%'} />
}
