import React, { useState, useEffect } from "react";
import ImageWithCarousel from "../carrousel/Carrousel";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewInPropertyMutation,
} from "@/redux/features/property/propertiesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  id: string;
  activeImages: number;
  setActiveImages: (activeImages: number) => void;
  user: any;
  refetch: any;
};

const PropertyContentMedia = ({
  data,
  id,
  activeImages,
  setActiveImages,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const  [addReviewInProperty,{isSuccess:reviewSuccess, error:reviewError, isLoading:reviewCreationLoading}] = useAddReviewInPropertyMutation(); 
  const isReviewExist = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const firstImage = data?.images?.[0]?.url;
  useEffect(() => {
    console.log("Data received:", data);
  }, [data]);

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can´t be empty");
    } else {
      console.log({
        question,
        propertyId: id,
        contentId: data[activeImages]._id,
      });
      addNewQuestion({
        question,
        propertyId: id,
        contentId: data[activeImages]._id,
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Pregunta enviada exitosamente");
    }
    if (answerSuccess) {
      setQuestion("");
      refetch();
      toast.success("Respuesta enviada exitosamente");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if(reviewSuccess){
      setReview("")
      setRating(1)
      refetch()
      toast.success("Opinion enviada exitosamente")
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, answerSuccess, answerError,reviewSuccess, reviewError]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      propertyId: id,
      contentId: data[activeImages]._id,
      questionId: questionId,
    });
  };
  const handleReviewSubmit = async()=>{
    if(review.length === 0){
      toast.error("La reseña no puede estar vacia")
    }
    else{
      addReviewInProperty({review,rating,propertyId:id})
    }
  }
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <ImageWithCarousel
        imageSrc={firstImage}
        carouselImages={data[0]?.images.map((image: any) => image.url)}
      />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "PyR", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            } `}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3">
          {data[activeImages]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeImages]?.links.map((item: any, index: number) => (
            <div className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#43395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dv5f8vs9w/image/upload/v1718170134/avatars/qfcrjgrrmgkxkucirgop.jpg"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Escribe una pregunta..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins "
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Enviar
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeImages={activeImages}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExist && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dv5f8vs9w/image/upload/v1718170134/avatars/qfcrjgrrmgkxkucirgop.jpg"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, , 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Dejanos tu comentario..."
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins "
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${reviewCreationLoading && 'cursor-no-drop'}`}
                    onClick={reviewCreationLoading ? () =>{}: handleReviewSubmit}
                  >
                    Enviar
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeImages,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeImages].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeImages={activeImages}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};
const CommentItem = ({
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={
                item.user.avatar
                  ? item.user.avatar.url
                  : "https://res.cloudinary.com/dv5f8vs9w/image/upload/v1718170134/avatars/qfcrjgrrmgkxkucirgop.jpg"
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3 dark:text-white text-black">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question} </p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className=" 800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "Todas las respuestas"
                : "Responder"
              : "Ocultar respestas"}
          </span>
          <BiMessage
            size={20}
            className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any) => (
              <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                <div>
                  <Image
                    src={
                      item.user.avatar
                        ? item.user.avatar.url
                        : "https://res.cloudinary.com/dv5f8vs9w/image/upload/v1718170134/avatars/qfcrjgrrmgkxkucirgop.jpg"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>
                  {item.user.role === "admin" &&   <VscVerifiedFilled className="text-[#50c750]" />}
                  </div>
                  <p>{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Ingrese su respuesta..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95p%] ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Enviar
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default PropertyContentMedia;
