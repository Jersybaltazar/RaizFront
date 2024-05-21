import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-hot-toast";

type Props = {
  active: number;
  setActive: any;
  propertyContentData: any;
  setPropertyContentData: (propertyContentData: any) => void;
  handleSubmit: any;
};

const ContentProperty: FC<Props> = ({
  propertyContentData,
  setPropertyContentData,
  active,
  setActive,
  handleSubmit: handlePropertySubmit,
}) => {
  // Arreglo de booleanos que controlan si cada sección de contenido de la propiedad está colapsada
  const [isCollapsed, setIsCollapsed] = useState(
    Array(propertyContentData.length).fill(false)
  );
  const [dragging, setDragging] = useState(false);


  // subida de imágenes para una sección específica
  const handleImagesUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Comprueba si el evento contiene archivos
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const imageUrls = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      setPropertyContentData((prevData: any[]) => {
        const updatedData = [...prevData];

        updatedData[index]={
          ...updatedData[index],
          images:updatedData[index].images
          ? updatedData[index].images.concat(imageUrls)
          : imageUrls
        }
        return updatedData;
      });
    }
    event.target.value = "";
  };
  // Funcionalidad de arrastrar y soltar para subir imágenes
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (index: number, event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);

    const files = Array.from(event.dataTransfer.files);
    const imageUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPropertyContentData((prevData: any) => {
      const updatedData = [...prevData];

      updatedData[index] = {
          ...updatedData[index],
          images: updatedData[index].images
            ? updatedData[index].images.concat(imageUrls)
            : imageUrls
        };
      return updatedData;
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePropertySubmit();
  };

  // Cambia el estado de colapso de una sección
  const handleCollapseToggle = (index: number) => {
    setIsCollapsed((prev) => {
      const updatedCollapsed = [...prev];
      updatedCollapsed[index] = !updatedCollapsed[index];
      return updatedCollapsed;
    });
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...propertyContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setPropertyContentData(updatedData);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    const lastItem = propertyContentData[propertyContentData.length - 1];

    // Verificar si todos los campos requeridos están completos
    const isSectionValid =
      lastItem.videoSection !== "" &&
      lastItem.videoUrl !== "" &&
      lastItem.description !== "" &&
      lastItem.bedrooms !== "" &&
      lastItem.bathrooms !== "" &&
      lastItem.size !== "";

    // Verificar si hay al menos una imagen
    const hasImages = lastItem.images && lastItem.images.length > 0;

    if (!isSectionValid) {
      toast.error(
        "La sección no puede estar vacía. Por favor, complete todos los campos ."
      );
    } else {
      setActive(active + 1);
      handlePropertySubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {propertyContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== propertyContentData[index - 1].videoSection;
          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <div className="flex w-full items-center">
                  <input
                    type="text"
                    className={`text-[20px] ${
                      item.videoSection === "Grupo Multimedia"
                        ? "w-[170px]"
                        : "w-min"
                    } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                    value={item.videoSection}
                    onChange={(e) => {
                      setPropertyContentData((prevData: any) => {
                        const updatedData = [...prevData];
                        updatedData[index].videoSection = e.target.value;
                        return updatedData;
                      });
                    }}
                  />
                  <BsPencil className="cursor-pointer dark:text-white text-black" />
                </div>
              )}
              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] ? (
                  <p className="font-Poppins dark:text-white text-black">
                    {index + 1}
                  </p>
                ) : (
                  <div></div>
                )}
                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        setPropertyContentData((prevData: any) => {
                          const updatedData = [...prevData];
                          updatedData.splice(index, 1);
                          return updatedData;
                        });
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white text-black"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
 
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      multiple
                      id={`images-${index}`}
                      onChange={(e) => handleImagesUpload(index, e)}
                    />
                    <label
                      htmlFor={`images-${index}`}
                      className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                        dragging ? "bg-blue-500" : "bg-transparent"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(index, e)}
                    >
                      {item.images && item.images.length > 0 ? (
                        <div className="flex flex-wrap">
                          {item.images.map((image: any, imgIndex: number) => (
                            <img
                              key={imgIndex}
                              src={image.url}
                              alt={image.name}
                              className="w-[100px] h-[100px] object-cover mr-2 mb-2"
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-black dark:text-white">
                          Arrastre y suelte sus imágenes aquí o haga clic para
                          explorar
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Ubicación</label>
                    <input
                      type="text"
                      placeholder="sdder..."
                      className={`${styles.input}`}
                      value={item.videoUrl}
                      onChange={(e) => {
                        setPropertyContentData((prevData: any) => {
                          const updatedData = [...prevData];
                          updatedData[index].videoUrl = e.target.value;
                          return updatedData;
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className={styles.label}>
                      DESCRIPTION Url del proyecto
                    </label>
                    <textarea
                      rows={8}
                      cols={30}
                      placeholder="sdder..."
                      className={`${styles.input} !h-min py-2`}
                      value={item.description}
                      onChange={(e) => {
                        setPropertyContentData((prevData: any) => {
                          const updatedData = [...prevData];
                          updatedData[index].description = e.target.value;
                          return updatedData;
                        });
                      }}
                    />
                  </div>
                  <div className="flex mb-3">
                    <div className="flex-1 mr-2">
                      <label className={styles.label}>Baños</label>
                      <input
                        type="number"
                        placeholder="sdder..."
                        className={`${styles.input}`}
                        value={item.bedrooms}
                        onChange={(e) => {
                          setPropertyContentData((prevData: any) => {
                            const updatedData = [...prevData];
                            updatedData[index].bedrooms = e.target.value;
                            return updatedData;
                          });
                        }}
                      />
                    </div>
                    <div className="flex-1 mr-2">
                      <label className={styles.label}>Habitaciones</label>
                      <input
                        type="number"
                        placeholder="sdder..."
                        className={`${styles.input}`}
                        value={item.bathrooms}
                        onChange={(e) => {
                          setPropertyContentData((prevData: any) => {
                            const updatedData = [...prevData];
                            updatedData[index].bathrooms = e.target.value;
                            return updatedData;
                          });
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <label className={styles.label}>Tamaño</label>
                      <input
                        type="Text"
                        placeholder="sdder..."
                        className={`${styles.input}`}
                        value={item.size}
                        onChange={(e) => {
                          setPropertyContentData((prevData: any) => {
                            const updatedData = [...prevData];
                            updatedData[index].size = e.target.value;
                            return updatedData;
                          });
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </form>

      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex item-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex item-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default ContentProperty;
