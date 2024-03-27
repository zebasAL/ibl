import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function DashboardIndex() {

  return (
    <section className="dashboard-index">

      <h3 className="header mt-[50px] md:mt-[100px]">IBL TEST BY SEBASTIAN ALMEIDA</h3>

      <p className="sub-header">Technologies used</p>

      <div className='carousel-container'>
        <Carousel
          autoPlay
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={0}
          keyBoardControl={true}
          transitionDuration={1000}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        >
          <div className='carousel-item'>
            <img src="assets/sass.png" className="image" />
          </div>
          <div className='carousel-item'>
            <img src="assets/tailwind.png" className="image" />
          </div>
          <div className='carousel-item'>
            <img src="assets/typescript.png" className="image" />
          </div>
          <div className='carousel-item'>
            <img src="assets/vite.png" className="w-full h-full object-cover" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}