
export default function Wave({ classname = "" }: { classname?: string }) {

  return (
    <div className={`wave-container ${classname}`}>
      <div className="wave wave1" />
      <div className="wave wave2" />
      <div className="wave wave3" />
      <div className="wave wave4" />
    </div>
  )
}