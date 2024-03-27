
export default function LoadingScreen({ ...other }) {
  return (
    <>
      <div className="fixed inset-0 w-full h-full bg-[#e0e7f1] bg-opacity-90">

        <div {...other} className="relative bg-white">
          <div
            className="absolute w-24 h-24 rounded-full border-3 border-primary-dark bg-white top-[200px]"
            style={{
              left: "calc(50% - 65px)",
              animation: 'spin 3.2s linear infinite',
              borderRadius: '25%'
            }}
          />
        </div>
      </div>
    </>
  );
}
