import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../styles/estilos.css";

export default function Carousel({ slides = [] }) {
  if (!slides || slides.length === 0) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      style={{ marginBottom: "2rem" }}
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i}>
          <img src={s.img} alt={s.alt || `slide-${i}`} className="carousel-img" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
