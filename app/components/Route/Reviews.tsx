import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};
export const reviews = [
    {
        name:"nill gates",
        avatar:"https://randomuser.me/api/portraits/men/1.jpg",
        profession:"Student | Cambridge University",
        comment:"Lorem IOPasdasdsadasdasdsadasdasdasdasd"
    },
    {
        name:"nill gates",
        avatar:"https://randomuser.me/api/portraits/women/1.jpg",
        profession:"Student | Cambridge University",
        comment:"    },Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet natus placeat dolor tempore praesentium voluptas odio sunt totam et porro aspernatur dignissimos at architecto cumque fuga, sed saepe vero id.        "
         },
    {
      name:"nill gates",
      avatar:"https://randomuser.me/api/portraits/men/1.jpg",
      profession:"Student | Cambridge University",
      comment:"Lorem IOPasdasdsadasd"
  },
  {
      name:"nill gates",
      avatar:"https://randomuser.me/api/portraits/women/1.jpg",
      profession:"Student | Cambridge University",
      comment:"la mas buena"
  }
]

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/perfil.png")}
            alt="business"
            width={500}
            height={500}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Nuestros clientes  <span className="text-gradient">nos respaldan</span>
            {""}
            <br />
            mira lo que dicen de nosotros
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            animi, perferendis laudantium provident assumenda et sequi
            voluptates ipsa exercitationem quibusdam accusamus fuga reiciendis
            natus qui placeat! Doloremque, quasi facere. Optio.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
          {reviews &&
          reviews.map((i,index)=> <ReviewCard item={i} key={index}/> )}

        </div>
    </div>
  );
};

export default Reviews;
